const jwt = require('jsonwebtoken');
const { supabaseAdmin } = require('../config/supabase');

// Admin Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    // Development bypass when Supabase is not configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      if (decoded.id === 'dev-admin-1') {
        req.user = {
          id: 'dev-admin-1',
          email: 'admin@visaconsultancy.com',
          role: 'admin'
        };
        return next();
      }
    }
    
    // Verify admin user exists in Supabase
    const { data: user, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, role, is_active')
      .eq('id', decoded.id)
      .single();
    
    if (error || !user || !user.is_active) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// User Authentication Middleware
const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    // Development bypass when Supabase is not configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      if (decoded.id.startsWith('dev-user-')) {
        req.user = {
          id: decoded.id,
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
          phone: '+1234567890',
          date_of_birth: '1990-01-01',
          nationality: 'American',
          is_verified: true,
          is_active: true
        };
        return next();
      }
    }
    
    // Verify user exists in Supabase
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name, phone, date_of_birth, nationality, is_verified, is_active')
      .eq('id', decoded.id)
      .single();
    
    if (error || !user || !user.is_active) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

module.exports = { auth, userAuth, adminAuth };