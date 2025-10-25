import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ArrowRight, Globe, Clock, DollarSign } from 'lucide-react';
import { getCountries } from '../lib/supabase';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      // Mock countries data for development
      const mockCountries = [
        {
          id: 1,
          name: 'Canada',
          code: 'CA',
          flag: '🇨🇦',
          description: 'Study, work, and live in Canada with world-class education and immigration opportunities.',
          visa_types: ['Student Visa', 'Work Permit', 'Express Entry'],
          processing_time: '2-4 weeks',
          cost: '$150-300',
          popularity: 'High',
          image: '/images/canada.jpg'
        },
        {
          id: 2,
          name: 'United States',
          code: 'US',
          flag: '🇺🇸',
          description: 'Explore opportunities in the USA with various visa categories for study, work, and business.',
          visa_types: ['F-1 Student', 'H-1B Work', 'B-1/B-2 Tourist'],
          processing_time: '1-3 months',
          cost: '$160-500',
          popularity: 'Very High',
          image: '/images/usa.jpg'
        },
        {
          id: 3,
          name: 'United Kingdom',
          code: 'GB',
          flag: '🇬🇧',
          description: 'Experience British education and work opportunities in the UK.',
          visa_types: ['Student Visa', 'Skilled Worker', 'Visitor Visa'],
          processing_time: '3-6 weeks',
          cost: '£348-623',
          popularity: 'High',
          image: '/images/uk.jpg'
        },
        {
          id: 4,
          name: 'Australia',
          code: 'AU',
          flag: '🇦🇺',
          description: 'Study and work in Australia with excellent quality of life and opportunities.',
          visa_types: ['Student Visa', 'Work Visa', 'Visitor Visa'],
          processing_time: '4-8 weeks',
          cost: '$620-1,405',
          popularity: 'High',
          image: '/images/australia.jpg'
        },
        {
          id: 5,
          name: 'Germany',
          code: 'DE',
          flag: '🇩🇪',
          description: 'Study in Germany with world-class universities and strong economy.',
          visa_types: ['Student Visa', 'Work Visa', 'Schengen Visa'],
          processing_time: '2-6 weeks',
          cost: '€75-150',
          popularity: 'Medium',
          image: '/images/germany.jpg'
        },
        {
          id: 6,
          name: 'New Zealand',
          code: 'NZ',
          flag: '🇳🇿',
          description: 'Experience New Zealand with its beautiful landscapes and quality education.',
          visa_types: ['Student Visa', 'Work Visa', 'Visitor Visa'],
          processing_time: '3-6 weeks',
          cost: '$330-495',
          popularity: 'Medium',
          image: '/images/newzealand.jpg'
        }
      ];

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountries(mockCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.visa_types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Countries We Serve</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore visa opportunities in countries around the world. We help you navigate the immigration process for your dream destination.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search countries or visa types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCountries.map((country) => (
                <div key={country.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-2">{country.flag}</div>
                      <h3 className="text-2xl font-bold">{country.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {country.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Available Visa Types:</h4>
                      <div className="flex flex-wrap gap-2">
                        {country.visa_types.map((type, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Processing: {country.processing_time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>Cost: {country.cost}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="w-4 h-4 mr-2" />
                        <span>Popularity: {country.popularity}</span>
                      </div>
                    </div>

                    <Link
                      href={`/countries/${country.code.toLowerCase()}`}
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <Globe />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No countries found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or check back later for new destinations.
              </p>
            </div>
          )}

          {!loading && filteredCountries.length > 0 && (
            <div className="text-center mt-8 text-gray-600">
              Showing {filteredCountries.length} of {countries.length} countries
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
