export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category, count = 5 } = req.body;

    // Mock AI suggestions based on category
    const suggestionsByCategory = {
      'Visa Information': [
        {
          title: 'Complete Guide to Visa Requirements for 2024',
          category: 'Visa Information',
          difficulty: 'Beginner',
          estimatedReadTime: 8,
          description: 'Everything you need to know about visa requirements this year'
        },
        {
          title: 'Common Visa Mistakes to Avoid',
          category: 'Visa Information',
          difficulty: 'Intermediate',
          estimatedReadTime: 6,
          description: 'Learn from common mistakes that can delay your visa application'
        },
        {
          title: 'Visa Processing Times: What to Expect',
          category: 'Visa Information',
          difficulty: 'Beginner',
          estimatedReadTime: 5,
          description: 'Understanding processing times for different visa types'
        }
      ],
      'Study Visa': [
        {
          title: 'Step-by-Step Guide to Canadian Study Permit',
          category: 'Study Visa',
          difficulty: 'Beginner',
          estimatedReadTime: 10,
          description: 'Complete guide to applying for a Canadian study permit'
        },
        {
          title: 'UK Student Visa Requirements 2024',
          category: 'Study Visa',
          difficulty: 'Intermediate',
          estimatedReadTime: 7,
          description: 'Updated requirements for UK student visas'
        },
        {
          title: 'Scholarship Opportunities for International Students',
          category: 'Study Visa',
          difficulty: 'Beginner',
          estimatedReadTime: 6,
          description: 'Finding and applying for scholarships'
        }
      ],
      'Work Visa': [
        {
          title: 'How to Get a Work Permit in Canada',
          category: 'Work Visa',
          difficulty: 'Intermediate',
          estimatedReadTime: 9,
          description: 'Complete guide to Canadian work permits'
        },
        {
          title: 'US H-1B Visa Process Explained',
          category: 'Work Visa',
          difficulty: 'Advanced',
          estimatedReadTime: 8,
          description: 'Understanding the H-1B visa process'
        },
        {
          title: 'Australia Skilled Migration Program',
          category: 'Work Visa',
          difficulty: 'Intermediate',
          estimatedReadTime: 7,
          description: 'Guide to Australian skilled migration'
        }
      ],
      'Tourist Visa': [
        {
          title: 'Schengen Visa Application Guide',
          category: 'Tourist Visa',
          difficulty: 'Beginner',
          estimatedReadTime: 6,
          description: 'Complete guide to Schengen visa application'
        },
        {
          title: 'US Tourist Visa Interview Tips',
          category: 'Tourist Visa',
          difficulty: 'Intermediate',
          estimatedReadTime: 5,
          description: 'How to prepare for your US tourist visa interview'
        }
      ],
      'Family Visa': [
        {
          title: 'Family Sponsorship in Canada',
          category: 'Family Visa',
          difficulty: 'Intermediate',
          estimatedReadTime: 8,
          description: 'Guide to sponsoring family members in Canada'
        },
        {
          title: 'Spouse Visa Requirements',
          category: 'Family Visa',
          difficulty: 'Beginner',
          estimatedReadTime: 6,
          description: 'Understanding spouse visa requirements'
        }
      ]
    };

    const categorySuggestions = suggestionsByCategory[category] || suggestionsByCategory['Visa Information'];
    const suggestions = categorySuggestions.slice(0, count);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
