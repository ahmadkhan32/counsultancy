import { useState, useEffect } from 'react';
import { FaUsers, FaFileAlt, FaCalendarAlt, FaEnvelope, FaChartBar, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalConsultations: 0,
    pendingConsultations: 0,
    totalInquiries: 0,
    unreadInquiries: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch applications
      const applicationsResponse = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const applications = await applicationsResponse.json();

      // Fetch consultations
      const consultationsResponse = await fetch('/api/consultations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const consultations = await consultationsResponse.json();

      // Fetch inquiries
      const inquiriesResponse = await fetch('/api/inquiries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const inquiries = await inquiriesResponse.json();

      // Calculate stats
      const totalApplications = applications.length || 0;
      const pendingApplications = applications.filter(app => app.status === 'pending').length || 0;
      const approvedApplications = applications.filter(app => app.status === 'approved').length || 0;
      const totalConsultations = consultations.length || 0;
      const pendingConsultations = consultations.filter(cons => cons.status === 'pending').length || 0;
      const totalInquiries = inquiries.length || 0;
      const unreadInquiries = inquiries.filter(inq => !inq.isRead).length || 0;

      setStats({
        totalApplications,
        pendingApplications,
        approvedApplications,
        totalConsultations,
        pendingConsultations,
        totalInquiries,
        unreadInquiries
      });

      // Set recent activities (mock data for now)
      setRecentActivities([
        { id: 1, type: 'application', message: 'New visa application submitted', time: '2 hours ago', status: 'pending' },
        { id: 2, type: 'consultation', message: 'Consultation booked for tomorrow', time: '4 hours ago', status: 'confirmed' },
        { id: 3, type: 'inquiry', message: 'New inquiry received', time: '6 hours ago', status: 'unread' },
        { id: 4, type: 'application', message: 'Application approved', time: '1 day ago', status: 'approved' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return <FaFileAlt className="text-blue-500" />;
      case 'consultation':
        return <FaCalendarAlt className="text-green-500" />;
      case 'inquiry':
        return <FaEnvelope className="text-purple-500" />;
      default:
        return <FaChartBar className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'unread':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your visa consultancy.</p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Applications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <FaFileAlt className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <FaClock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>

          {/* Total Consultations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaCalendarAlt className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConsultations}</p>
              </div>
            </div>
          </div>

          {/* Unread Inquiries */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <FaEnvelope className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unreadInquiries}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <a
                  href="/admin/applications"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <FaFileAlt className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Manage Applications</span>
                </a>
                <a
                  href="/admin/consultations"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <FaCalendarAlt className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Manage Consultations</span>
                </a>
                <a
                  href="/admin/inquiries"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <FaEnvelope className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Manage Inquiries</span>
                </a>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">System Status</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <FaExclamationTriangle className="mr-1" />
                    Configure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
