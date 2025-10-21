const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/visa-types
// @desc    Get all visa types
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockVisaTypes = [
        {
          id: '1',
          name: 'Student Visa',
          category: 'student',
          countries: ['US', 'UK', 'CA', 'AU'],
          description: 'For students who want to study abroad',
          eligibility: ['Valid passport', 'Acceptance letter', 'Financial proof', 'English proficiency'],
          required_documents: ['Passport', 'Academic transcripts', 'Bank statements', 'IELTS/TOEFL scores'],
          processing_time: '4-6 weeks',
          fees: { application: 150, processing: 50 },
          validity: 'Duration of study',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Work Visa',
          category: 'work',
          countries: ['US', 'UK', 'CA', 'AU'],
          description: 'For professionals seeking employment opportunities',
          eligibility: ['Job offer', 'Relevant qualifications', 'Work experience', 'Clean criminal record'],
          required_documents: ['Passport', 'Job offer letter', 'Educational certificates', 'Work experience letters'],
          processing_time: '6-8 weeks',
          fees: { application: 200, processing: 75 },
          validity: '1-3 years',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Tourist Visa',
          category: 'tourist',
          countries: ['US', 'UK', 'CA', 'AU'],
          description: 'For tourism and leisure travel',
          eligibility: ['Valid passport', 'Travel itinerary', 'Financial proof', 'Return ticket'],
          required_documents: ['Passport', 'Travel insurance', 'Hotel bookings', 'Bank statements'],
          processing_time: '2-3 weeks',
          fees: { application: 100, processing: 25 },
          validity: '3-6 months',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
      return res.json(mockVisaTypes);
    }

    const { data: visaTypes, error } = await supabaseAdmin
      .from('visa_types')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching visa types:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(visaTypes || []);
  } catch (error) {
    console.error('Visa types fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/visa-types/:id
// @desc    Get visa type by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockVisaType = {
        id: id,
        name: 'Student Visa',
        category: 'student',
        countries: ['US', 'UK', 'CA', 'AU'],
        description: 'For students who want to study abroad',
        eligibility: ['Valid passport', 'Acceptance letter', 'Financial proof', 'English proficiency'],
        required_documents: ['Passport', 'Academic transcripts', 'Bank statements', 'IELTS/TOEFL scores'],
        processing_time: '4-6 weeks',
        fees: { application: 150, processing: 50 },
        validity: 'Duration of study',
        is_active: true,
        created_at: new Date().toISOString()
      };
      return res.json(mockVisaType);
    }

    const { data: visaType, error } = await supabaseAdmin
      .from('visa_types')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !visaType) {
      return res.status(404).json({ message: 'Visa type not found' });
    }

    res.json(visaType);
  } catch (error) {
    console.error('Visa type fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/visa-types/category/:category
// @desc    Get visa types by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockVisaTypes = [
        {
          id: '1',
          name: 'Student Visa',
          category: category,
          countries: ['US', 'UK', 'CA', 'AU'],
          description: 'For students who want to study abroad',
          eligibility: ['Valid passport', 'Acceptance letter', 'Financial proof', 'English proficiency'],
          required_documents: ['Passport', 'Academic transcripts', 'Bank statements', 'IELTS/TOEFL scores'],
          processing_time: '4-6 weeks',
          fees: { application: 150, processing: 50 },
          validity: 'Duration of study',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
      return res.json(mockVisaTypes);
    }

    const { data: visaTypes, error } = await supabaseAdmin
      .from('visa_types')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching visa types by category:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(visaTypes || []);
  } catch (error) {
    console.error('Visa types by category fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/visa-types
// @desc    Create new visa type
// @access  Admin
router.post('/', [
  auth,
  body('name').notEmpty().trim(),
  body('category').isIn(['student', 'work', 'tourist', 'immigration', 'business', 'transit']),
  body('countries').isArray(),
  body('description').optional().trim(),
  body('eligibility').optional().isArray(),
  body('required_documents').optional().isArray(),
  body('processing_time').optional().trim(),
  body('fees').optional().isObject(),
  body('validity').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, countries, description, eligibility, required_documents, processing_time, fees, validity } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const newVisaType = {
        id: Date.now().toString(),
        name,
        category,
        countries,
        description,
        eligibility,
        required_documents,
        processing_time,
        fees,
        validity,
        is_active: true,
        created_at: new Date().toISOString()
      };
      return res.status(201).json(newVisaType);
    }

    const { data: visaType, error } = await supabaseAdmin
      .from('visa_types')
      .insert([{
        name,
        category,
        countries,
        description,
        eligibility,
        required_documents,
        processing_time,
        fees,
        validity,
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating visa type:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(201).json(visaType);
  } catch (error) {
    console.error('Visa type creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/visa-types/:id
// @desc    Update visa type
// @access  Admin
router.put('/:id', [
  auth,
  body('name').optional().notEmpty().trim(),
  body('category').optional().isIn(['student', 'work', 'tourist', 'immigration', 'business', 'transit']),
  body('countries').optional().isArray(),
  body('description').optional().trim(),
  body('eligibility').optional().isArray(),
  body('required_documents').optional().isArray(),
  body('processing_time').optional().trim(),
  body('fees').optional().isObject(),
  body('validity').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const updatedVisaType = {
        id,
        ...updateData,
        updated_at: new Date().toISOString()
      };
      return res.json(updatedVisaType);
    }

    const { data: visaType, error } = await supabaseAdmin
      .from('visa_types')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating visa type:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!visaType) {
      return res.status(404).json({ message: 'Visa type not found' });
    }

    res.json(visaType);
  } catch (error) {
    console.error('Visa type update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/visa-types/:id
// @desc    Delete visa type (soft delete)
// @access  Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Visa type deleted successfully (Development Mode)' });
    }

    const { error } = await supabaseAdmin
      .from('visa_types')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error deleting visa type:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({ message: 'Visa type deleted successfully' });
  } catch (error) {
    console.error('Visa type deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;