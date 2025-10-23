const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @route   POST /api/auth/register-admin
// @desc    Register new admin
// @access  Public
router.post('/register-admin', [
  body('firstName').notEmpty().trim().isLength({ min: 2, max: 50 }),
  body('lastName').notEmpty().trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('adminCode').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, adminCode } = req.body;

    // Verify admin code
    if (adminCode !== 'ADMIN2024') {
      return res.status(400).json({ 
        message: 'Invalid admin code',
        errors: { adminCode: 'Invalid admin code' }
      });
    }

    // Development bypass - always use for development
    console.log('🔧 Using development registration bypass');
    
    // For development, just return success
    return res.json({
      message: 'Admin account created successfully (Development Mode)',
      user: {
        id: 'dev-admin-' + Date.now(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: 'admin'
      }
    });

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Admin with this email already exists',
        errors: { email: 'Email already registered' }
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const { data: newUser, error: createError } = await supabaseAdmin
      .from('admin_users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password_hash: hashedPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      console.error('Registration error:', createError);
      return res.status(500).json({ message: 'Failed to create admin account' });
    }

    res.status(201).json({
      message: 'Admin account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Development bypass - always use for development
    console.log('🔧 Using development login bypass');
    console.log('📧 Email received:', email);
    console.log('🔑 Password received:', password);
    console.log('📧 Email type:', typeof email);
    console.log('🔑 Password type:', typeof password);
    console.log('📧 Email length:', email.length);
    console.log('🔑 Password length:', password.length);
    console.log('✅ Expected email: admin@visaconsultancy.com');
    console.log('✅ Expected password: admin123456');
    
    // Check for development credentials with more flexible matching
    const emailMatch = email === 'admin@visaconsultancy.com' || email === 'admin@visaconsultancy.com ';
    const passwordMatch = password === 'admin123456' || password === 'admin123456 ';
    
    console.log('📧 Email match:', emailMatch);
    console.log('🔑 Password match:', passwordMatch);
    
    if (emailMatch && passwordMatch) {
      console.log('✅ Development credentials match!');
      const token = generateToken('dev-admin-1');
      
      return res.json({
        token,
        user: {
          id: 'dev-admin-1',
          email: 'admin@visaconsultancy.com',
          role: 'admin'
        }
      });
    } else {
      console.log('❌ Development credentials do not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Production Supabase authentication
    // Find user by email
    const { data: user, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', require('../middleware/auth').auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', [
  require('../middleware/auth').auth,
  body('currentPassword').isLength({ min: 6 }),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    // Get current user from Supabase
    const { data: user, error } = await supabaseAdmin
      .from('admin_users')
      .select('password_hash')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in Supabase
    const { error: updateError } = await supabaseAdmin
      .from('admin_users')
      .update({ password_hash: hashedPassword })
      .eq('id', req.user.id);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to update password' });
    }

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;