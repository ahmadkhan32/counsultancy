const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { sendApplicationConfirmation } = require('../config/email');
const { auth, userAuth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed'));
    }
  }
});

// @route   POST /api/applications
// @desc    Submit visa application
// @access  Public
router.post('/', [
  body('personalInfo.firstName').notEmpty(),
  body('personalInfo.lastName').notEmpty(),
  body('personalInfo.email').isEmail(),
  body('personalInfo.phone').notEmpty(),
  body('visaInfo.country').notEmpty(),
  body('visaInfo.visaType').notEmpty()
], upload.array('documents', 10), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationData = {
      personal_info: req.body.personalInfo,
      visa_info: req.body.visaInfo,
      documents: [],
      status: 'pending'
    };
    
    // Handle uploaded files
    if (req.files) {
      const documentPromises = req.files.map(async (file) => {
        const documentData = {
          filename: file.filename,
          original_name: file.originalname,
          file_path: file.path,
          file_size: file.size,
          mime_type: file.mimetype
        };

        // Store file info in database
        const { data: fileRecord, error: fileError } = await supabaseAdmin
          .from('file_uploads')
          .insert(documentData)
          .select()
          .single();

        if (fileError) {
          console.error('Error storing file info:', fileError);
          return null;
        }

        return {
          id: fileRecord.id,
          name: file.originalname,
          filePath: file.path,
          uploadedAt: new Date().toISOString()
        };
      });

      const documents = await Promise.all(documentPromises);
      applicationData.documents = documents.filter(doc => doc !== null);
    }

    // Insert application into Supabase
    const { data: application, error } = await supabaseAdmin
      .from('applications')
      .insert(applicationData)
      .select()
      .single();

    if (error) {
      console.error('Error creating application:', error);
      return res.status(500).json({ message: 'Failed to submit application' });
    }

    // Send confirmation email
    try {
      await sendApplicationConfirmation({
        id: application.id,
        personalInfo: application.personal_info,
        visaInfo: application.visa_info
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application.id
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/applications/user
// @desc    Get user's applications
// @access  Private (User)
router.get('/user', userAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockApplications = [
        {
          id: '1',
          user_id: userId,
          personal_info: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            phone: '+1234567890',
            dateOfBirth: '1990-01-01',
            nationality: 'American'
          },
          visa_info: {
            visaType: 'Student Visa',
            country: 'Canada',
            purpose: 'Study',
            duration: '2 years'
          },
          documents: [],
          status: 'pending',
          notes: '',
          submitted_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ];
      return res.json(mockApplications);
    }

    const { data: applications, error } = await supabaseAdmin
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching user applications:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(applications || []);
  } catch (error) {
    console.error('User applications fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/applications
// @desc    Get all applications (admin only)
// @access  Private
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = supabaseAdmin
      .from('applications')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: applications, error, count } = await query;

    if (error) {
      console.error('Error fetching applications:', error);
      return res.status(500).json({ message: 'Failed to fetch applications' });
    }

    res.json({
      applications: applications || [],
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const { data: application, error } = await supabaseAdmin
      .from('applications')
      .select(`
        *,
        file_uploads (
          id,
          filename,
          original_name,
          file_path,
          file_size,
          mime_type,
          created_at
        )
      `)
      .eq('id', req.params.id)
      .single();
    
    if (error || !application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private
router.put('/:id/status', [
  adminAuth,
  body('status').isIn(['pending', 'under_review', 'approved', 'rejected', 'completed']),
  body('notes').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;
    
    const { data: application, error } = await supabaseAdmin
      .from('applications')
      .update({ 
        status, 
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete application
// @access  Private
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('applications')
      .delete()
      .eq('id', req.params.id);
    
    if (error) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;