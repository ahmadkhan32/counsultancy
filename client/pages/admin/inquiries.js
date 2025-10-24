import { useState, useEffect } from 'react';
import { FaEnvelope, FaEye, FaReply, FaTrash, FaCheck } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !inquiry.isRead;
    return inquiry.isRead;
  });

  const markAsRead = async (id) => {
    try {
      // In a real app, you'd make an API call here
      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === id ? { ...inquiry, isRead: true } : inquiry
      ));
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Inquiries</h1>
          <p className="text-gray-600">Manage customer inquiries and messages</p>
        </div>

        {/* Filter buttons */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['all', 'unread', 'read'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({status === 'all' ? inquiries.length : inquiries.filter(inq => status === 'unread' ? !inq.isRead : inq.isRead).length})
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries list */}
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className={`bg-white rounded-lg shadow p-6 ${!inquiry.isRead ? 'border-l-4 border-blue-500' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{inquiry.subject}</h3>
                    {!inquiry.isRead && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="font-medium">{inquiry.name}</span>
                    <span>{inquiry.email}</span>
                    <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{inquiry.message}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!inquiry.isRead && (
                    <button
                      onClick={() => markAsRead(inquiry.id)}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                      title="Mark as read"
                    >
                      <FaCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50" title="Reply">
                    <FaReply className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50" title="View details">
                    <FaEye className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50" title="Delete">
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <FaEnvelope className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No inquiries found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'No inquiries have been received yet.' : `No ${filter} inquiries found.`}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
