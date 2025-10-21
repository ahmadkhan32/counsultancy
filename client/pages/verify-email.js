import { useState, useEffect } from 'react';
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

const VerifyEmailPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken) => {
    try {
      const response = await fetch('/api/user-auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('success');
        setMessage('Your email has been verified successfully!');
        
        // Update user data in localStorage if logged in
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          user.isVerified = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
      } else {
        setVerificationStatus('error');
        setMessage(data.message || 'Email verification failed. The link may be invalid or expired.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const resendVerificationEmail = async () => {
    setIsResending(true);
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        setMessage('Please log in to resend verification email.');
        setIsResending(false);
        return;
      }

      const user = JSON.parse(userData);
      
      // In a real implementation, you would call an API endpoint to resend verification email
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('Verification email has been resent. Please check your inbox.');
    } catch (error) {
      console.error('Resend error:', error);
      setMessage('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'verifying':
        return <FaSpinner className="text-blue-600 text-4xl animate-spin" />;
      case 'success':
        return <FaCheckCircle className="text-green-600 text-4xl" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-600 text-4xl" />;
      default:
        return <FaEnvelope className="text-blue-600 text-4xl" />;
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'verifying':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className={`bg-white rounded-lg shadow-xl p-8 text-center border-2 ${getStatusColor()}`}>
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {verificationStatus === 'verifying' && 'Verifying Email...'}
            {verificationStatus === 'success' && 'Email Verified!'}
            {verificationStatus === 'error' && 'Verification Failed'}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {verificationStatus === 'verifying' && 'Please wait while we verify your email address.'}
            {verificationStatus === 'success' && message}
            {verificationStatus === 'error' && message}
          </p>

          {/* Actions */}
          {verificationStatus === 'success' && (
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 block"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 block"
              >
                Back to Home
              </Link>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="space-y-4">
              <button
                onClick={resendVerificationEmail}
                disabled={isResending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                {isResending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Resending...
                  </>
                ) : (
                  'Resend Verification Email'
                )}
              </button>
              <Link
                href="/login"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 block"
              >
                Back to Login
              </Link>
            </div>
          )}

          {verificationStatus === 'verifying' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                This may take a few moments...
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Didn't receive the email?</strong><br />
              Check your spam folder or try resending the verification email.
            </p>
            <p>
              <strong>Link expired?</strong><br />
              Request a new verification email from your account settings.
            </p>
            <p>
              <strong>Still having issues?</strong><br />
              <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
