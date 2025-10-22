# Visa Consultancy Website

A comprehensive visa consultancy website built with **Next.js** frontend and **Node.js** backend, featuring **Supabase** database integration, admin panel, and modern UI design.

## 🌟 Features

### Frontend (Next.js)
- **🏠 Home Page**: Hero section, features showcase, popular destinations, visa types overview
- **ℹ️ About Us**: Company information, team profiles, certifications, mission & vision
- **📋 Visa Categories**: Detailed visa types with requirements, processing times, and fees
- **🌍 Countries**: Popular destinations with visa information and search functionality
- **📅 Consultation Booking**: Online form with time slots and consultation types
- **📝 Application Form**: Multi-step visa application with document upload
- **📰 Blog/News**: Latest immigration updates, tips, and comprehensive guides
- **📞 Contact Us**: Contact form with validation and location information
- **❓ FAQ**: Comprehensive frequently asked questions with search
- **⭐ Testimonials**: Client reviews with rating system and submission form

### Backend (Node.js + Express)
- **🔐 Authentication**: JWT-based admin login system
- **📊 Applications**: Full CRUD operations for visa applications with file uploads
- **📅 Consultations**: Booking management and status updates
- **💬 Inquiries**: Contact form handling and admin replies
- **🌐 Content Management**: Countries, visa types, blog posts, testimonials
- **📧 Email Integration**: Nodemailer for automated email notifications
- **🛡️ Security**: Rate limiting, CORS, input validation, password hashing

### Database (Supabase)
- **🗄️ PostgreSQL**: Robust relational database with real-time capabilities
- **🔒 Row Level Security**: Secure data access with RLS policies
- **📊 Real-time**: Live updates for admin dashboard
- **🔍 Full-text Search**: Advanced search capabilities
- **📁 File Storage**: Secure file upload and storage

### Admin Panel
- **📈 Dashboard**: Overview of applications, consultations, and inquiries
- **📋 Application Management**: View, update status, manage visa applications
- **📅 Consultation Management**: Handle bookings and scheduling
- **💬 Inquiry Management**: Respond to contact form submissions
- **🌐 Content Management**: Manage countries, visa types, blog posts, testimonials
- **👤 User Management**: Admin authentication and settings

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Modern React with hooks and concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Database & Services
- **Supabase** - PostgreSQL database with real-time features
- **Row Level Security** - Database-level security
- **File Storage** - Secure file upload and storage
- **Email Service** - Automated email notifications
- **JWT Authentication** - Secure token-based auth

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Email service (Gmail, SendGrid, etc.)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd visa-consultancy-website
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Supabase Setup

#### Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key
3. Go to SQL Editor and run the schema from `server/database/schema.sql`

#### Environment Variables
Create `.env` file in `server/` directory:
```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@visaconsultancy.com

# Admin Configuration
ADMIN_EMAIL=admin@visaconsultancy.com
ADMIN_PASSWORD=admin123

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

Create `.env.local` file in `client/` directory:
```env
# Next.js Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4. Database Setup
1. Run the SQL schema from `server/database/schema.sql` in your Supabase SQL Editor
2. This will create all necessary tables, indexes, and sample data
3. The default admin user will be created with email: `admin@visaconsultancy.com` and password: `admin123`

### 5. Start the Application
```bash
# From the root directory
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run build` - Build the frontend for production
- `npm run start` - Start production server
- `npm run install-all` - Install dependencies for all packages

### Server Directory
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Client Directory
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
visa-consultancy-website/
├── client/                 # Next.js frontend
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and API client
│   ├── pages/            # Next.js pages
│   ├── styles/           # Global styles and Tailwind config
│   ├── public/           # Static assets
│   └── package.json
├── server/               # Node.js backend
│   ├── config/          # Configuration files (Supabase, Email)
│   ├── database/        # Database schema and migrations
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── uploads/         # File uploads directory
│   ├── index.js         # Server entry point
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🔐 Admin Access

