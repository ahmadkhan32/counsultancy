const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { sendConsultationConfirmation } = require('../config/email');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/consultations
// @desc    Book consultation
// @access  Public
router.post('/', [
  body('clientInfo.name').notEmpty(),
  body('clientInfo.email').isEmail(),
  body('clientInfo.phone').notEmpty(),
  body('consultationDetails.visaType').notEmpty(),
  body('consultationDetails.country').notEmpty(),
  body('consultationDetails.preferredDate').isISO8601(),
  body('consultationDetails.preferredTime').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const consultationData = {
      client_info: req.body.clientInfo,
      consultation_details: req.body.consultationDetails,
      status: 'pending'
    };

    // Insert consultation into Supabase
    const { data: consultation, error } = await supabaseAdmin
      .from('consultations')
      .insert(consultationData)
      .select()
      .single();

    if (error) {
      console.error('Error creating consultation:', error);
      return res.status(500).json({ message: 'Failed to book consultation' });
    }

    // Send confirmation email
    try {
      await sendConsultationConfirmation({
        clientInfo: consultation.client_info,
        consultationDetails: consultation.consultation_details
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Consultation booked successfully',
      consultationId: consultation.id
    });
  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/consultations
// @desc    Get all consultations (admin only)
// @access  Private
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = supabaseAdmin
      .from('consultations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: consultations, error, count } = await query;

    if (error) {
      console.error('Error fetching consultations:', error);
      return res.status(500).json({ message: 'Failed to fetch consultations' });
    }

    res.json({
      consultations: consultations || [],
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/consultations/:id
// @desc    Get single consultation
// @access  Private
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const { data: consultation, error } = await supabaseAdmin
      .from('consultations')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error || !consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json(consultation);
  } catch (error) {
    console.error('Get consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/consultations/:id/status
// @desc    Update consultation status
// @access  Private
router.put('/:id/status', [
  adminAuth,
  body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']),
  body('adminNotes').optional(),
  body('scheduledAt').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, adminNotes, scheduledAt } = req.body;
    
    const updateData = { 
      status, 
      admin_notes: adminNotes,
      updated_at: new Date().toISOString()
    };

    if (scheduledAt) {
      updateData.scheduled_at = scheduledAt;
    }

    const { data: consultation, error } = await supabaseAdmin
      .from('consultations')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json({ message: 'Consultation status updated', consultation });
  } catch (error) {
    console.error('Update consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/consultations/:id
// @desc    Delete consultation
// @access  Private
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('consultations')
      .delete()
      .eq('id', req.params.id);
    
    if (error) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Delete consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;