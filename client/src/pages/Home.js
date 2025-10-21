import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Globe, Award, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Expert Consultants",
      description: "Our team of experienced visa consultants provides personalized guidance for your application."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Global Coverage",
      description: "We assist with visa applications for countries worldwide including USA, UK, Canada, Australia."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "High Success Rate",
      description: "Our proven track record shows 95% success rate in visa applications we handle."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Fast Processing",
      description: "We expedite your application process with our efficient documentation and submission system."
    }
  ];

  const popularCountries = [
    { name: "United States", flag: "🇺🇸", visaTypes: ["Student", "Work", "Tourist"] },
    { name: "United Kingdom", flag: "🇬🇧", visaTypes: ["Student", "Work", "Tourist"] },
    { name: "Canada", flag: "🇨🇦", visaTypes: ["Student", "Work", "Immigration"] },
    { name: "Australia", flag: "🇦🇺", visaTypes: ["Student", "Work", "Tourist"] },
    { name: "Germany", flag: "🇩🇪", visaTypes: ["Student", "Work", "Tourist"] },
    { name: "France", flag: "🇫🇷", visaTypes: ["Student", "Work", "Tourist"] }
  ];

  const visaTypes = [
    {
      title: "Student Visa",
      description: "Pursue your education dreams abroad with our comprehensive student visa assistance.",
      features: ["University Selection", "Documentation", "Interview Preparation", "Post-Arrival Support"]
    },
    {
      title: "Work Visa",
      description: "Advance your career with professional work visa services for skilled professionals.",
      features: ["Job Search Support", "Employer Sponsorship", "Skills Assessment", "Work Permit Processing"]
    },
    {
      title: "Tourist Visa",
      description: "Explore the world with our hassle-free tourist visa application services.",
      features: ["Travel Planning", "Documentation", "Application Submission", "Travel Insurance"]
    },
    {
      title: "Immigration Visa",
      description: "Start a new life in your dream country with our immigration visa expertise.",
      features: ["Eligibility Assessment", "Documentation", "Application Processing", "Settlement Support"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Your Trusted Visa Experts
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Professional visa consultancy services for study, work, visit, and immigration visas. 
                Expert guidance for your visa applications worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/application" className="btn btn-primary text-lg px-8 py-4">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/consultation" className="btn btn-secondary text-lg px-8 py-4">
                  Book Free Consultation
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Quick Application Check</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Document checklist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Processing time estimate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Fee calculation</span>
                  </div>
                </div>
                <Link to="/consultation" className="btn btn-primary w-full mt-6">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">
              We provide comprehensive visa consultancy services with a proven track record of success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Countries Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">
              We help you get visas for the most sought-after countries worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCountries.map((country, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <h3 className="text-xl font-semibold">{country.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {country.visaTypes.map((type, typeIndex) => (
                    <span key={typeIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
                <Link to={`/countries?country=${country.name}`} className="btn btn-outline w-full mt-4">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Visa Services</h2>
            <p className="section-subtitle">
              Comprehensive visa solutions for all your travel and immigration needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visaTypes.map((type, index) => (
              <div key={index} className="card">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/visa-categories" className="btn btn-primary">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Visa Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get expert guidance and increase your chances of visa approval
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation" className="btn bg-white text-blue-600 hover:bg-gray-100">
              Book Free Consultation
            </Link>
            <Link to="/application" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Start Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
