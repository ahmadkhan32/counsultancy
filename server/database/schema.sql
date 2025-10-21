-- Visa Consultancy Database Schema for Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE visa_status AS ENUM ('pending', 'under_review', 'approved', 'rejected', 'completed');
CREATE TYPE consultation_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE inquiry_status AS ENUM ('new', 'read', 'replied', 'closed');
CREATE TYPE visa_category AS ENUM ('student', 'work', 'tourist', 'immigration', 'business', 'transit');
CREATE TYPE blog_category AS ENUM ('news', 'tips', 'updates', 'guide');

-- Users table (for client login/registration)
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    nationality VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Countries table
CREATE TABLE countries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(3) UNIQUE NOT NULL,
    flag VARCHAR(10),
    description TEXT,
    popular_visa_types TEXT[],
    processing_time VARCHAR(100),
    general_requirements TEXT[],
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visa types table
CREATE TABLE visa_types (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category visa_category NOT NULL,
    countries TEXT[],
    description TEXT,
    eligibility TEXT[],
    required_documents TEXT[],
    processing_time VARCHAR(100),
    fees JSONB,
    validity VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    personal_info JSONB NOT NULL,
    visa_info JSONB NOT NULL,
    documents JSONB DEFAULT '[]',
    status visa_status DEFAULT 'pending',
    notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table
CREATE TABLE consultations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    client_info JSONB NOT NULL,
    consultation_details JSONB NOT NULL,
    status consultation_status DEFAULT 'pending',
    admin_notes TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    visa_type VARCHAR(100),
    country VARCHAR(100),
    status inquiry_status DEFAULT 'new',
    admin_reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    tags TEXT[],
    category blog_category DEFAULT 'news',
    author VARCHAR(255) DEFAULT 'Admin',
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_location VARCHAR(255),
    visa_type VARCHAR(100),
    country VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    testimonial TEXT NOT NULL,
    client_photo VARCHAR(500),
    is_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads table
CREATE TABLE file_uploads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visa_types_updated_at BEFORE UPDATE ON visa_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash) VALUES 
('admin@visaconsultancy.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample countries
INSERT INTO countries (name, code, flag, description, popular_visa_types, processing_time, general_requirements, featured) VALUES
('United States', 'US', '🇺🇸', 'The United States offers diverse opportunities for students, workers, and immigrants.', 
 ARRAY['Student Visa', 'Work Visa', 'Tourist Visa', 'Immigration Visa'], '4-12 weeks',
 ARRAY['Valid passport', 'Financial proof', 'Health certificate', 'Police clearance'], true),
('United Kingdom', 'UK', '🇬🇧', 'The UK provides excellent educational and career opportunities with world-class universities.',
 ARRAY['Student Visa', 'Work Visa', 'Tourist Visa', 'Skilled Worker Visa'], '3-8 weeks',
 ARRAY['Valid passport', 'Financial proof', 'English proficiency', 'Health insurance'], true),
('Canada', 'CA', '🇨🇦', 'Canada is known for its welcoming immigration policies and high quality of life.',
 ARRAY['Student Visa', 'Work Visa', 'Express Entry', 'Family Sponsorship'], '4-16 weeks',
 ARRAY['Valid passport', 'Language test', 'Educational assessment', 'Medical exam'], true),
('Australia', 'AU', '🇦🇺', 'Australia offers excellent opportunities for skilled workers and students.',
 ARRAY['Student Visa', 'Work Visa', 'Skilled Migration', 'Tourist Visa'], '4-12 weeks',
 ARRAY['Valid passport', 'Skills assessment', 'Health check', 'Character check'], true);

-- Insert sample visa types
INSERT INTO visa_types (name, category, countries, description, eligibility, required_documents, processing_time, fees, validity) VALUES
('Student Visa', 'student', ARRAY['United States', 'United Kingdom', 'Canada', 'Australia'], 
 'Pursue your education dreams abroad with our comprehensive student visa assistance.',
 ARRAY['Valid passport', 'Admission letter', 'Financial proof', 'English proficiency'],
 ARRAY['Passport', 'Academic transcripts', 'Bank statements', 'IELTS/TOEFL scores'],
 '4-8 weeks', '{"consultation": 100, "application": 200, "currency": "USD"}', 'Duration of study + 6 months'),
('Work Visa', 'work', ARRAY['United States', 'United Kingdom', 'Canada', 'Australia'],
 'Advance your career with professional work visa services for skilled professionals.',
 ARRAY['Job offer', 'Skills assessment', 'Health check', 'Police clearance'],
 ARRAY['Passport', 'Job offer letter', 'CV/Resume', 'Educational certificates'],
 '6-12 weeks', '{"consultation": 150, "application": 300, "currency": "USD"}', '1-4 years'),
('Tourist Visa', 'tourist', ARRAY['United States', 'United Kingdom', 'Canada', 'Australia'],
 'Explore the world with our hassle-free tourist visa application services.',
 ARRAY['Valid passport', 'Travel itinerary', 'Financial proof', 'Return ticket'],
 ARRAY['Passport', 'Travel insurance', 'Hotel bookings', 'Bank statements'],
 '2-4 weeks', '{"consultation": 50, "application": 100, "currency": "USD"}', '3-6 months'),
('Immigration Visa', 'immigration', ARRAY['United States', 'United Kingdom', 'Canada', 'Australia'],
 'Start a new life in your dream country with our immigration visa expertise.',
 ARRAY['Age requirements', 'Language proficiency', 'Work experience', 'Health requirements'],
 ARRAY['Passport', 'Birth certificate', 'Marriage certificate', 'Police clearance'],
 '6-18 months', '{"consultation": 200, "application": 500, "currency": "USD"}', 'Permanent');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, author, published, published_at) VALUES
('Complete Guide to Student Visa Applications', 'complete-guide-student-visa-applications',
 'Everything you need to know about applying for a student visa, including requirements, documents, and tips for success.',
 'Full content about student visa applications...', 'guide', 'Sarah Johnson', true, NOW()),
('New Immigration Policies for 2024', 'new-immigration-policies-2024',
 'Stay updated with the latest immigration policy changes affecting visa applications worldwide.',
 'Full content about new immigration policies...', 'news', 'Michael Chen', true, NOW()),
('Top 10 Tips for Visa Interview Success', 'top-10-tips-visa-interview-success',
 'Expert advice on how to prepare for and ace your visa interview with confidence.',
 'Full content about visa interview tips...', 'tips', 'Emily Rodriguez', true, NOW());

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_location, visa_type, country, rating, testimonial, is_approved, is_featured) VALUES
('Sarah Johnson', 'New York, USA', 'Student Visa', 'Canada', 5, 
 'Visa Consultancy made my dream of studying in Canada a reality. Their expert guidance and attention to detail throughout the application process was exceptional.', 
 true, true),
('Michael Chen', 'California, USA', 'Work Visa', 'Australia', 5,
 'The team at Visa Consultancy is simply outstanding. They helped me secure my work visa for Australia in record time.', 
 true, true),
('Emily Rodriguez', 'Texas, USA', 'Immigration Visa', 'United Kingdom', 5,
 'After years of trying to navigate the complex UK immigration process on my own, I finally decided to seek professional help. Visa Consultancy exceeded all my expectations.', 
 true, true);
