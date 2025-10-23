const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all published blogs with pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      featured,
      sort = 'published_at',
      order = 'desc'
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    let query = supabaseAdmin
      .from('blogs')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    const { data: blogs, error, count } = await query;

    if (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ message: 'Failed to fetch blogs' });
    }

    res.json({
      blogs: blogs || [],
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/categories
// @desc    Get all blog categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ message: 'Failed to fetch categories' });
    }

    res.json(categories || []);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('status', 'published')
      .single();
    
    if (error || !blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment view count
    await supabaseAdmin
      .from('blogs')
      .update({ view_count: blog.view_count + 1 })
      .eq('id', blog.id);

    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:id/comments
// @desc    Get blog comments
// @access  Public
router.get('/:id/comments', async (req, res) => {
  try {
    const { data: comments, error } = await supabaseAdmin
      .from('blog_comments')
      .select('*')
      .eq('blog_id', req.params.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Failed to fetch comments' });
    }

    res.json(comments || []);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog/:id/comments
// @desc    Add blog comment
// @access  Public
router.post('/:id/comments', [
  body('authorName').notEmpty().trim(),
  body('authorEmail').isEmail().normalizeEmail(),
  body('content').notEmpty().trim().isLength({ min: 10, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { authorName, authorEmail, content } = req.body;

    // Check if blog exists
    const { data: blog, error: blogError } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('id', req.params.id)
      .eq('status', 'published')
      .single();

    if (blogError || !blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const { data: comment, error } = await supabaseAdmin
      .from('blog_comments')
      .insert({
        blog_id: req.params.id,
        author_name: authorName,
        author_email: authorEmail,
        content: content.trim()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return res.status(500).json({ message: 'Failed to create comment' });
    }

    res.status(201).json({
      message: 'Comment submitted successfully. It will be reviewed before publication.',
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== ADMIN ROUTES ==========

// @route   GET /api/blog/admin/all
// @desc    Get all blogs for admin (including drafts)
// @access  Private (Admin)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      category, 
      search,
      sort = 'created_at',
      order = 'desc'
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    let query = supabaseAdmin
      .from('blogs')
      .select('*', { count: 'exact' })
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const { data: blogs, error, count } = await query;

    if (error) {
      console.error('Error fetching admin blogs:', error);
      return res.status(500).json({ message: 'Failed to fetch blogs' });
    }

    res.json({
      blogs: blogs || [],
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get admin blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog/admin
// @desc    Create new blog post
// @access  Private (Admin)
router.post('/admin', [
  adminAuth,
  body('title').notEmpty().trim().isLength({ min: 5, max: 255 }),
  body('excerpt').notEmpty().trim().isLength({ min: 10, max: 500 }),
  body('content').notEmpty().trim().isLength({ min: 100 }),
  body('authorName').notEmpty().trim(),
  body('category').notEmpty().trim(),
  body('tags').optional().isArray(),
  body('featured').optional().isBoolean(),
  body('seoTitle').optional().trim(),
  body('seoDescription').optional().trim(),
  body('seoKeywords').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      excerpt,
      content,
      authorName,
      category,
      tags = [],
      featured = false,
      seoTitle,
      seoDescription,
      seoKeywords = [],
      status = 'draft'
    } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Check if slug already exists
    const { data: existingBlog } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();

    let finalSlug = slug;
    if (existingBlog) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    // Calculate read time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const blogData = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      author_name: authorName.trim(),
      category: category.trim(),
      tags: tags,
      featured: featured,
      status: status,
      read_time: readTime,
      seo_title: seoTitle?.trim() || title.trim(),
      seo_description: seoDescription?.trim() || excerpt.trim(),
      seo_keywords: seoKeywords,
      published_at: status === 'published' ? new Date().toISOString() : null
    };

    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .insert(blogData)
      .select()
      .single();

    if (error) {
      console.error('Error creating blog:', error);
      return res.status(500).json({ message: 'Failed to create blog' });
    }

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/admin/:id
// @desc    Update blog post
// @access  Private (Admin)
router.put('/admin/:id', [
  adminAuth,
  body('title').optional().trim().isLength({ min: 5, max: 255 }),
  body('excerpt').optional().trim().isLength({ min: 10, max: 500 }),
  body('content').optional().trim().isLength({ min: 100 }),
  body('authorName').optional().trim(),
  body('category').optional().trim(),
  body('tags').optional().isArray(),
  body('featured').optional().isBoolean(),
  body('status').optional().isIn(['draft', 'published', 'archived']),
  body('seoTitle').optional().trim(),
  body('seoDescription').optional().trim(),
  body('seoKeywords').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = {};
    const {
      title,
      excerpt,
      content,
      authorName,
      category,
      tags,
      featured,
      status,
      seoTitle,
      seoDescription,
      seoKeywords
    } = req.body;

    if (title) {
      updateData.title = title.trim();
      // Generate new slug if title changed
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      updateData.slug = slug;
    }
    if (excerpt) updateData.excerpt = excerpt.trim();
    if (content) {
      updateData.content = content.trim();
      // Recalculate read time
      const wordCount = content.split(/\s+/).length;
      updateData.read_time = Math.max(1, Math.ceil(wordCount / 200));
    }
    if (authorName) updateData.author_name = authorName.trim();
    if (category) updateData.category = category.trim();
    if (tags) updateData.tags = tags;
    if (typeof featured === 'boolean') updateData.featured = featured;
    if (status) {
      updateData.status = status;
      if (status === 'published' && !req.body.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }
    if (seoTitle) updateData.seo_title = seoTitle.trim();
    if (seoDescription) updateData.seo_description = seoDescription.trim();
    if (seoKeywords) updateData.seo_keywords = seoKeywords;

    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/admin/:id
// @desc    Delete blog post
// @access  Private (Admin)
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', req.params.id);
    
    if (error) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/admin/comments
// @desc    Get all comments for admin
// @access  Private (Admin)
router.get('/admin/comments', adminAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status,
      sort = 'created_at',
      order = 'desc'
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    let query = supabaseAdmin
      .from('blog_comments')
      .select(`
        *,
        blogs!inner(title, slug)
      `, { count: 'exact' })
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: comments, error, count } = await query;

    if (error) {
      console.error('Error fetching admin comments:', error);
      return res.status(500).json({ message: 'Failed to fetch comments' });
    }

    res.json({
      comments: comments || [],
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get admin comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/admin/comments/:id
// @desc    Update comment status
// @access  Private (Admin)
router.put('/admin/comments/:id', [
  adminAuth,
  body('status').isIn(['pending', 'approved', 'rejected'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    const { data: comment, error } = await supabaseAdmin
      .from('blog_comments')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({
      message: 'Comment status updated successfully',
      comment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/admin/comments/:id
// @desc    Delete comment
// @access  Private (Admin)
router.delete('/admin/comments/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('blog_comments')
      .delete()
      .eq('id', req.params.id);
    
    if (error) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/admin/analytics
// @desc    Get blog analytics
// @access  Private (Admin)
router.get('/admin/analytics', adminAuth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get blog statistics
    const { data: blogStats, error: blogError } = await supabaseAdmin
      .from('blogs')
      .select('status, view_count, created_at')
      .gte('created_at', startDate.toISOString());

    if (blogError) {
      console.error('Error fetching blog analytics:', blogError);
      return res.status(500).json({ message: 'Failed to fetch analytics' });
    }

    // Calculate statistics
    const stats = {
      totalBlogs: blogStats.length,
      publishedBlogs: blogStats.filter(b => b.status === 'published').length,
      draftBlogs: blogStats.filter(b => b.status === 'draft').length,
      totalViews: blogStats.reduce((sum, b) => sum + (b.view_count || 0), 0),
      averageViews: blogStats.length > 0 ? Math.round(blogStats.reduce((sum, b) => sum + (b.view_count || 0), 0) / blogStats.length) : 0
    };

    // Get top performing blogs
    const { data: topBlogs, error: topError } = await supabaseAdmin
      .from('blogs')
      .select('id, title, slug, view_count, created_at')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(5);

    if (topError) {
      console.error('Error fetching top blogs:', topError);
    }

    res.json({
      stats,
      topBlogs: topBlogs || []
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;