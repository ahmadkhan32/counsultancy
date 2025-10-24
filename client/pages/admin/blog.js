import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch, FaFilter, FaChartBar, FaRobot, FaLightbulb } from 'react-icons/fa';
import Link from 'next/link';

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    total: 0
  });
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [aiForm, setAiForm] = useState({
    topic: '',
    category: 'Visa Information',
    tone: 'professional',
    length: 'medium',
    keywords: []
  });

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.category && { category: filters.category })
      });

      const response = await fetch(`/api/blog/admin/all?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.blogs);
        setPagination({
          totalPages: data.totalPages,
          currentPage: data.currentPage,
          total: data.total
        });
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/admin/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the list
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };

  const handleStatusChange = async (blogId, newStatus) => {
    try {
      const response = await fetch(`/api/blog/admin/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the list
      } else {
        alert('Failed to update blog status');
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Failed to update blog status');
    }
  };

  const handleAIGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ai-blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(aiForm)
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to create blog page with AI-generated content
        const params = new URLSearchParams({
          title: data.content.title,
          excerpt: data.content.excerpt,
          content: JSON.stringify(data.content.content),
          category: aiForm.category,
          tags: JSON.stringify(data.content.seoKeywords)
        });
        window.location.href = `/admin/blog/create?${params}`;
      } else {
        alert('Failed to generate blog content');
      }
    } catch (error) {
      console.error('Error generating blog:', error);
      alert('Failed to generate blog content');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      draft: { color: 'bg-yellow-100 text-yellow-800', text: 'Draft' },
      published: { color: 'bg-green-100 text-green-800', text: 'Published' },
      archived: { color: 'bg-gray-100 text-gray-800', text: 'Archived' }
    };
    const statusInfo = statusMap[status] || statusMap.draft;
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
            <p className="text-gray-600">Manage your blog posts and content</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAIChatbot(!showAIChatbot)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              <FaRobot className="mr-2" />
              AI Assistant
            </button>
            <Link href="/admin/blog/create" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              <FaPlus className="mr-2" />
              New Post
            </Link>
          </div>
        </div>

        {/* AI Chatbot */}
        {showAIChatbot && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <FaRobot className="text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">AI Blog Content Generator</h2>
            </div>
            
            <form onSubmit={handleAIGenerate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
                <input
                  type="text"
                  required
                  value={aiForm.topic}
                  onChange={(e) => setAiForm(prev => ({ ...prev, topic: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Canada Student Visa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={aiForm.category}
                  onChange={(e) => setAiForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select
                  value={aiForm.tone}
                  onChange={(e) => setAiForm(prev => ({ ...prev, tone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="technical">Technical</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <select
                  value={aiForm.length}
                  onChange={(e) => setAiForm(prev => ({ ...prev, length: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="short">Short (500 words)</option>
                  <option value="medium">Medium (1000 words)</option>
                  <option value="long">Long (2000 words)</option>
                </select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-4">
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  <FaLightbulb className="mr-2" />
                  Generate Blog Content
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setFilters({ search: '', status: '', category: '', page: 1, limit: 10 })}
              className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                        {getStatusBadge(blog.status)}
                        {blog.featured && (
                          <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>By {blog.author_name}</span>
                        <span>{formatDate(blog.created_at)}</span>
                        <span>{blog.view_count} views</span>
                        <span>{blog.read_time} min read</span>
                        <span className="text-blue-600">{blog.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link href={`/blog/${blog.slug}`} className="p-2 text-gray-600 hover:text-blue-600 transition duration-300">
                        <FaEye />
                      </Link>
                      
                      <Link href={`/admin/blog/edit/${blog.id}`} className="p-2 text-gray-600 hover:text-green-600 transition duration-300">
                        <FaEdit />
                      </Link>
                      
                      <select
                        value={blog.status}
                        onChange={(e) => handleStatusChange(blog.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                      
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === pagination.currentPage;
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setFilters(prev => ({ ...prev, page }))}
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentPage
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <FaSearch />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or create a new blog post.
            </p>
            <Link href="/admin/blog/create" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              <FaPlus className="mr-2" />
              Create First Blog Post
            </Link>
          </div>
        )}

        {/* Stats Summary */}
        {!loading && blogs.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{pagination.total}</div>
                <div className="text-gray-600">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {blogs.filter(b => b.status === 'published').length}
                </div>
                <div className="text-gray-600">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {blogs.filter(b => b.status === 'draft').length}
                </div>
                <div className="text-gray-600">Drafts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {blogs.reduce((sum, b) => sum + (b.view_count || 0), 0)}
                </div>
                <div className="text-gray-600">Total Views</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogPage;
