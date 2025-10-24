export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mock categories for now - in production, this would come from your database
      const categories = [
        { id: 1, name: 'Visa Information', description: 'General visa information and updates', color: 'blue' },
        { id: 2, name: 'Study Visa', description: 'Student visa guides and requirements', color: 'green' },
        { id: 3, name: 'Work Visa', description: 'Work permit and employment visa information', color: 'purple' },
        { id: 4, name: 'Tourist Visa', description: 'Tourist and visitor visa information', color: 'orange' },
        { id: 5, name: 'Family Visa', description: 'Family reunification and sponsorship', color: 'pink' },
        { id: 6, name: 'Business Visa', description: 'Business and investor visa programs', color: 'indigo' },
        { id: 7, name: 'Immigration News', description: 'Latest immigration news and updates', color: 'red' },
        { id: 8, name: 'Success Stories', description: 'Client success stories and testimonials', color: 'yellow' }
      ];

      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, color } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ message: 'Category name is required' });
      }

      // In a real application, you would save this to your database
      const newCategory = {
        id: Date.now(),
        name: name.trim(),
        description: description || '',
        color: color || 'blue',
        createdAt: new Date().toISOString()
      };

      console.log('New category created:', newCategory);

      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
