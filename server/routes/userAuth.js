const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { sendEmail } = require('../config/email');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @route   POST /api/user-auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('phone').optional().isMobilePhone(),
  body('dateOfBirth').optional().isISO8601(),
  body('nationality').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone, dateOfBirth, nationality } = req.body;

    // Development bypass when Supabase is not configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.log('🔧 Using development user registration bypass');
      
      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      
      const token = generateToken('dev-user-' + Date.now());
      
      return res.status(201).json({
        message: 'User registered successfully (Development Mode)',
        token,
        user: {
          id: 'dev-user-' + Date.now(),
          email,
          firstName,
          lastName,
          phone,
          dateOfBirth,
          nationality,
          isVerified: false
        }
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          phone,
          date_of_birth: dateOfBirth,
          nationality,
          verification_token: verificationToken,
          is_active: true,
          is_verified: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Server error during registration' });
    }

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    
    const emailResult = await sendEmail(
      email,
      'Verify Your Email - Visa Consultancy',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Visa Consultancy!</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          
          <p>Best regards,<br>Visa Consultancy Team</p>
        </div>
      `
    );

    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        dateOfBirth: user.date_of_birth,
        nationality: user.nationality,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user-auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Development bypass when Supabase is not configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.log('🔧 Using development user login bypass');
      
      // Check for development credentials
      if (email === 'user@example.com' && password === 'password123') {
        const token = generateToken('dev-user-1');
        
        return res.json({
          token,
          user: {
            id: 'dev-user-1',
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            dateOfBirth: '1990-01-01',
            nationality: 'American',
            isVerified: true
          }
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // Check if user exists
    const { data: user, error } = await supabaseAdmin
      .from('users')
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
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        dateOfBirth: user.date_of_birth,
        nationality: user.nationality,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/user-auth/me
// @desc    Get current user
// @access  Private
router.get('/me', require('../middleware/auth').userAuth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        phone: req.user.phone,
        dateOfBirth: req.user.date_of_birth,
        nationality: req.user.nationality,
        isVerified: req.user.is_verified
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user-auth/verify-email
// @desc    Verify user email
// @access  Public
router.post('/verify-email', [
  body('token').notEmpty()
], async (req, res) => {
  try {
    const { token } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Email verified successfully (Development Mode)' });
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name')
      .eq('verification_token', token)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Update user as verified
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        is_verified: true,
        verification_token: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to verify email' });
    }

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user-auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const { email } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Password reset email sent (Development Mode)' });
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name')
      .eq('email', email)
      .single();

    if (!user) {
      // Don't reveal if email exists or not
      return res.json({ message: 'If the email exists, a password reset link has been sent' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Update user with reset token
    await supabaseAdmin
      .from('users')
      .update({
        reset_password_token: resetToken,
        reset_password_expires: resetExpires.toISOString()
      })
      .eq('id', user.id);

    // Send reset email
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    await sendEmail(
      email,
      'Password Reset - Visa Consultancy',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>Dear ${user.first_name},</p>
          <p>You requested a password reset. Click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          
          <p>Best regards,<br>Visa Consultancy Team</p>
        </div>
      `
    );

    res.json({ message: 'If the email exists, a password reset link has been sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user-auth/reset-password
// @desc    Reset user password
// @access  Public
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const { token, password } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Password reset successfully (Development Mode)' });
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, reset_password_expires')
      .eq('reset_password_token', token)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Check if token is expired
    if (new Date() > new Date(user.reset_password_expires)) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear reset token
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        password_hash: hashedPassword,
        reset_password_token: null,
        reset_password_expires: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to reset password' });
    }

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user-auth/resend-verification
// @desc    Resend verification email
// @access  Private
router.post('/resend-verification', [
  require('../middleware/auth').userAuth
], async (req, res) => {
  try {
    const userId = req.user.id;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Verification email resent (Development Mode)' });
    }

    // Check if user is already verified
    if (req.user.is_verified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Update user with new verification token
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        verification_token: verificationToken,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to generate verification token' });
    }

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    
    const emailResult = await sendEmail(
      req.user.email,
      'Verify Your Email - Visa Consultancy',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Verify Your Email Address</h2>
          <p>Dear ${req.user.first_name},</p>
          <p>Please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          
          <p>Best regards,<br>Visa Consultancy Team</p>
        </div>
      `
    );

    res.json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user-auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', [
  require('../middleware/auth').userAuth,
  body('currentPassword').isLength({ min: 6 }),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Password changed successfully (Development Mode)' });
    }

    // Get current user
    const { data: user, error } = await supabaseAdmin
      .from('users')
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

    // Update password
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
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
