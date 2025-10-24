// Next.js API route for applications
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mock data for development
    const applications = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        visaType: 'Tourist',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        visaType: 'Business',
        status: 'approved',
        createdAt: new Date().toISOString()
      }
    ];

    return res.json(applications);
  } catch (error) {
    console.error('Applications error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
