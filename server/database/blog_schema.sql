-- Blog System Database Schema
-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    author_id UUID REFERENCES auth.users(id),
    author_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    read_time INTEGER DEFAULT 5, -- in minutes
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog comments table
CREATE TABLE IF NOT EXISTS blog_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog analytics table
CREATE TABLE IF NOT EXISTS blog_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    view_date DATE NOT NULL,
    view_count INTEGER DEFAULT 1,
    unique_views INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_comments_blog_id ON blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_analytics_blog_id ON blog_analytics(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_analytics_view_date ON blog_analytics(view_date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default blog categories
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Visa Information', 'visa-information', 'General visa information and updates', '#3B82F6'),
('Immigration News', 'immigration-news', 'Latest immigration news and policy changes', '#10B981'),
('Travel Tips', 'travel-tips', 'Travel advice and tips for visa applicants', '#F59E0B'),
('Success Stories', 'success-stories', 'Client success stories and testimonials', '#8B5CF6'),
('Documentation', 'documentation', 'Document requirements and guidelines', '#EF4444'),
('Country Guides', 'country-guides', 'Country-specific visa guides', '#06B6D4')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, author_name, category, tags, status, featured, seo_title, seo_description, seo_keywords, published_at) VALUES
(
    'Complete Guide to Canada Student Visa 2024',
    'complete-guide-canada-student-visa-2024',
    'Everything you need to know about applying for a Canada student visa in 2024. From requirements to processing times, we cover it all.',
    'Canada remains one of the most popular destinations for international students, offering world-class education and excellent post-graduation opportunities. In this comprehensive guide, we''ll walk you through everything you need to know about applying for a Canada student visa in 2024.

## Canada Student Visa Requirements

### 1. Letter of Acceptance (LOA)
You must have a valid Letter of Acceptance from a Designated Learning Institution (DLI) in Canada. This letter should include:
- Your full name and date of birth
- The program you''ve been accepted into
- Duration of the program
- Start and end dates
- Tuition fees

### 2. Proof of Financial Support
You need to demonstrate that you have sufficient funds to cover:
- Tuition fees for the first year
- Living expenses (approximately CAD $10,000 per year)
- Return transportation costs

### 3. Medical Examination
Most applicants need to undergo a medical examination by a panel physician approved by Immigration, Refugees and Citizenship Canada (IRCC).

### 4. Police Clearance Certificate
You may need to provide police clearance certificates from countries where you''ve lived for more than 6 months.

## Application Process

### Step 1: Gather Required Documents
- Valid passport
- Letter of Acceptance
- Proof of financial support
- Passport-sized photographs
- Medical examination results
- Police clearance certificates
- Statement of purpose

### Step 2: Complete Online Application
- Create an account on the IRCC website
- Fill out the study permit application form
- Pay the application fee (CAD $150)
- Submit biometrics if required

### Step 3: Wait for Processing
Processing times vary by country but typically range from 4-6 weeks for complete applications.

## Tips for Success

1. **Start Early**: Begin your application process at least 3-4 months before your intended start date.

2. **Be Honest**: Provide accurate information in all your documents and applications.

3. **Strong Statement of Purpose**: Write a compelling statement explaining why you want to study in Canada and how it aligns with your career goals.

4. **Financial Documentation**: Ensure your financial documents are clear, recent, and show sufficient funds.

5. **English Proficiency**: While not always required for the visa, having IELTS or TOEFL scores can strengthen your application.

## Common Reasons for Rejection

- Insufficient financial proof
- Weak ties to home country
- Incomplete documentation
- Misrepresentation of information
- Previous immigration violations

## Post-Graduation Opportunities

After completing your studies, you may be eligible for:
- Post-Graduation Work Permit (PGWP)
- Express Entry for permanent residence
- Provincial Nominee Programs

## Conclusion

Applying for a Canada student visa requires careful planning and attention to detail. By following this guide and ensuring all requirements are met, you can increase your chances of success. Remember, each case is unique, so consider consulting with an immigration expert for personalized advice.

Need help with your Canada student visa application? Contact our experienced consultants today for personalized guidance and support.',
    'Visa Consultancy Team',
    'Visa Information',
    ARRAY['Canada', 'Student Visa', 'Study Permit', 'International Students', 'Education'],
    'published',
    true,
    'Complete Guide to Canada Student Visa 2024 | Visa Consultancy',
    'Everything you need to know about applying for a Canada student visa in 2024. Expert guidance on requirements, process, and tips for success.',
    ARRAY['Canada student visa', 'study permit', 'international students', 'visa requirements', 'immigration'],
    NOW()
),
(
    'UK Work Visa: Skilled Worker Route 2024',
    'uk-work-visa-skilled-worker-route-2024',
    'Navigate the UK Skilled Worker visa process with our comprehensive guide. Learn about requirements, sponsorship, and application steps.',
    'The UK Skilled Worker visa has replaced the Tier 2 (General) visa and offers excellent opportunities for skilled professionals worldwide. This guide covers everything you need to know about the Skilled Worker route in 2024.

## What is the Skilled Worker Visa?

The Skilled Worker visa allows you to work in the UK for an approved employer in an eligible job. It''s part of the UK''s points-based immigration system and requires:

- A job offer from a licensed sponsor
- A job at the appropriate skill level
- English language proficiency
- Minimum salary requirements

## Eligibility Requirements

### 1. Job Offer from Licensed Sponsor
Your employer must be on the UK''s list of licensed sponsors and provide you with a Certificate of Sponsorship (CoS).

### 2. Appropriate Skill Level
The job must be at RQF level 3 or above (equivalent to A-levels).

### 3. English Language Requirement
You must prove your English language ability by:
- Being a national of a majority English-speaking country
- Having an academic qualification taught in English
- Passing an approved English language test

### 4. Salary Requirements
Your salary must meet the general salary threshold (£25,600) or the going rate for your specific job, whichever is higher.

## Points-Based System

You need 70 points to qualify:

### Mandatory Requirements (50 points)
- Job offer from licensed sponsor (20 points)
- Job at appropriate skill level (20 points)
- English language at required level (10 points)

### Salary Points (20 points)
- Salary of £25,600 or above (20 points)
- Salary of £23,040-£25,599 (10 points)
- Salary of £20,480-£23,039 (0 points)

### Additional Points
- Job in shortage occupation (20 points)
- PhD in relevant subject (10 points)
- PhD in STEM subject (20 points)

## Application Process

### Step 1: Secure Job Offer
Find employment with a UK employer who holds a valid sponsor license.

### Step 2: Certificate of Sponsorship
Your employer will assign you a Certificate of Sponsorship with a unique reference number.

### Step 3: Online Application
Complete the online application form and pay the required fees:
- Application fee: £625 (outside UK) or £719 (inside UK)
- Immigration Health Surcharge: £624 per year

### Step 4: Biometric Appointment
Book and attend a biometric appointment to provide fingerprints and photographs.

### Step 5: Decision
Most applications are processed within 3 weeks.

## Required Documents

- Valid passport
- Certificate of Sponsorship reference number
- Job title and annual salary
- Employer''s name and sponsor license number
- English language test results (if applicable)
- Bank statements (if required)
- Tuberculosis test results (if applicable)

## Processing Times

- Outside the UK: 3 weeks
- Inside the UK: 8 weeks
- Priority service: 5 working days (additional fee)

## Visa Duration and Extensions

- Initial visa: Up to 5 years
- Extensions: Can be extended multiple times
- Indefinite Leave to Remain: After 5 years of continuous residence

## Family Members

Your spouse/partner and children can apply as dependents if they meet the relationship and financial requirements.

## Switching to Skilled Worker Visa

You can switch to a Skilled Worker visa from certain other visa categories while in the UK, including:
- Student visa
- Graduate visa
- Other work visas

## Common Mistakes to Avoid

1. **Incomplete Documentation**: Ensure all required documents are provided
2. **Salary Issues**: Verify the salary meets the minimum requirements
3. **English Language**: Don''t assume exemption from language requirements
4. **Timing**: Apply well before your current visa expires

## Benefits of Skilled Worker Visa

- Work in the UK for up to 5 years
- Bring family members
- Switch jobs (with new sponsorship)
- Apply for settlement after 5 years
- Access to NHS healthcare

## Conclusion

The UK Skilled Worker visa offers excellent opportunities for skilled professionals. With proper preparation and guidance, you can successfully navigate the application process and start your career in the UK.

Ready to apply for your UK work visa? Our experienced consultants can guide you through every step of the process.',
    'Visa Consultancy Team',
    'Visa Information',
    ARRAY['UK Work Visa', 'Skilled Worker', 'Work Permit', 'UK Immigration', 'Sponsorship'],
    'published',
    true,
    'UK Work Visa: Skilled Worker Route 2024 | Visa Consultancy',
    'Complete guide to UK Skilled Worker visa 2024. Learn requirements, process, and get expert help with your application.',
    ARRAY['UK work visa', 'skilled worker visa', 'UK immigration', 'work permit', 'sponsorship'],
    NOW() - INTERVAL '2 days'
);

-- Create RLS policies for blogs
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blogs
CREATE POLICY "Allow public read access to published blogs" ON blogs
    FOR SELECT USING (status = 'published');

-- Allow authenticated users to read all blogs
CREATE POLICY "Allow authenticated users to read all blogs" ON blogs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin users to manage blogs
CREATE POLICY "Allow admin users to manage blogs" ON blogs
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow public read access to blog categories
CREATE POLICY "Allow public read access to blog categories" ON blog_categories
    FOR SELECT USING (true);

-- Allow public read access to approved comments
CREATE POLICY "Allow public read access to approved comments" ON blog_comments
    FOR SELECT USING (status = 'approved');

-- Allow authenticated users to insert comments
CREATE POLICY "Allow authenticated users to insert comments" ON blog_comments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow admin users to manage comments
CREATE POLICY "Allow admin users to manage comments" ON blog_comments
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow admin users to manage analytics
CREATE POLICY "Allow admin users to manage analytics" ON blog_analytics
    FOR ALL USING (auth.role() = 'authenticated');
