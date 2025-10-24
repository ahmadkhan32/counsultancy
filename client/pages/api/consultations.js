// Next.js API route for consultations
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mock data for development
    const consultations = [
      {
        id: 1,
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        phone: '+1234567890',
        preferredDate: '2024-01-15',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob@example.com',
        phone: '+1234567891',
        preferredDate: '2024-01-16',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ];

    return res.json(consultations);
  } catch (error) {
    console.error('Consultations error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
