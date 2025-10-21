import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaSearch, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Complete Guide to Canadian Student Visa Application 2024',
      excerpt: 'Everything you need to know about applying for a Canadian student visa, including requirements, documents, and step-by-step process.',
      content: 'Canada is one of the most popular destinations for international students, offering world-class education and excellent post-graduation opportunities...',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Student Visa',
      image: '/blog/canada-student-visa.jpg',
      readTime: '8 min read',
      tags: ['Canada', 'Student Visa', 'Education', 'Study Abroad']
    },
    {
      id: 2,
      title: 'UK Skilled Worker Visa: New Rules and Requirements',
      excerpt: 'Stay updated with the latest changes to the UK Skilled Worker Visa program and learn how to navigate the new requirements.',
      content: 'The UK has recently updated its Skilled Worker Visa program with new rules and requirements that affect thousands of applicants...',
      author: 'Michael Chen',
      date: '2024-01-12',
      category: 'Work Visa',
      image: '/blog/uk-work-visa.jpg',
      readTime: '6 min read',
      tags: ['UK', 'Work Visa', 'Skilled Worker', 'Immigration']
    },
    {
      id: 3,
      title: 'Australia PR Process: Step-by-Step Guide for 2024',
      excerpt: 'Comprehensive guide to Australian permanent residency, including eligibility criteria, points system, and application process.',
      content: 'Australia offers one of the most attractive permanent residency programs for skilled migrants. Here\'s everything you need to know...',
      author: 'Emma Wilson',
      date: '2024-01-10',
      category: 'Immigration',
      image: '/blog/australia-pr.jpg',
      readTime: '12 min read',
      tags: ['Australia', 'PR', 'Immigration', 'Skilled Migration']
    },
    {
      id: 4,
      title: 'US H-1B Visa Lottery: Tips to Increase Your Chances',
      excerpt: 'Learn strategies to improve your H-1B visa lottery chances and understand the selection process better.',
      content: 'The H-1B visa lottery is one of the most competitive immigration processes in the world. Here are proven strategies...',
      author: 'David Rodriguez',
      date: '2024-01-08',
      category: 'Work Visa',
      image: '/blog/us-h1b.jpg',
      readTime: '7 min read',
      tags: ['USA', 'H-1B', 'Work Visa', 'Lottery']
    },
    {
      id: 5,
      title: 'German Blue Card: Fast Track to European Residency',
      excerpt: 'Discover how the German Blue Card can be your pathway to living and working in Europe with simplified requirements.',
      content: 'Germany\'s Blue Card program offers skilled workers an excellent opportunity to work and eventually settle in Europe...',
      author: 'Anna Mueller',
      date: '2024-01-05',
      category: 'Work Visa',
      image: '/blog/german-blue-card.jpg',
      readTime: '9 min read',
      tags: ['Germany', 'Blue Card', 'Europe', 'Work Visa']
    },
    {
      id: 6,
      title: 'New Zealand Working Holiday Visa: Your Gateway to Adventure',
      excerpt: 'Everything about the New Zealand Working Holiday Visa program for young travelers seeking work and travel opportunities.',
      content: 'New Zealand\'s Working Holiday Visa program allows young people to work and travel in this beautiful country for up to 12 months...',
      author: 'James Thompson',
      date: '2024-01-03',
      category: 'Tourist Visa',
      image: '/blog/nz-working-holiday.jpg',
      readTime: '5 min read',
      tags: ['New Zealand', 'Working Holiday', 'Travel', 'Work Abroad']
    }
  ];

  const categories = ['all', 'Student Visa', 'Work Visa', 'Immigration', 'Tourist Visa'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Immigration Blog & News</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest immigration news, visa tips, and expert insights to help you navigate your international journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">📰</div>
                      <h3 className="text-xl font-bold">Featured Article</h3>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-3">
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-gray-500 text-sm">{filteredPosts[0].readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaUser className="mr-2" />
                      <span>{filteredPosts[0].author}</span>
                      <FaCalendarAlt className="ml-4 mr-2" />
                      <span>{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <Link 
                      href={`/blog/${filteredPosts[0].id}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Post Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <span className="text-sm font-medium">{post.category}</span>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-3">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        <FaTag className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Read More Link */}
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-6">Subscribe to our newsletter for the latest immigration news and visa updates.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 max-w-md px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-lg transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
