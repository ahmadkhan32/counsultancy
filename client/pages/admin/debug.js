import { useState } from 'react';
import { FaCheck, FaTimes, FaInfo } from 'react-icons/fa';

const AdminDebug = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const runDebugTests = async () => {
    setIsLoading(true);
    const results = [];

    // Test 1: Check if API route exists
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@visaconsultancy.com',
          password: 'admin123456'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        results.push({
          test: 'API Route Test',
          status: 'pass',
          message: `API working - Status: ${response.status}`,
          data: data
        });
      } else {
        results.push({
          test: 'API Route Test',
          status: 'fail',
          message: `API failed - Status: ${response.status}, Message: ${data.message}`,
          data: data
        });
      }
    } catch (error) {
      results.push({
        test: 'API Route Test',
        status: 'fail',
        message: `Network error: ${error.message}`,
        data: null
      });
    }

    // Test 2: Check exact credentials
    const testCredentials = [
      { email: 'admin@visaconsultancy.com', password: 'admin123456', name: 'Exact Match' },
      { email: 'admin@visaconsultancy.com ', password: 'admin123456', name: 'Email with space' },
      { email: 'admin@visaconsultancy.com', password: 'admin123456 ', name: 'Password with space' },
      { email: 'admin@visaconsultancy.com ', password: 'admin123456 ', name: 'Both with spaces' }
    ];

    for (const cred of testCredentials) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cred)
        });

        const data = await response.json();
        
        results.push({
          test: `Credentials Test - ${cred.name}`,
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? 'Login successful' : `Failed: ${data.message}`,
          data: { email: cred.email, password: cred.password, response: data }
        });
      } catch (error) {
        results.push({
          test: `Credentials Test - ${cred.name}`,
          status: 'fail',
          message: `Error: ${error.message}`,
          data: null
        });
      }
    }

    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Login Debug</h1>
            <p className="text-gray-600 mb-6">Debug admin login issues and test API endpoints</p>
            
            <button
              onClick={runDebugTests}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Running Tests...
                </>
              ) : (
                'Run Debug Tests'
              )}
            </button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Results</h2>
              {testResults.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  result.status === 'pass' 
                    ? 'bg-green-50 border-green-400' 
                    : 'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-start">
                    {result.status === 'pass' ? (
                      <FaCheck className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    ) : (
                      <FaTimes className="h-5 w-5 text-red-500 mr-3 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{result.test}</h3>
                      <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                      {result.data && (
                        <details className="mt-2">
                          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                            <FaInfo className="inline mr-1" />
                            View Response Data
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Development Info */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Development Credentials</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Email:</strong> admin@visaconsultancy.com</p>
              <p><strong>Password:</strong> admin123456</p>
              <p><strong>Note:</strong> Make sure there are no extra spaces in the credentials</p>
            </div>
          </div>

          {/* Quick Login Test */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Quick Login Test</h3>
            <p className="text-sm text-blue-700 mb-3">Try logging in with the exact credentials:</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm font-mono">Email: admin@visaconsultancy.com</p>
              <p className="text-sm font-mono">Password: admin123456</p>
            </div>
            <a 
              href="/admin/login" 
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDebug;
