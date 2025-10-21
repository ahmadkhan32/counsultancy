import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Users, ArrowRight, Globe } from 'lucide-react';
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Use default data if API fails
      setCountries(getDefaultCountries());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultCountries = () => [
    {
      _id: '1',
      name: 'United States',
      code: 'US',
      flag: '🇺🇸',
      description: 'The United States offers diverse opportunities for students, workers, and immigrants.',
      popularVisaTypes: ['Student Visa', 'Work Visa', 'Tourist Visa', 'Immigration Visa'],
      processingTime: '4-12 weeks',
      generalRequirements: ['Valid passport', 'Financial proof', 'Health certificate', 'Police clearance'],
      featured: true
    },
    {
      _id: '2',
      name: 'United Kingdom',
      code: 'UK',
      flag: '🇬🇧',
      description: 'The UK provides excellent educational and career opportunities with world-class universities.',
      popularVisaTypes: ['Student Visa', 'Work Visa', 'Tourist Visa', 'Skilled Worker Visa'],
      processingTime: '3-8 weeks',
      generalRequirements: ['Valid passport', 'Financial proof', 'English proficiency', 'Health insurance'],
      featured: true
    },
    {
      _id: '3',
      name: 'Canada',
      code: 'CA',
      flag: '🇨🇦',
      description: 'Canada is known for its welcoming immigration policies and high quality of life.',
      popularVisaTypes: ['Student Visa', 'Work Visa', 'Express Entry', 'Family Sponsorship'],
      processingTime: '4-16 weeks',
      generalRequirements: ['Valid passport', 'Language test', 'Educational assessment', 'Medical exam'],
      featured: true
    },
    {
      _id: '4',
      name: 'Australia',
      code: 'AU',
      flag: '🇦🇺',
      description: 'Australia offers excellent opportunities for skilled workers and students.',
      popularVisaTypes: ['Student Visa', 'Work Visa', 'Skilled Migration', 'Tourist Visa'],
      processingTime: '4-12 weeks',
      generalRequirements: ['Valid passport', 'Skills assessment', 'Health check', 'Character check'],
      featured: true
    },
    {
      _id: '5',
      name: 'Germany',
      code: 'DE',
      flag: '🇩🇪',
      description: 'Germany is a leading destination for education and career opportunities in Europe.',
      popularVisaTypes: ['Student Visa', 'Work Visa', 'Blue Card', 'Tourist Visa'],
      processingTime: '2-6 weeks',
      generalRequirements: ['Valid passport', 'Health insurance', 'Financial proof', 'German language'],
      featured: false
    },
    {
      _id: '6',
      name: 'France',
      code: 'FR',
      flag: '🇫🇷',
      description: 'France offers rich cultural experiences and excellent educational opportunities.',
      popularVisaTypes: ['Student Visa', 'Work Visa', 'Tourist Visa', 'Long Stay Visa'],
      processingTime: '2-4 weeks',
      generalRequirements: ['Valid passport', 'Health insurance', 'Financial proof', 'French language'],
      featured: false
    }
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCountries = countries.filter(country => country.featured);
  const otherCountries = countries.filter(country => !country.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading countries...</p>
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
            <h1 className="text-5xl font-bold mb-6">Countries We Serve</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore visa opportunities in countries worldwide. From popular destinations to emerging markets, 
              we help you navigate visa requirements across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Countries */}
      {!searchTerm && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">
                Our most requested visa destinations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCountries.map((country) => (
                <div key={country._id} className="card hover:shadow-xl transition-all duration-300">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{country.flag}</div>
                    <h3 className="text-xl font-bold mb-2">{country.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{country.description}</p>
                    <div className="space-y-2 mb-6">
                      {country.popularVisaTypes.slice(0, 3).map((visaType, index) => (
                        <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1 mb-1">
                          {visaType}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/consultation"
                      state={{ country: country.name }}
                      className="btn btn-primary w-full"
                    >
                      Get Visa Info
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Countries */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'All Countries'}
            </h2>
            <p className="section-subtitle">
              {searchTerm 
                ? `Found ${filteredCountries.length} countries matching your search`
                : 'Browse all countries we provide visa services for'
              }
            </p>
          </div>
          
          {filteredCountries.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No countries found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCountries.map((country) => (
                <div key={country._id} className="card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl">{country.flag}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{country.name}</h3>
                      <p className="text-gray-600 text-sm">{country.description}</p>
                    </div>
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Processing</p>
                        <p className="text-sm font-semibold">{country.processingTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Visa Types</p>
                        <p className="text-sm font-semibold">{country.popularVisaTypes.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Popular Visa Types */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Popular Visa Types</h4>
                    <div className="flex flex-wrap gap-1">
                      {country.popularVisaTypes.slice(0, 3).map((visaType, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {visaType}
                        </span>
                      ))}
                      {country.popularVisaTypes.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{country.popularVisaTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* General Requirements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-2">General Requirements</h4>
                    <ul className="space-y-1">
                      {country.generalRequirements.slice(0, 3).map((requirement, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/consultation"
                      state={{ country: country.name }}
                      className="btn btn-primary text-sm"
                    >
                      Get Consultation
                    </Link>
                    <Link
                      to="/visa-categories"
                      state={{ country: country.name }}
                      className="btn btn-outline text-sm"
                    >
                      View Visa Types
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us for International Visas */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Us for International Visas?</h2>
            <p className="section-subtitle">
              We have extensive experience with visa requirements across multiple countries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Expertise</h3>
              <p className="text-gray-600">
                Our team has in-depth knowledge of visa requirements and processes across 50+ countries worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                We understand the specific requirements and cultural nuances of each destination country.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Success</h3>
              <p className="text-gray-600">
                Our high success rate across multiple countries demonstrates our expertise and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Your Options?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get personalized guidance for your visa application to any country
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation" className="btn bg-white text-blue-600 hover:bg-gray-100">
              Book Free Consultation
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Countries;
