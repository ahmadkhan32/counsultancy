import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminTest = () => {
  const [authStatus, setAuthStatus] = useState('checking');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('not-authenticated');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (authStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (authStatus === 'not-authenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Not Authenticated</h1>
          <p className="text-gray-600 mb-6">You need to login to access admin features.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Test Page</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Authentication Status</h2>
              <p className="text-green-700">You are successfully authenticated as an admin.</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">🔗 Available Routes</h2>
              <div className="space-y-2">
                <p className="text-blue-700">• <a href="/admin/dashboard" className="underline">Dashboard</a></p>
                <p className="text-blue-700">• <a href="/admin/blog" className="underline">Blog Management</a></p>
                <p className="text-blue-700">• <a href="/admin/countries" className="underline">Countries</a></p>
                <p className="text-blue-700">• <a href="/admin/login" className="underline">Login</a></p>
                <p className="text-blue-700">• <a href="/admin/register" className="underline">Register</a></p>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Test Actions</h2>
              <div className="space-x-4">
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTest;
