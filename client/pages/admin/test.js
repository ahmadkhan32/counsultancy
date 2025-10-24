import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';

const AdminTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const router = useRouter();

  const runTests = async () => {
    setIsRunning(true);
    const results = [];

    // Test 1: Check if admin login API works
    try {
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@visaconsultancy.com',
          password: 'admin123456'
        })
      });
      
      if (loginResponse.ok) {
        results.push({ test: 'Admin Login API', status: 'pass', message: 'Login API working correctly' });
      } else {
        results.push({ test: 'Admin Login API', status: 'fail', message: 'Login API failed' });
      }
    } catch (error) {
      results.push({ test: 'Admin Login API', status: 'fail', message: `Login API error: ${error.message}` });
    }

    // Test 2: Check if admin registration API works
    try {
      const registerResponse = await fetch('/api/auth/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'Admin',
          email: 'test@example.com',
          password: 'testpassword123',
          adminCode: 'ADMIN2024'
        })
      });
      
      if (registerResponse.ok) {
        results.push({ test: 'Admin Registration API', status: 'pass', message: 'Registration API working correctly' });
      } else {
        results.push({ test: 'Admin Registration API', status: 'fail', message: 'Registration API failed' });
      }
    } catch (error) {
      results.push({ test: 'Admin Registration API', status: 'fail', message: `Registration API error: ${error.message}` });
    }

    // Test 3: Check if dashboard APIs work
    try {
      const applicationsResponse = await fetch('/api/applications');
      const consultationsResponse = await fetch('/api/consultations');
      const inquiriesResponse = await fetch('/api/inquiries');
      
      if (applicationsResponse.ok && consultationsResponse.ok && inquiriesResponse.ok) {
        results.push({ test: 'Dashboard APIs', status: 'pass', message: 'All dashboard APIs working correctly' });
      } else {
        results.push({ test: 'Dashboard APIs', status: 'fail', message: 'Some dashboard APIs failed' });
      }
    } catch (error) {
      results.push({ test: 'Dashboard APIs', status: 'fail', message: `Dashboard APIs error: ${error.message}` });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin System Test</h1>
            <p className="text-gray-600 mb-6">Test the admin authentication and API endpoints</p>
            
            <button
              onClick={runTests}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center mx-auto"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Running Tests...
                </>
              ) : (
                'Run Tests'
              )}
            </button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
              {testResults.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  result.status === 'pass' 
                    ? 'bg-green-50 border-green-400' 
                    : 'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-center">
                    {result.status === 'pass' ? (
                      <FaCheck className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <FaTimes className="h-5 w-5 text-red-500 mr-3" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{result.test}</h3>
                      <p className="text-sm text-gray-600">{result.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Pages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/admin/login" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300">
                <FaArrowRight className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-800 font-medium">Admin Login</span>
              </Link>
              <Link href="/admin/register" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition duration-300">
                <FaArrowRight className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Admin Registration</span>
              </Link>
              <Link href="/admin/dashboard" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300">
                <FaArrowRight className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-purple-800 font-medium">Admin Dashboard</span>
              </Link>
              <Link href="/admin/applications" className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition duration-300">
                <FaArrowRight className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-orange-800 font-medium">Applications</span>
              </Link>
            </div>
          </div>

          {/* Development Credentials */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Development Credentials</h3>
            <div className="text-sm text-yellow-700">
              <p><strong>Email:</strong> admin@visaconsultancy.com</p>
              <p><strong>Password:</strong> admin123456</p>
              <p><strong>Admin Code:</strong> ADMIN2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTest;