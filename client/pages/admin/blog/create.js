import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSave, FaEye, FaRobot, FaLightbulb, FaTimes } from 'react-icons/fa';

const CreateBlogPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    authorName: 'Visa Consultancy Team',
    category: 'Visa Information',
    tags: [],
    featured: false,
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: []
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  useEffect(() => {
    fetchCategories();
    
    // Check if there are URL parameters for pre-filled content (from AI generation)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('title')) {
      setFormData(prev => ({
        ...prev,
        title: urlParams.get('title') || '',
        excerpt: urlParams.get('excerpt') || '',
        content: urlParams.get('content') ? JSON.parse(urlParams.get('content')) : '',
        category: urlParams.get('category') || 'Visa Information',
        tags: urlParams.get('tags') ? JSON.parse(urlParams.get('tags')) : []
      }));
    }
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleKeywordsChange = (e) => {
    const keywords = e.target.value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);
    setFormData(prev => ({
      ...prev,
      seoKeywords: keywords
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blog/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Blog post created successfully!');
        router.push('/admin/blog');
      } else {
        alert('Failed to create blog post: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    try {
      const response = await fetch('/api/ai-blog/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          category: formData.category,
          count: 5
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAiSuggestions(data.suggestions);
        setShowAIAssistant(true);
      }
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    }
  };

  const handleAISuggestion = async (suggestion) => {
    try {
      const response = await fetch('/api/ai-blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          topic: suggestion.title,
          category: formData.category,
          tone: 'professional',
          length: 'medium'
        })
      });

      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          title: data.content.title,
          excerpt: data.content.excerpt,
          content: data.content.content,
          seoTitle: data.content.seoTitle,
          seoDescription: data.content.seoDescription,
          seoKeywords: data.content.seoKeywords
        }));
        setShowAIAssistant(false);
      }
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create Blog Post</h1>
            <p className="text-gray-600">Write and publish a new blog post</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleAIGenerate}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              <FaRobot className="mr-2" />
              AI Assistant
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter blog title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of the blog post"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={handleTagsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="visa, immigration, canada, study"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Content</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your blog content here..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    You can use HTML tags for formatting. Word count: {formData.content.split(' ').length}
                  </p>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">SEO Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="SEO optimized title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Meta description for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.seoKeywords.join(', ')}
                      onChange={handleKeywordsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="visa, immigration, canada, study permit"
                    />
                  </div>
                </div>
              </div>

              {/* Publishing Options */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Publishing Options</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Mark as featured post
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-300"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Create Blog Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* AI Assistant */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaRobot className="mr-2 text-purple-600" />
                  AI Assistant
                </h3>
                <p className="text-gray-600 mb-4">
                  Get AI-powered suggestions for your blog content.
                </p>
                <button
                  onClick={handleAIGenerate}
                  className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  <FaLightbulb className="mr-2" />
                  Get Suggestions
                </button>
              </div>

              {/* Writing Tips */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Writing Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use clear, engaging headlines</li>
                  <li>• Include relevant keywords naturally</li>
                  <li>• Break content into readable sections</li>
                  <li>• Add a compelling call-to-action</li>
                  <li>• Include relevant images and media</li>
                </ul>
              </div>

              {/* Content Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Words:</span>
                    <span className="font-medium">{formData.content.split(' ').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Characters:</span>
                    <span className="font-medium">{formData.content.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Read Time:</span>
                    <span className="font-medium">{Math.ceil(formData.content.split(' ').length / 200)} min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Modal */}
        {showAIAssistant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">AI Content Suggestions</h3>
                  <button
                    onClick={() => setShowAIAssistant(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAISuggestion(suggestion)}
                    >
                      <h4 className="font-medium text-gray-800 mb-2">{suggestion.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Category: {suggestion.category}</span>
                        <span>Difficulty: {suggestion.difficulty}</span>
                        <span>{suggestion.estimatedReadTime} min read</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlogPage;
