const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { sendInquiryConfirmation } = require('../config/email');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Submit inquiry
// @access  Public
router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('subject').notEmpty(),
  body('message').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const inquiryData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
      subject: req.body.subject,
      message: req.body.message,
      visa_type: req.body.visaType || null,
      country: req.body.country || null,
      status: 'new'
    };

    // Insert inquiry into Supabase
    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .insert(inquiryData)
      .select()
      .single();

    if (error) {
      console.error('Error creating inquiry:', error);
      return res.status(500).json({ message: 'Failed to submit inquiry' });
    }

    // Send confirmation email
    try {
      await sendInquiryConfirmation(inquiry);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      inquiryId: inquiry.id
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries (admin only)
// @access  Private
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = supabaseAdmin
      .from('inquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: inquiries, error, count } = await query;

    if (error) {
      console.error('Error fetching inquiries:', error);
      return res.status(500).json({ message: 'Failed to fetch inquiries' });
    }

    res.json({
      inquiries: inquiries || [],
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry
// @access  Private
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error || !inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json(inquiry);
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/inquiries/:id/reply
// @desc    Reply to inquiry
// @access  Private
router.put('/:id/reply', [
  adminAuth,
  body('adminReply').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { adminReply } = req.body;
    
    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .update({ 
        admin_reply: adminReply,
        status: 'replied',
        replied_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ message: 'Reply sent successfully', inquiry });
  } catch (error) {
    console.error('Reply inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status
// @access  Private
router.put('/:id/status', [
  adminAuth,
  body('status').isIn(['new', 'read', 'replied', 'closed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;
    
    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ message: 'Inquiry status updated', inquiry });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry
// @access  Private
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', req.params.id);
    
    if (error) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;