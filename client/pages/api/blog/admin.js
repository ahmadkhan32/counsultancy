export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .trim('-');

    // Create blog post object
    const blogPost = {
      id: Date.now().toString(),
      title,
      slug,
      excerpt,
      content,
      authorName,
      category,
      tags: Array.isArray(tags) ? tags : [],
      featured: Boolean(featured),
      status: status || 'draft',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      seoKeywords: Array.isArray(seoKeywords) ? seoKeywords : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === 'published' ? new Date().toISOString() : null
    };

    // In a real application, you would save this to your database
    // For now, we'll just return success
    console.log('Blog post created:', blogPost);

    res.status(201).json({
      message: 'Blog post created successfully',
      blogPost
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
