import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin login if not authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default AdminIndex;
