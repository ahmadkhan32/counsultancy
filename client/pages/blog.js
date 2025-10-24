import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUser, FaEye, FaClock, FaSearch, FaFilter, FaTag, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    featured: false,
    page: 1,
    limit: 9
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    total: 0
  });

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      
      // Mock blog data for development
      const mockBlogs = [
        {
          id: 1,
          title: "Complete Guide to Canadian Student Visa",
          slug: "complete-guide-canadian-student-visa",
          excerpt: "Everything you need to know about applying for a student visa to Canada, including requirements, process, and tips.",
          content: "This comprehensive guide covers all aspects of Canadian student visa applications...",
          author_name: "Visa Consultancy Team",
          category: "Student Visa",
          featured_image: null,
          tags: ["canada", "student visa", "education", "study permit"],
          featured: true,
          status: "published",
          view_count: 1250,
          read_time: 8,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "US Work Visa Requirements 2024",
          slug: "us-work-visa-requirements-2024",
          excerpt: "Updated requirements and process for obtaining work visas in the United States.",
          content: "The United States offers various work visa categories...",
          author_name: "Visa Consultancy Team",
          category: "Work Visa",
          featured_image: null,
          tags: ["usa", "work visa", "employment", "h1b"],
          featured: false,
          status: "published",
          view_count: 980,
          read_time: 6,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          title: "UK Visitor Visa Application Process",
          slug: "uk-visitor-visa-application-process",
          excerpt: "Step-by-step guide to applying for a UK visitor visa.",
          content: "Applying for a UK visitor visa can seem complex...",
          author_name: "Visa Consultancy Team",
          category: "Tourist Visa",
          featured_image: null,
          tags: ["uk", "visitor visa", "tourism", "travel"],
          featured: true,
          status: "published",
          view_count: 750,
          read_time: 5,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: 4,
          title: "Australia Study Permit Guide",
          slug: "australia-study-permit-guide",
          excerpt: "Complete guide to studying in Australia with student visa requirements.",
          content: "Australia is a popular destination for international students...",
          author_name: "Visa Consultancy Team",
          category: "Student Visa",
          featured_image: null,
          tags: ["australia", "student visa", "study permit", "education"],
          featured: false,
          status: "published",
          view_count: 650,
          read_time: 7,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: 5,
          title: "Canada Express Entry System",
          slug: "canada-express-entry-system",
          excerpt: "Understanding the Express Entry system for Canadian immigration.",
          content: "The Express Entry system is Canada's main immigration pathway...",
          author_name: "Visa Consultancy Team",
          category: "Immigration",
          featured_image: null,
          tags: ["canada", "express entry", "immigration", "permanent residency"],
          featured: true,
          status: "published",
          view_count: 1100,
          read_time: 10,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: 6,
          title: "US Tourist Visa Interview Tips",
          slug: "us-tourist-visa-interview-tips",
          excerpt: "Essential tips for acing your US tourist visa interview.",
          content: "The US tourist visa interview can be nerve-wracking...",
          author_name: "Visa Consultancy Team",
          category: "Tourist Visa",
          featured_image: null,
          tags: ["usa", "tourist visa", "interview", "travel"],
          featured: false,
          status: "published",
          view_count: 890,
          read_time: 6,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ];

      let filteredBlogs = mockBlogs.filter(blog => blog.status === 'published');

      // Apply filters
      if (         filters.category) {
        filteredBlogs = filteredBlogs.filter(blog => blog.category === filters.category);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredBlogs = filteredBlogs.filter(blog => 
          blog.title.toLowerCase().includes(searchLower) ||
          blog.excerpt.toLowerCase().includes(searchLower) ||
          blog.content.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.featured) {
        filteredBlogs = filteredBlogs.filter(blog => blog.featured);
      }

      // Apply pagination
      const total = filteredBlogs.length;
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

      setBlogs(paginatedBlogs);
      setPagination({
        totalPages: Math.ceil(total / filters.limit),
        currentPage: filters.page,
        total: total
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Mock categories for development
      const mockCategories = [
        { id: 1, name: 'Student Visa', description: 'Educational opportunities and study permits', color: 'blue' },
        { id: 2, name: 'Work Visa', description: 'Employment and professional opportunities', color: 'green' },
        { id: 3, name: 'Tourist Visa', description: 'Travel and tourism information', color: 'purple' },
        { id: 4, name: 'Immigration', description: 'Permanent residency and citizenship', color: 'orange' },
        { id: 5, name: 'Visa Information', description: 'General visa information and updates', color: 'indigo' }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Visa & Immigration Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest visa information, immigration news, and expert insights to help you navigate your journey.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Featured Filter */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Featured Only</span>
            </label>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                search: '',
                category: '',
                featured: false,
                page: 1,
                limit: 9
              })}
              className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  {/* Featured Image */}
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <FaTag className="text-4xl mb-2 mx-auto" />
                        <p className="text-sm">{blog.category}</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {blog.category}
                      </span>
                      {blog.featured && (
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {truncateText(blog.excerpt)}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <FaUser className="mr-1" />
                          <span>{blog.author_name}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatDate(blog.published_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <FaEye className="mr-1" />
                          <span>{blog.view_count}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1" />
                          <span>{blog.read_time} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Read More Button */}
                    <Link href={`/blog/${blog.slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-300">
                      Read More
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
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
                        onClick={() => handlePageChange(page)}
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
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
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
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later for new content.
            </p>
          </div>
        )}

        {/* Results Summary */}
        {!loading && blogs.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Showing {blogs.length} of {pagination.total} blogs
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;