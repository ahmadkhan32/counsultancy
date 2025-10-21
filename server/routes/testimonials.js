const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { auth, userAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, rating } = req.query;
    const offset = (page - 1) * limit;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockTestimonials = [
        {
          id: '1',
          client_name: 'Sarah Johnson',
          client_email: 'sarah.johnson@email.com',
          client_location: 'New York, USA',
          visa_type: 'Student Visa',
          country: 'Canada',
          rating: 5,
          testimonial_text: 'Excellent service! They helped me get my student visa for Canada within 3 weeks. Highly recommended!',
          is_approved: true,
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          client_name: 'Ahmed Hassan',
          client_email: 'ahmed.hassan@email.com',
          client_location: 'Dubai, UAE',
          visa_type: 'Work Visa',
          country: 'Australia',
          rating: 5,
          testimonial_text: 'Professional team with great expertise. They made the work visa process so smooth and easy.',
          is_approved: true,
          is_featured: false,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          client_name: 'Maria Rodriguez',
          client_email: 'maria.rodriguez@email.com',
          client_location: 'Madrid, Spain',
          visa_type: 'Tourist Visa',
          country: 'United States',
          rating: 4,
          testimonial_text: 'Great support throughout the process. Got my tourist visa approved quickly.',
          is_approved: true,
          is_featured: false,
          created_at: new Date().toISOString()
        }
      ];

      let filteredTestimonials = mockTestimonials;

      if (rating) {
        filteredTestimonials = filteredTestimonials.filter(testimonial => testimonial.rating >= parseInt(rating));
      }

      const paginatedTestimonials = filteredTestimonials.slice(offset, offset + parseInt(limit));
      
      return res.json({
        testimonials: paginatedTestimonials,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(filteredTestimonials.length / limit),
          total_testimonials: filteredTestimonials.length,
          has_next: offset + parseInt(limit) < filteredTestimonials.length,
          has_prev: page > 1
        }
      });
    }

    let query = supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (rating) {
      query = query.gte('rating', parseInt(rating));
    }

    const { data: testimonials, error, count } = await query
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({
      testimonials: testimonials || [],
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        total_testimonials: count,
        has_next: offset + parseInt(limit) < count,
        has_prev: page > 1
      }
    });
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/testimonials/featured
// @desc    Get featured testimonials
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockFeaturedTestimonials = [
        {
          id: '1',
          client_name: 'Sarah Johnson',
          client_email: 'sarah.johnson@email.com',
          client_location: 'New York, USA',
          visa_type: 'Student Visa',
          country: 'Canada',
          rating: 5,
          testimonial_text: 'Excellent service! They helped me get my student visa for Canada within 3 weeks. Highly recommended!',
          is_approved: true,
          is_featured: true,
          created_at: new Date().toISOString()
        }
      ];
      return res.json(mockFeaturedTestimonials);
    }

    const { data: testimonials, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching featured testimonials:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(testimonials || []);
  } catch (error) {
    console.error('Featured testimonials fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Public (but requires approval)
router.post('/', [
  body('client_name').notEmpty().trim(),
  body('client_email').isEmail().normalizeEmail(),
  body('client_location').optional().trim(),
  body('visa_type').optional().trim(),
  body('country').optional().trim(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('testimonial_text').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { client_name, client_email, client_location, visa_type, country, rating, testimonial_text } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const newTestimonial = {
        id: Date.now().toString(),
        client_name,
        client_email,
        client_location,
        visa_type,
        country,
        rating,
        testimonial_text,
        is_approved: false,
        is_featured: false,
        created_at: new Date().toISOString()
      };
      return res.status(201).json({
        message: 'Testimonial submitted successfully. It will be reviewed before being published.',
        testimonial: newTestimonial
      });
    }

    const { data: testimonial, error } = await supabaseAdmin
      .from('testimonials')
      .insert([{
        client_name,
        client_email,
        client_location,
        visa_type,
        country,
        rating,
        testimonial_text,
        is_approved: false,
        is_featured: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating testimonial:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(201).json({
      message: 'Testimonial submitted successfully. It will be reviewed before being published.',
      testimonial
    });
  } catch (error) {
    console.error('Testimonial creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/testimonials/:id/approve
// @desc    Approve testimonial
// @access  Admin
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_approved, is_featured } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Testimonial updated successfully (Development Mode)' });
    }

    const { data: testimonial, error } = await supabaseAdmin
      .from('testimonials')
      .update({
        is_approved: is_approved !== undefined ? is_approved : true,
        is_featured: is_featured !== undefined ? is_featured : false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial updated successfully', testimonial });
  } catch (error) {
    console.error('Testimonial update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Testimonial deleted successfully (Development Mode)' });
    }

    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Testimonial deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/testimonials/admin/all
// @desc    Get all testimonials for admin (including unapproved)
// @access  Admin
router.get('/admin/all', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockAllTestimonials = [
        {
          id: '1',
          client_name: 'Sarah Johnson',
          client_email: 'sarah.johnson@email.com',
          client_location: 'New York, USA',
          visa_type: 'Student Visa',
          country: 'Canada',
          rating: 5,
          testimonial_text: 'Excellent service! They helped me get my student visa for Canada within 3 weeks. Highly recommended!',
          is_approved: true,
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          client_name: 'John Doe',
          client_email: 'john.doe@email.com',
          client_location: 'London, UK',
          visa_type: 'Work Visa',
          country: 'USA',
          rating: 4,
          testimonial_text: 'Good service, got my work visa approved.',
          is_approved: false,
          is_featured: false,
          created_at: new Date().toISOString()
        }
      ];

      let filteredTestimonials = mockAllTestimonials;

      if (status === 'approved') {
        filteredTestimonials = filteredTestimonials.filter(t => t.is_approved);
      } else if (status === 'pending') {
        filteredTestimonials = filteredTestimonials.filter(t => !t.is_approved);
      }

      const paginatedTestimonials = filteredTestimonials.slice(offset, offset + parseInt(limit));
      
      return res.json({
        testimonials: paginatedTestimonials,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(filteredTestimonials.length / limit),
          total_testimonials: filteredTestimonials.length,
          has_next: offset + parseInt(limit) < filteredTestimonials.length,
          has_prev: page > 1
        }
      });
    }

    let query = supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (status === 'approved') {
      query = query.eq('is_approved', true);
    } else if (status === 'pending') {
      query = query.eq('is_approved', false);
    }

    const { data: testimonials, error, count } = await query
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Error fetching all testimonials:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({
      testimonials: testimonials || [],
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        total_testimonials: count,
        has_next: offset + parseInt(limit) < count,
        has_prev: page > 1
      }
    });
  } catch (error) {
    console.error('All testimonials fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;