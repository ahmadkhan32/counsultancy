// Next.js API route for inquiries
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mock data for development
    const inquiries = [
      {
        id: 1,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        subject: 'Visa Requirements',
        message: 'What documents do I need for a tourist visa?',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Diana Prince',
        email: 'diana@example.com',
        subject: 'Processing Time',
        message: 'How long does visa processing take?',
        isRead: true,
        createdAt: new Date().toISOString()
      }
    ];

    return res.json(inquiries);
  } catch (error) {
    console.error('Inquiries error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
