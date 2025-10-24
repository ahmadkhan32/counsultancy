export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { topic, category, tone = 'professional', length = 'medium' } = req.body;

    // Mock AI-generated content based on topic and category
    const generateContent = (topic, category) => {
      const contentTemplates = {
        'Complete Guide to Visa Requirements for 2024': {
          title: 'Complete Guide to Visa Requirements for 2024',
          excerpt: 'Stay updated with the latest visa requirements and regulations for 2024. This comprehensive guide covers everything you need to know about visa applications, documentation, and processing times.',
          content: `
<h2>Introduction</h2>
<p>Navigating visa requirements can be complex and overwhelming. With constantly changing regulations and new policies being introduced regularly, it's crucial to stay informed about the latest visa requirements for 2024.</p>

<h2>Key Changes in 2024</h2>
<p>Several countries have updated their visa policies this year:</p>
<ul>
<li><strong>Canada:</strong> New Express Entry system updates</li>
<li><strong>United States:</strong> Revised H-1B visa lottery system</li>
<li><strong>United Kingdom:</strong> Updated points-based immigration system</li>
<li><strong>Australia:</strong> New skilled migration pathways</li>
</ul>

<h2>Essential Documentation</h2>
<p>Regardless of the visa type you're applying for, certain documents are universally required:</p>
<ul>
<li>Valid passport (with at least 6 months validity)</li>
<li>Completed visa application form</li>
<li>Passport-sized photographs</li>
<li>Proof of financial means</li>
<li>Travel itinerary or invitation letter</li>
</ul>

<h2>Processing Times</h2>
<p>Visa processing times vary significantly by country and visa type:</p>
<ul>
<li><strong>Tourist Visas:</strong> 1-4 weeks</li>
<li><strong>Study Visas:</strong> 2-8 weeks</li>
<li><strong>Work Visas:</strong> 4-12 weeks</li>
<li><strong>Family Visas:</strong> 6-18 months</li>
</ul>

<h2>Tips for Success</h2>
<p>To increase your chances of visa approval:</p>
<ol>
<li>Apply well in advance of your intended travel date</li>
<li>Ensure all documents are complete and accurate</li>
<li>Provide clear evidence of your ties to your home country</li>
<li>Be honest and consistent in your application</li>
<li>Consider professional consultation for complex cases</li>
</ol>

<h2>Conclusion</h2>
<p>Understanding visa requirements is the first step toward successful international travel or relocation. Stay informed, prepare thoroughly, and don't hesitate to seek professional guidance when needed.</p>
          `,
          seoTitle: 'Visa Requirements 2024: Complete Guide to International Travel',
          seoDescription: 'Comprehensive guide to visa requirements for 2024. Learn about documentation, processing times, and tips for successful visa applications.',
          seoKeywords: ['visa requirements', '2024', 'travel', 'immigration', 'documentation', 'processing times']
        },
        'Step-by-Step Guide to Canadian Study Permit': {
          title: 'Step-by-Step Guide to Canadian Study Permit',
          excerpt: 'Everything you need to know about applying for a Canadian study permit. This comprehensive guide covers eligibility, documentation, and the application process.',
          content: `
<h2>What is a Canadian Study Permit?</h2>
<p>A Canadian study permit is a document that allows foreign nationals to study at designated learning institutions (DLIs) in Canada. It's important to note that a study permit is not a visa - you may also need a visitor visa or electronic travel authorization (eTA).</p>

<h2>Eligibility Requirements</h2>
<p>To be eligible for a Canadian study permit, you must:</p>
<ul>
<li>Have a valid letter of acceptance from a DLI</li>
<li>Prove you have enough money to pay for tuition fees and living expenses</li>
<li>Be a law-abiding citizen with no criminal record</li>
<li>Be in good health (may require medical examination)</li>
<li>Prove you will leave Canada when your permit expires</li>
</ul>

<h2>Required Documents</h2>
<p>When applying for a study permit, you'll need:</p>
<ul>
<li>Letter of acceptance from a DLI</li>
<li>Valid passport or travel document</li>
<li>Proof of financial support</li>
<li>Statement of purpose</li>
<li>Academic transcripts</li>
<li>Language proficiency test results (if applicable)</li>
<li>Medical examination results (if required)</li>
</ul>

<h2>Application Process</h2>
<ol>
<li><strong>Get Accepted:</strong> Apply and receive acceptance from a DLI</li>
<li><strong>Gather Documents:</strong> Collect all required documentation</li>
<li><strong>Apply Online:</strong> Submit your application through the IRCC portal</li>
<li><strong>Biometrics:</strong> Provide biometric information if required</li>
<li><strong>Interview:</strong> Attend an interview if requested</li>
<li><strong>Decision:</strong> Receive your study permit decision</li>
</ol>

<h2>Financial Requirements</h2>
<p>You must prove you have sufficient funds to cover:</p>
<ul>
<li>Tuition fees for your first year</li>
<li>Living expenses (approximately CAD $10,000 per year)</li>
<li>Return transportation</li>
</ul>

<h2>Work Opportunities</h2>
<p>With a valid study permit, you may be eligible to:</p>
<ul>
<li>Work on-campus without a work permit</li>
<li>Work off-campus up to 20 hours per week during academic sessions</li>
<li>Work full-time during scheduled breaks</li>
<li>Participate in co-op programs if your program requires it</li>
</ul>

<h2>Post-Graduation Options</h2>
<p>After completing your studies, you may be eligible for:</p>
<ul>
<li>Post-Graduation Work Permit (PGWP)</li>
<li>Express Entry for permanent residence</li>
<li>Provincial Nominee Programs</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li>Applying too close to your program start date</li>
<li>Incomplete documentation</li>
<li>Insufficient financial proof</li>
<li>Not meeting language requirements</li>
<li>Choosing a non-designated learning institution</li>
</ul>

<h2>Conclusion</h2>
<p>Obtaining a Canadian study permit requires careful planning and preparation. Start your application process early, gather all required documents, and consider seeking professional guidance to ensure a successful application.</p>
          `,
          seoTitle: 'Canadian Study Permit: Complete Application Guide 2024',
          seoDescription: 'Step-by-step guide to applying for a Canadian study permit. Learn about eligibility, documentation, and the application process.',
          seoKeywords: ['canadian study permit', 'study in canada', 'student visa', 'DLI', 'immigration']
        },
        'How to Get a Work Permit in Canada': {
          title: 'How to Get a Work Permit in Canada',
          excerpt: 'Complete guide to obtaining a work permit in Canada. Learn about different types of work permits, eligibility requirements, and the application process.',
          content: `
<h2>Types of Canadian Work Permits</h2>
<p>Canada offers several types of work permits to foreign nationals:</p>
<ul>
<li><strong>Open Work Permit:</strong> Allows you to work for any employer in Canada</li>
<li><strong>Employer-Specific Work Permit:</strong> Tied to a specific employer and job</li>
<li><strong>International Experience Canada (IEC):</strong> For young people from partner countries</li>
<li><strong>Post-Graduation Work Permit:</strong> For recent graduates of Canadian institutions</li>
</ul>

<h2>Eligibility Requirements</h2>
<p>To be eligible for a Canadian work permit, you typically need:</p>
<ul>
<li>A valid job offer from a Canadian employer</li>
<li>Proof that no Canadian citizen or permanent resident can fill the position</li>
<li>Relevant work experience and qualifications</li>
<li>Valid passport and travel documents</li>
<li>Medical examination (if required)</li>
<li>Police clearance certificate</li>
</ul>

<h2>Application Process</h2>
<ol>
<li><strong>Job Offer:</strong> Secure a valid job offer from a Canadian employer</li>
<li><strong>LMIA (if required):</strong> Employer obtains Labour Market Impact Assessment</li>
<li><strong>Gather Documents:</strong> Collect all required documentation</li>
<li><strong>Apply Online:</strong> Submit your application through IRCC portal</li>
<li><strong>Biometrics:</strong> Provide biometric information</li>
<li><strong>Interview:</strong> Attend interview if requested</li>
<li><strong>Decision:</strong> Receive your work permit</li>
</ol>

<h2>Required Documents</h2>
<p>When applying for a work permit, you'll need:</p>
<ul>
<li>Valid passport</li>
<li>Job offer letter</li>
<li>LMIA (if applicable)</li>
<li>Educational credentials</li>
<li>Work experience letters</li>
<li>Medical examination results</li>
<li>Police clearance certificate</li>
<li>Proof of financial support</li>
</ul>

<h2>Labour Market Impact Assessment (LMIA)</h2>
<p>An LMIA is required for most employer-specific work permits. The employer must:</p>
<ul>
<li>Prove they couldn't find a Canadian worker</li>
<li>Advertise the position for at least 4 weeks</li>
<li>Pay the prevailing wage</li>
<li>Meet all employment standards</li>
</ul>

<h2>Express Entry and Work Permits</h2>
<p>If you're eligible for Express Entry, you may be able to:</p>
<ul>
<li>Apply for permanent residence directly</li>
<li>Get a work permit while your PR application is processed</li>
<li>Access additional points for Canadian work experience</li>
</ul>

<h2>Work Permit Conditions</h2>
<p>Your work permit may have conditions such as:</p>
<ul>
<li>Specific employer and job location</li>
<li>Duration of employment</li>
<li>Type of work allowed</li>
<li>Geographic restrictions</li>
</ul>

<h2>Extending Your Work Permit</h2>
<p>To extend your work permit:</p>
<ul>
<li>Apply before your current permit expires</li>
<li>Maintain valid employment</li>
<li>Meet all eligibility requirements</li>
<li>Submit updated documentation</li>
</ul>

<h2>Bringing Family Members</h2>
<p>With a valid work permit, you may be able to:</p>
<ul>
<li>Bring your spouse and dependent children</li>
<li>Allow your spouse to work in Canada</li>
<li>Enroll your children in Canadian schools</li>
</ul>

<h2>Pathway to Permanent Residence</h2>
<p>Canadian work experience can help you qualify for:</p>
<ul>
<li>Express Entry programs</li>
<li>Provincial Nominee Programs</li>
<li>Canadian Experience Class</li>
<li>Employer-specific pathways</li>
</ul>

<h2>Common Challenges</h2>
<ul>
<li>Finding a qualifying job offer</li>
<li>Meeting language requirements</li>
<li>Obtaining LMIA approval</li>
<li>Long processing times</li>
<li>Changing employers</li>
</ul>

<h2>Tips for Success</h2>
<ul>
<li>Start the process early</li>
<li>Work with qualified immigration professionals</li>
<li>Maintain valid status throughout the process</li>
<li>Keep detailed records of your work experience</li>
<li>Consider multiple pathways to permanent residence</li>
</ul>

<h2>Conclusion</h2>
<p>Obtaining a Canadian work permit can open doors to new opportunities and potentially lead to permanent residence. Understanding the requirements and process is crucial for success.</p>
          `,
          seoTitle: 'Canadian Work Permit: Complete Application Guide 2024',
          seoDescription: 'Learn how to get a work permit in Canada. Complete guide covering requirements, process, and pathways to permanent residence.',
          seoKeywords: ['canadian work permit', 'work in canada', 'LMIA', 'express entry', 'immigration']
        }
      };

      return contentTemplates[topic] || {
        title: topic,
        excerpt: `Learn everything you need to know about ${topic.toLowerCase()}. This comprehensive guide covers all the essential information you need.`,
        content: `
<h2>Introduction</h2>
<p>Welcome to our comprehensive guide on ${topic.toLowerCase()}. This article will provide you with all the essential information you need to understand this important topic.</p>

<h2>Key Points</h2>
<p>Here are the most important things you need to know:</p>
<ul>
<li>Understanding the basics</li>
<li>Required documentation</li>
<li>Application process</li>
<li>Common challenges</li>
<li>Tips for success</li>
</ul>

<h2>Conclusion</h2>
<p>We hope this guide has provided you with valuable insights into ${topic.toLowerCase()}. For more information, don't hesitate to contact our immigration experts.</p>
        `,
        seoTitle: `${topic} - Complete Guide 2024`,
        seoDescription: `Comprehensive guide to ${topic.toLowerCase()}. Learn about requirements, process, and tips for success.`,
        seoKeywords: [topic.toLowerCase(), 'guide', '2024', 'immigration', 'visa']
      };
    };

    const content = generateContent(topic, category);

    res.status(200).json({ content });
  } catch (error) {
    console.error('Error generating AI content:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
