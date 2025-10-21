const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { auth, userAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/countries
// @desc    Get all countries
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockCountries = [
        {
          id: '1',
          name: 'United States',
          code: 'US',
          flag: '🇺🇸',
          description: 'The United States offers various visa types for tourism, business, study, and work.',
          popular_visa_types: ['Tourist Visa', 'Student Visa', 'Work Visa', 'Business Visa'],
          processing_time: '15-30 days',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'United Kingdom',
          code: 'UK',
          flag: '🇬🇧',
          description: 'The UK offers student visas, work visas, and visitor visas.',
          popular_visa_types: ['Student Visa', 'Work Visa', 'Visitor Visa'],
          processing_time: '10-15 days',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Canada',
          code: 'CA',
          flag: '🇨🇦',
          description: 'Canada offers study permits, work permits, and visitor visas.',
          popular_visa_types: ['Study Permit', 'Work Permit', 'Visitor Visa'],
          processing_time: '20-30 days',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Australia',
          code: 'AU',
          flag: '🇦🇺',
          description: 'Australia offers student visas, work visas, and tourist visas.',
          popular_visa_types: ['Student Visa', 'Work Visa', 'Tourist Visa'],
          processing_time: '15-25 days',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
      return res.json(mockCountries);
    }

    const { data: countries, error } = await supabaseAdmin
      .from('countries')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching countries:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(countries || []);
  } catch (error) {
    console.error('Countries fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/countries/:id
// @desc    Get country by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockCountry = {
        id: id,
        name: 'United States',
        code: 'US',
        flag: '🇺🇸',
        description: 'The United States offers various visa types for tourism, business, study, and work.',
        popular_visa_types: ['Tourist Visa', 'Student Visa', 'Work Visa', 'Business Visa'],
        processing_time: '15-30 days',
        is_active: true,
        created_at: new Date().toISOString()
      };
      return res.json(mockCountry);
    }

    const { data: country, error } = await supabaseAdmin
      .from('countries')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.json(country);
  } catch (error) {
    console.error('Country fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/countries
// @desc    Create new country
// @access  Admin
router.post('/', [
  auth,
  body('name').notEmpty().trim(),
  body('code').isLength({ min: 2, max: 3 }).trim(),
  body('description').optional().trim(),
  body('popular_visa_types').optional().isArray(),
  body('processing_time').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, code, flag, description, popular_visa_types, processing_time } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const newCountry = {
        id: Date.now().toString(),
        name,
        code,
        flag,
        description,
        popular_visa_types,
        processing_time,
        is_active: true,
        created_at: new Date().toISOString()
      };
      return res.status(201).json(newCountry);
    }

    const { data: country, error } = await supabaseAdmin
      .from('countries')
      .insert([{
        name,
        code,
        flag,
        description,
        popular_visa_types,
        processing_time,
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating country:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(201).json(country);
  } catch (error) {
    console.error('Country creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/countries/:id
// @desc    Update country
// @access  Admin
router.put('/:id', [
  auth,
  body('name').optional().notEmpty().trim(),
  body('code').optional().isLength({ min: 2, max: 3 }).trim(),
  body('description').optional().trim(),
  body('popular_visa_types').optional().isArray(),
  body('processing_time').optional().trim()
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
      const updatedCountry = {
        id,
        ...updateData,
        updated_at: new Date().toISOString()
      };
      return res.json(updatedCountry);
    }

    const { data: country, error } = await supabaseAdmin
      .from('countries')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating country:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.json(country);
  } catch (error) {
    console.error('Country update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/countries/:id
// @desc    Delete country (soft delete)
// @access  Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Country deleted successfully (Development Mode)' });
    }

    const { error } = await supabaseAdmin
      .from('countries')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error deleting country:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Country deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;