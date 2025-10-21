# 🗄️ Supabase Database Setup Guide

## 🚀 **Step-by-Step Supabase Setup**

### **Step 1: Create Supabase Account & Project**

1. **Go to Supabase:**
   - Visit [supabase.com](https://supabase.com)
   - Click "Start your project" or "Sign up"

2. **Create Account:**
   - Sign up with GitHub, Google, or email
   - Verify your email address

3. **Create New Project:**
   - Click "New Project"
   - Choose your organization
   - Fill in project details:
     - **Name:** `visa-consultancy-db`
     - **Database Password:** (choose a strong password - save this!)
     - **Region:** Choose closest to your location
   - Click "Create new project"

### **Step 2: Get Your Supabase Credentials**

After project creation, you'll get:

1. **Project URL:** `https://your-project-id.supabase.co`
2. **API Keys:**
   - **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**To find these:**
- Go to your project dashboard
- Click "Settings" → "API"
- Copy the Project URL and API keys

### **Step 3: Create Environment File**

Create `server/.env` file in your project root:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d

# Email Configuration (Optional - for production)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Client URL
CLIENT_URL=http://localhost:3000

# Server Port
PORT=5000
```

### **Step 4: Run Database Schema**

1. **Go to SQL Editor:**
   - In your Supabase dashboard
   - Click "SQL Editor" in the left sidebar

2. **Run Schema:**
   - Copy the entire content from `server/database/schema.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute

3. **Verify Tables:**
   - Go to "Table Editor" in the left sidebar
   - You should see all tables created:
     - users
     - admin_users
     - applications
     - consultations
     - inquiries
     - countries
     - visa_types
     - blog_posts
     - testimonials

### **Step 5: Create Admin User**

Run the admin creation script:

```bash
cd server
node create-admin.js
```

This will create an admin user with:
- **Email:** `admin@visaconsultancy.com`
- **Password:** `admin123456`

### **Step 6: Test the Setup**

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test API endpoints:**
   ```bash
   # Test health check
   curl http://localhost:5000/api/health
   
   # Test countries endpoint
   curl http://localhost:5000/api/countries
   
   # Test admin login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@visaconsultancy.com","password":"admin123456"}'
   ```

## 🔧 **Database Schema Overview**

### **📋 Tables Created:**

#### **👥 Users Table**
- User authentication and profiles
- Email verification system
- Password reset functionality

#### **👨‍💼 Admin Users Table**
- Admin authentication
- Role-based access control

#### **📝 Applications Table**
- Visa applications
- Document uploads
- Status tracking

#### **📅 Consultations Table**
- Consultation bookings
- Scheduling system
- Status management

#### **💬 Inquiries Table**
- Contact form submissions
- Inquiry management

#### **🌍 Countries Table**
- Country information
- Visa types per country
- Processing times

#### **📋 Visa Types Table**
- Visa categories
- Requirements and eligibility
- Fees and processing times

#### **📰 Blog Posts Table**
- News and articles
- SEO-friendly content
- Category management

#### **⭐ Testimonials Table**
- Client reviews
- Rating system
- Approval workflow

## 🛡️ **Security Features**

### **🔐 Row Level Security (RLS)**
- Data access control
- User-specific data isolation
- Admin-only access to sensitive data

### **🔑 Authentication**
- JWT token-based authentication
- Password hashing with bcrypt
- Email verification system

### **🛡️ Data Validation**
- Input validation on all endpoints
- File upload restrictions
- SQL injection protection

## 🚀 **CRUD Operations Available**

### **📊 Public Endpoints:**
- `GET /api/countries` - Get all countries
- `GET /api/visa-types` - Get all visa types
- `GET /api/blog` - Get blog posts
- `GET /api/testimonials` - Get testimonials
- `POST /api/testimonials` - Submit testimonial

### **👤 User Endpoints:**
- `GET /api/applications/user` - Get user's applications
- `POST /api/applications` - Submit application
- `GET /api/consultations/user` - Get user's consultations
- `POST /api/consultations` - Book consultation

### **👨‍💼 Admin Endpoints:**
- `GET /api/applications` - Get all applications
- `PUT /api/applications/:id` - Update application status
- `GET /api/consultations` - Get all consultations
- `PUT /api/consultations/:id` - Update consultation
- `GET /api/inquiries` - Get all inquiries
- `POST /api/countries` - Create country
- `PUT /api/countries/:id` - Update country
- `DELETE /api/countries/:id` - Delete country

## 🔧 **Development vs Production**

### **🛠️ Development Mode:**
- Works without Supabase configuration
- Uses mock data
- Development credentials provided
- All features functional

### **🚀 Production Mode:**
- Requires Supabase setup
- Real database operations
- Email functionality
- Full security features

## 📱 **Frontend Integration**

### **🔗 API Integration:**
- All frontend pages connect to backend APIs
- Real-time data updates
- Error handling and loading states

### **🎨 User Interface:**
- Responsive design
- Modern UI components
- Form validation
- File upload functionality

## 🎯 **Next Steps After Setup**

1. **Test all endpoints** using the provided test commands
2. **Create sample data** using the admin panel
3. **Test user registration** and email verification
4. **Test file uploads** for applications
5. **Configure email settings** for production

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **"Supabase credentials not found"**
   - Check your `.env` file exists
   - Verify credentials are correct
   - Restart the server

2. **"Table doesn't exist"**
   - Run the schema.sql file in Supabase SQL editor
   - Check table names match exactly

3. **"Authentication failed"**
   - Verify JWT_SECRET is set
   - Check admin user was created
   - Use correct credentials

4. **"Email not working"**
   - Configure email settings in `.env`
   - Check SMTP credentials
   - Verify email service is active

## 🎉 **Success!**

Once setup is complete, you'll have:
- ✅ Full database with all tables
- ✅ Complete CRUD operations
- ✅ User authentication system
- ✅ Admin management panel
- ✅ File upload functionality
- ✅ Email verification system
- ✅ Production-ready application

**Your visa consultancy website is now fully functional with a complete database backend!** 🚀✨
