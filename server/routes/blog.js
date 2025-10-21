const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (page - 1) * limit;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockBlogPosts = [
        {
          id: '1',
          title: 'Top 10 Countries for Student Visas in 2024',
          slug: 'top-10-countries-student-visas-2024',
          excerpt: 'Discover the best countries for international students in 2024.',
          content: 'Full article content here...',
          category: 'news',
          tags: ['student visa', 'education', 'study abroad'],
          featured_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
          author: 'Visa Expert',
          is_published: true,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Complete Guide to US Work Visa Process',
          slug: 'complete-guide-us-work-visa-process',
          excerpt: 'Everything you need to know about US work visas.',
          content: 'Full article content here...',
          category: 'guide',
          tags: ['work visa', 'USA', 'employment'],
          featured_image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
          author: 'Immigration Lawyer',
          is_published: true,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Visa Processing Time Updates - January 2024',
          slug: 'visa-processing-time-updates-january-2024',
          excerpt: 'Latest updates on visa processing times worldwide.',
          content: 'Full article content here...',
          category: 'updates',
          tags: ['processing time', 'updates', 'visa news'],
          featured_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
          author: 'Visa Consultant',
          is_published: true,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ];

      let filteredPosts = mockBlogPosts;

      if (category && category !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === category);
      }

      if (search) {
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase())
        );
      }

      const paginatedPosts = filteredPosts.slice(offset, offset + parseInt(limit));
      
      return res.json({
        posts: paginatedPosts,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(filteredPosts.length / limit),
          total_posts: filteredPosts.length,
          has_next: offset + parseInt(limit) < filteredPosts.length,
          has_prev: page > 1
        }
      });
    }

    let query = supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const { data: posts, error, count } = await query
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Error fetching blog posts:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({
      posts: posts || [],
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        total_posts: count,
        has_next: offset + parseInt(limit) < count,
        has_prev: page > 1
      }
    });
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const mockPost = {
        id: '1',
        title: 'Top 10 Countries for Student Visas in 2024',
        slug: slug,
        excerpt: 'Discover the best countries for international students in 2024.',
        content: 'Full article content here with detailed information about student visas...',
        category: 'news',
        tags: ['student visa', 'education', 'study abroad'],
        featured_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        author: 'Visa Expert',
        is_published: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      return res.json(mockPost);
    }

    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Blog post fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Admin
router.post('/', [
  auth,
  body('title').notEmpty().trim(),
  body('slug').notEmpty().trim(),
  body('excerpt').notEmpty().trim(),
  body('content').notEmpty().trim(),
  body('category').isIn(['news', 'tips', 'updates', 'guide']),
  body('tags').optional().isArray(),
  body('featured_image').optional().isURL(),
  body('author').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, slug, excerpt, content, category, tags, featured_image, author } = req.body;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      const newPost = {
        id: Date.now().toString(),
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        featured_image,
        author: author || 'Admin',
        is_published: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      return res.status(201).json(newPost);
    }

    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([{
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        featured_image,
        author: author || 'Admin',
        is_published: true,
        published_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(201).json(post);
  } catch (error) {
    console.error('Blog post creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Admin
router.put('/:id', [
  auth,
  body('title').optional().notEmpty().trim(),
  body('slug').optional().notEmpty().trim(),
  body('excerpt').optional().notEmpty().trim(),
  body('content').optional().notEmpty().trim(),
  body('category').optional().isIn(['news', 'tips', 'updates', 'guide']),
  body('tags').optional().isArray(),
  body('featured_image').optional().isURL(),
  body('author').optional().trim()
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
      const updatedPost = {
        id,
        ...updateData,
        updated_at: new Date().toISOString()
      };
      return res.json(updatedPost);
    }

    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Blog post update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post (soft delete)
// @access  Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Development bypass
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.json({ message: 'Blog post deleted successfully (Development Mode)' });
    }

    const { error } = await supabaseAdmin
      .from('blog_posts')
      .update({
        is_published: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Blog post deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;