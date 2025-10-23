import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const AdminNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to login
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-red-500 text-6xl mb-4">
            <FaExclamationTriangle />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The admin page you're looking for doesn't exist or you don't have permission to access it.
          </p>
          <div className="space-y-3">
            <Link 
              href="/admin/dashboard" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaHome className="mr-2" />
              Go to Dashboard
            </Link>
            <br />
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
