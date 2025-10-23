import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCalendarAlt, FaUser, FaEye, FaClock, FaTag, FaShare, FaThumbsUp, FaComment, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlog();
      fetchComments();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${slug}`);
      const data = await response.json();

      if (response.ok) {
        setBlog(data);
        // Update page title
        document.title = `${data.title} | Visa Consultancy Blog`;
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      router.push('/404');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blog/${blog?.id}/comments`);
      const data = await response.json();
      if (response.ok) {
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmittingComment(true);

    try {
      const response = await fetch(`/api/blog/${blog.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentForm),
      });

      if (response.ok) {
        setCommentSubmitted(true);
        setCommentForm({ authorName: '', authorEmail: '', content: '' });
        // Refresh comments
        fetchComments();
      } else {
        alert('Failed to submit comment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareBlog = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Blog URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                {blog.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{blog.author_name}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(blog.published_at)}</span>
                </div>
                <div className="flex items-center">
                  <FaEye className="mr-2" />
                  <span>{blog.view_count} views</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{blog.read_time} min read</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={shareBlog}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-lg p-8">
              {/* Featured Image */}
              {blog.featured_image && (
                <div className="mb-8">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Excerpt */}
              <div className="mb-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-lg text-gray-700 italic">{blog.excerpt}</p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {blog.content && (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                )}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition duration-300"
                      >
                        <FaTag className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300">
                      <FaThumbsUp className="mr-2" />
                      Like
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300">
                      <FaShare className="mr-2" />
                      Share
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Last updated: {formatDate(blog.updated_at)}
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaComment className="mr-3" />
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              {!commentSubmitted ? (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={commentForm.authorName}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, authorName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={commentForm.authorEmail}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, authorEmail: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={commentForm.content}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your thoughts..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-300"
                  >
                    {submittingComment ? 'Submitting...' : 'Submit Comment'}
                  </button>
                </form>
              ) : (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    Thank you for your comment! It will be reviewed before publication.
                  </p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{comment.author_name}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  <Link href="/blog">
                    <a className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                      <h4 className="font-medium text-gray-800 mb-1">Canada Student Visa Guide</h4>
                      <p className="text-sm text-gray-600">Complete guide to studying in Canada</p>
                    </a>
                  </Link>
                  <Link href="/blog">
                    <a className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                      <h4 className="font-medium text-gray-800 mb-1">UK Work Visa Process</h4>
                      <p className="text-sm text-gray-600">Everything about UK work permits</p>
                    </a>
                  </Link>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-blue-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-blue-100 mb-4">
                  Get the latest visa news and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg text-gray-800"
                  />
                  <button className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
