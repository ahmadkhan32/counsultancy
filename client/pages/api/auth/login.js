// Next.js API route for admin login
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    console.log('🔧 Admin login request:', { email, password });
    console.log('📧 Email type:', typeof email);
    console.log('🔑 Password type:', typeof password);
    console.log('📧 Email length:', email?.length);
    console.log('🔑 Password length:', password?.length);

    // Development bypass - always use for development
    console.log('🔧 Using development login bypass');
    console.log('✅ Expected email: admin@visaconsultancy.com');
    console.log('✅ Expected password: admin123456');
    
    // Check for development credentials with more flexible matching
    const emailMatch = email === 'admin@visaconsultancy.com' || email === 'admin@visaconsultancy.com ';
    const passwordMatch = password === 'admin123456' || password === 'admin123456 ';
    
    console.log('📧 Email match:', emailMatch);
    console.log('🔑 Password match:', passwordMatch);
    console.log('📧 Email comparison:', `"${email}" === "admin@visaconsultancy.com"`);
    console.log('🔑 Password comparison:', `"${password}" === "admin123456"`);
    
    if (emailMatch && passwordMatch) {
      console.log('✅ Development credentials match!');
      
      // Generate a simple token for development
      const token = 'dev-admin-token-' + Date.now();
      
      return res.json({
        token,
        user: {
          id: 'dev-admin-1',
          email: 'admin@visaconsultancy.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin'
        }
      });
    } else {
      console.log('❌ Development credentials do not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
