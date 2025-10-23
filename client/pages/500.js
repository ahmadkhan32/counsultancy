import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

const Custom500 = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-red-500 text-6xl mb-4">
            <FaExclamationTriangle />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">500 - Server Error</h1>
          <p className="text-gray-600 mb-6">
            Something went wrong on our end. Please try again later.
          </p>
          <div className="space-y-3">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaHome className="mr-2" />
              Go Home
            </Link>
            <br />
            <button
              onClick={() => router.reload()}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom500;
