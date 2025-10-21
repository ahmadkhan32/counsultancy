import { useState, useEffect } from 'react';
import { FaUser, FaFileAlt, FaCalendarAlt, FaEnvelope, FaSignOutAlt, FaChartBar, FaCheckCircle, FaClock, FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalConsultations: 0,
    pendingConsultations: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      
      // Fetch user's applications
      const applicationsResponse = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const applications = await applicationsResponse.json();

      // Fetch user's consultations
      const consultationsResponse = await fetch('/api/consultations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const consultations = await consultationsResponse.json();

      // Calculate stats
      const totalApplications = applications.length || 0;
      const pendingApplications = applications.filter(app => app.status === 'pending').length || 0;
      const approvedApplications = applications.filter(app => app.status === 'approved').length || 0;
      const totalConsultations = consultations.length || 0;
      const pendingConsultations = consultations.filter(cons => cons.status === 'pending').length || 0;

      setStats({
        totalApplications,
        pendingApplications,
        approvedApplications,
        totalConsultations,
        pendingConsultations
      });

      // Set recent activities (mock data for now)
      setRecentActivities([
        { id: 1, type: 'application', message: 'New visa application submitted', time: '2 hours ago', status: 'pending' },
        { id: 2, type: 'consultation', message: 'Consultation booked for tomorrow', time: '4 hours ago', status: 'confirmed' },
        { id: 3, type: 'application', message: 'Application approved', time: '1 day ago', status: 'approved' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    router.push('/');
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/application"
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                <FaPlus className="mr-2" />
                New Application
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Approved Applications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedApplications}</p>
              </div>
            </div>
          </div>

          {/* Total Consultations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <FaCalendarAlt className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConsultations}</p>
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
                <Link
                  href="/application"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <FaFileAlt className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">New Visa Application</span>
                </Link>
                <Link
                  href="/consultation"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <FaCalendarAlt className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Book Consultation</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <FaEnvelope className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Contact Support</span>
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                {!user?.isVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Email verification required:</strong> Please check your email and click the verification link to activate your account.
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem('userToken');
                          const response = await fetch('/api/user-auth/resend-verification', {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                            }
                          });
                          
                          if (response.ok) {
                            alert('Verification email resent! Please check your inbox.');
                          } else {
                            const data = await response.json();
                            alert(data.message || 'Failed to resend verification email.');
                          }
                        } catch (error) {
                          console.error('Error resending verification:', error);
                          alert('Failed to resend verification email. Please try again.');
                        }
                      }}
                      className="mt-2 text-sm text-yellow-600 hover:text-yellow-500 underline"
                    >
                      Resend verification email
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm text-gray-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