### Default Admin Credentials
- **Email**: admin@visaconsultancy.com
- **Password**: admin123

**⚠️ Important**: Change these credentials in production!

### Admin Features
- View and manage visa applications
- Handle consultation bookings
- Respond to inquiries
- Manage website content (countries, visa types, blog posts, testimonials)
- Update application statuses
- View analytics and statistics

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Applications
- `POST /api/applications` - Submit visa application
- `GET /api/applications` - Get all applications (admin)
- `GET /api/applications/:id` - Get single application
- `PUT /api/applications/:id/status` - Update application status
- `DELETE /api/applications/:id` - Delete application

### Consultations
- `POST /api/consultations` - Book consultation
- `GET /api/consultations` - Get all consultations (admin)
- `PUT /api/consultations/:id/status` - Update consultation status

### Inquiries
- `POST /api/inquiries` - Submit inquiry
- `GET /api/inquiries` - Get all inquiries (admin)
- `PUT /api/inquiries/:id/reply` - Reply to inquiry

### Content Management
- `GET /api/countries` - Get all countries
- `GET /api/visa-types` - Get all visa types
- `GET /api/blog` - Get blog posts
- `GET /api/testimonials` - Get testimonials

## 🚀 Deployment

### Quick Deploy Options

#### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended
1. **Frontend on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Deploy automatically

2. **Backend on Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Set environment variables:
     ```
     NODE_ENV=production
     PORT=10000
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     JWT_SECRET=your_jwt_secret
     EMAIL_HOST=your_email_host
     EMAIL_PORT=587
     EMAIL_USER=your_email_user
     EMAIL_PASS=your_email_password
     ```
   - Deploy automatically

#### Option 2: Render (Full Stack)
1. Go to [render.com](https://render.com)
2. Create two services:
   - **Backend Service:** Node.js with build command `cd server && npm install`
   - **Frontend Service:** Static site with build command `cd client && npm install && npm run build`
3. Configure environment variables for both services

#### Option 3: Vercel (Full Stack)
1. Deploy frontend to Vercel
2. Use Vercel's serverless functions for API routes
3. Configure environment variables in Vercel dashboard

### Environment Variables for Production

#### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-frontend-url.com
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

### Deployment Files Included
- `vercel.json` - Vercel deployment configuration
- `railway.json` - Railway deployment configuration  
- `render.yaml` - Render deployment configuration
- `DEPLOYMENT.md` - Detailed deployment guide

### Build Commands
```bash
# Install all dependencies
npm run install-all

# Build frontend
npm run build

# Start production server
npm start
```

## 🔒 Security Features

- JWT-based authentication with secure token handling
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS protection
- Helmet security headers
- File upload restrictions and validation
- Row Level Security (RLS) in Supabase
- Environment variable protection

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)
- Various screen orientations

## 🎨 UI/UX Features

- Modern, professional design with Tailwind CSS
- Smooth animations and transitions
- Intuitive navigation and user flow
- Accessible design following WCAG guidelines
- Fast loading with optimized images
- Progressive Web App (PWA) ready
- Dark mode support (optional)

## 📧 Email Integration

The system includes automated email notifications for:
- Application confirmations
- Consultation booking confirmations
- Inquiry acknowledgments
- Status updates
- Admin notifications

## 🔄 Real-time Features

- Live updates in admin dashboard
- Real-time notifications
- Instant status updates
- Live chat support (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: info@visaconsultancy.com
- Phone: +1 (555) 123-4567
- Documentation: [Link to documentation]

## 🔄 Updates

Regular updates include:
- New visa types and countries
- Updated requirements and processing times
- Security patches and improvements
- Performance optimizations
- New features and functionality
- UI/UX enhancements

## 🎯 Roadmap

- [ ] WhatsApp integration for consultations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered visa recommendations
- [ ] Integration with embassy APIs
- [ ] Automated document verification

---

**Built with ❤️ for visa consultancy services**

*This project demonstrates modern web development practices with Next.js, Node.js, and Supabase integration.*