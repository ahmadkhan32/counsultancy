import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

// Main App component for Next.js
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      // Check for regular user
      const userToken = localStorage.getItem('userToken');
      const userData = localStorage.getItem('user');
      if (userToken && userData) {
        setUser(JSON.parse(userData));
      }

      // Check for admin user
      const adminToken = localStorage.getItem('adminToken');
      const adminData = localStorage.getItem('admin');
      if (adminToken && adminData) {
        setAdminUser(JSON.parse(adminData));
      }
    };

    checkAuth();
  }, []);

  // Handle route changes
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Logout functions
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setAdminUser(null);
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50">
          <div className="h-full bg-blue-400 animate-pulse"></div>
        </div>
      )}

      {/* Main content with authentication context */}
      <Component 
        {...pageProps} 
        user={user}
        adminUser={adminUser}
        logout={logout}
        adminLogout={adminLogout}
      />
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default App;
