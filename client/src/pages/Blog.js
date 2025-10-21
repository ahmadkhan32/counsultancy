import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Search, Tag, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/blog');
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts(getDefaultPosts());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPosts = () => [
    {
      _id: '1',
      title: 'Complete Guide to Student Visa Applications',
      slug: 'complete-guide-student-visa-applications',
      excerpt: 'Everything you need to know about applying for a student visa, including requirements, documents, and tips for success.',
      content: 'Full content here...',
      featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
      tags: ['Student Visa', 'Education', 'Study Abroad'],
      category: 'guide',
      author: 'Sarah Johnson',
      publishedAt: '2024-01-15T10:00:00Z',
      views: 1250
    },
    {
      _id: '2',
      title: 'New Immigration Policies for 2024',
      slug: 'new-immigration-policies-2024',
      excerpt: 'Stay updated with the latest immigration policy changes affecting visa applications worldwide.',
      content: 'Full content here...',
      featuredImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
      tags: ['Immigration', 'Policy Updates', '2024'],
      category: 'news',
      author: 'Michael Chen',
      publishedAt: '2024-01-10T14:30:00Z',
      views: 890
    },
    {
      _id: '3',
      title: 'Top 10 Tips for Visa Interview Success',
      slug: 'top-10-tips-visa-interview-success',
      excerpt: 'Expert advice on how to prepare for and ace your visa interview with confidence.',
      content: 'Full content here...',
      featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      tags: ['Interview', 'Tips', 'Preparation'],
      category: 'tips',
      author: 'Emily Rodriguez',
      publishedAt: '2024-01-05T09:15:00Z',
      views: 2100
    },
    {
      _id: '4',
      title: 'Work Visa Requirements by Country',
      slug: 'work-visa-requirements-by-country',
      excerpt: 'Comprehensive guide to work visa requirements across different countries and regions.',
      content: 'Full content here...',
      featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      tags: ['Work Visa', 'Requirements', 'Global'],
      category: 'guide',
      author: 'David Kim',
      publishedAt: '2024-01-01T16:45:00Z',
      views: 1680
    },
    {
      _id: '5',
      title: 'Common Visa Application Mistakes to Avoid',
      slug: 'common-visa-application-mistakes-avoid',
      excerpt: 'Learn about the most common mistakes applicants make and how to avoid them.',
      content: 'Full content here...',
      featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
      tags: ['Mistakes', 'Application', 'Tips'],
      category: 'tips',
      author: 'Lisa Wang',
      publishedAt: '2023-12-28T11:20:00Z',
      views: 1950
    },
    {
      _id: '6',
      title: 'Tourist Visa Processing Times Update',
      slug: 'tourist-visa-processing-times-update',
      excerpt: 'Latest updates on tourist visa processing times for popular destinations.',
      content: 'Full content here...',
      featuredImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
      tags: ['Tourist Visa', 'Processing Times', 'Updates'],
      category: 'updates',
      author: 'John Smith',
      publishedAt: '2023-12-25T13:10:00Z',
      views: 1420
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'news', label: 'News' },
    { id: 'tips', label: 'Tips' },
    { id: 'guide', label: 'Guides' },
    { id: 'updates', label: 'Updates' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'tips': return 'bg-green-100 text-green-800';
      case 'guide': return 'bg-purple-100 text-purple-800';
      case 'updates': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Blog & News</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest visa news, expert tips, and comprehensive guides 
              to help you navigate your visa application journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {!searchTerm && selectedCategory === 'all' && filteredPosts.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <div className="card">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={filteredPosts[0].featuredImage}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredPosts[0].category)}`}>
                        {filteredPosts[0].category.charAt(0).toUpperCase() + filteredPosts[0].category.slice(1)}
                      </span>
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{filteredPosts[0].title}</h3>
                    <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{filteredPosts[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{filteredPosts[0].views} views</span>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${filteredPosts[0].slug}`}
                        className="btn btn-primary"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Articles'}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post._id} className="card hover:shadow-lg transition-all duration-300">
                    <div className="mb-4">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                      <div className="flex items-center space-x-2 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="btn btn-outline text-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter for the latest visa news and expert tips
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="btn bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
