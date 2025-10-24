// Next.js API route for admin registration
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, password, adminCode } = req.body;

    console.log('🔧 Admin registration request:', { firstName, lastName, email, adminCode });

    // Verify admin code
    if (adminCode !== 'ADMIN2024') {
      return res.status(400).json({ 
        message: 'Invalid admin code',
        errors: { adminCode: 'Invalid admin code' }
      });
    }

    // Development bypass - always use for development
    console.log('🔧 Using development registration bypass');
    
    // For development, just return success
    return res.json({
      message: 'Admin account created successfully (Development Mode)',
      user: {
        id: 'dev-admin-' + Date.now(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
