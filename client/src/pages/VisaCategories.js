import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, DollarSign, FileText, CheckCircle, Users, Briefcase, Plane, Home } from 'lucide-react';
import axios from 'axios';

const VisaCategories = () => {
  const [visaTypes, setVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchVisaTypes();
  }, []);

  const fetchVisaTypes = async () => {
    try {
      const response = await axios.get('/api/visa-types');
      setVisaTypes(response.data);
    } catch (error) {
      console.error('Error fetching visa types:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Categories', icon: <FileText className="w-5 h-5" /> },
    { id: 'student', label: 'Student Visa', icon: <Users className="w-5 h-5" /> },
    { id: 'work', label: 'Work Visa', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'tourist', label: 'Tourist Visa', icon: <Plane className="w-5 h-5" /> },
    { id: 'immigration', label: 'Immigration', icon: <Home className="w-5 h-5" /> },
    { id: 'business', label: 'Business Visa', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'transit', label: 'Transit Visa', icon: <Plane className="w-5 h-5" /> }
  ];

  const filteredVisaTypes = selectedCategory === 'all' 
    ? visaTypes 
    : visaTypes.filter(type => type.category === selectedCategory);

  const defaultVisaTypes = [
    {
      _id: '1',
      name: 'Student Visa',
      category: 'student',
      description: 'Pursue your education dreams abroad with our comprehensive student visa assistance.',
      eligibility: ['Valid passport', 'Admission letter', 'Financial proof', 'English proficiency'],
      requiredDocuments: ['Passport', 'Academic transcripts', 'Bank statements', 'IELTS/TOEFL scores'],
      processingTime: '4-8 weeks',
      fees: { consultation: 100, application: 200, currency: 'USD' },
      validity: 'Duration of study + 6 months'
    },
    {
      _id: '2',
      name: 'Work Visa',
      category: 'work',
      description: 'Advance your career with professional work visa services for skilled professionals.',
      eligibility: ['Job offer', 'Skills assessment', 'Health check', 'Police clearance'],
      requiredDocuments: ['Passport', 'Job offer letter', 'CV/Resume', 'Educational certificates'],
      processingTime: '6-12 weeks',
      fees: { consultation: 150, application: 300, currency: 'USD' },
      validity: '1-4 years'
    },
    {
      _id: '3',
      name: 'Tourist Visa',
      category: 'tourist',
      description: 'Explore the world with our hassle-free tourist visa application services.',
      eligibility: ['Valid passport', 'Travel itinerary', 'Financial proof', 'Return ticket'],
      requiredDocuments: ['Passport', 'Travel insurance', 'Hotel bookings', 'Bank statements'],
      processingTime: '2-4 weeks',
      fees: { consultation: 50, application: 100, currency: 'USD' },
      validity: '3-6 months'
    },
    {
      _id: '4',
      name: 'Immigration Visa',
      category: 'immigration',
      description: 'Start a new life in your dream country with our immigration visa expertise.',
      eligibility: ['Age requirements', 'Language proficiency', 'Work experience', 'Health requirements'],
      requiredDocuments: ['Passport', 'Birth certificate', 'Marriage certificate', 'Police clearance'],
      processingTime: '6-18 months',
      fees: { consultation: 200, application: 500, currency: 'USD' },
      validity: 'Permanent'
    }
  ];

  const displayVisaTypes = visaTypes.length > 0 ? filteredVisaTypes : defaultVisaTypes;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'student': return <Users className="w-8 h-8 text-blue-600" />;
      case 'work': return <Briefcase className="w-8 h-8 text-green-600" />;
      case 'tourist': return <Plane className="w-8 h-8 text-purple-600" />;
      case 'immigration': return <Home className="w-8 h-8 text-orange-600" />;
      case 'business': return <Briefcase className="w-8 h-8 text-indigo-600" />;
      case 'transit': return <Plane className="w-8 h-8 text-pink-600" />;
      default: return <FileText className="w-8 h-8 text-gray-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'work': return 'bg-green-100 text-green-800';
      case 'tourist': return 'bg-purple-100 text-purple-800';
      case 'immigration': return 'bg-orange-100 text-orange-800';
      case 'business': return 'bg-indigo-100 text-indigo-800';
      case 'transit': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading visa categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Visa Categories</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our comprehensive range of visa services. From student visas to immigration, 
              we provide expert guidance for all your visa needs.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types Grid */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayVisaTypes.map((visaType) => (
              <div key={visaType._id} className="card">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {getCategoryIcon(visaType.category)}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{visaType.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(visaType.category)}`}>
                        {visaType.category.charAt(0).toUpperCase() + visaType.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{visaType.description}</p>

                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Processing Time</p>
                      <p className="font-semibold">{visaType.processingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="font-semibold">${visaType.fees?.consultation || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Validity</p>
                      <p className="font-semibold">{visaType.validity}</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility Requirements */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-800">Eligibility Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {visaType.eligibility?.slice(0, 4).map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-800">Required Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {visaType.requiredDocuments?.slice(0, 4).map((document, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{document}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/consultation"
                    state={{ visaType: visaType.name }}
                    className="btn btn-primary flex-1"
                  >
                    Get Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/application"
                    state={{ visaType: visaType.name }}
                    className="btn btn-outline flex-1"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Our Visa Services?</h2>
            <p className="section-subtitle">
              We provide comprehensive support throughout your visa application journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our certified consultants provide personalized guidance based on your specific situation and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Processing</h3>
              <p className="text-gray-600">
                We expedite your application process with efficient documentation and timely submissions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide continuous support from application submission to visa approval and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Apply for Your Visa?</h2>
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

export default VisaCategories;
