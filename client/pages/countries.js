import Link from 'next/link';
import { FaMapMarkerAlt, FaPlane, FaUsers, FaClock, FaDollarSign, FaCheckCircle } from 'react-icons/fa';

const CountriesPage = () => {
  const countries = [
    {
      id: 'canada',
      name: 'Canada',
      flag: '🇨🇦',
      description: 'Discover opportunities in one of the world\'s most welcoming countries with excellent education and career prospects.',
      image: '/canada.jpg',
      popularVisas: ['Student Visa', 'Work Permit', 'Express Entry', 'Family Sponsorship'],
      processingTime: '4-12 weeks',
      successRate: '95%',
      features: [
        'World-class education system',
        'Strong economy and job market',
        'Universal healthcare',
        'Multicultural society',
        'Beautiful landscapes'
      ]
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Experience rich history, world-renowned universities, and diverse career opportunities in the UK.',
      image: '/uk.jpg',
      popularVisas: ['Student Visa', 'Skilled Worker Visa', 'Innovator Visa', 'Family Visa'],
      processingTime: '3-8 weeks',
      successRate: '92%',
      features: [
        'Prestigious universities',
        'Global financial hub',
        'Rich cultural heritage',
        'Strong healthcare system',
        'English-speaking country'
      ]
    },
    {
      id: 'australia',
      name: 'Australia',
      flag: '🇦🇺',
      description: 'Enjoy a high quality of life, excellent education, and abundant career opportunities down under.',
      image: '/australia.jpg',
      popularVisas: ['Student Visa', 'Skilled Migration', 'Working Holiday Visa', 'Partner Visa'],
      processingTime: '4-10 weeks',
      successRate: '94%',
      features: [
        'High quality of life',
        'Excellent education system',
        'Strong economy',
        'Beautiful weather',
        'Friendly people'
      ]
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      description: 'Pursue the American dream with world-class education and unlimited career possibilities.',
      image: '/usa.jpg',
      popularVisas: ['F-1 Student Visa', 'H-1B Work Visa', 'EB-5 Investment Visa', 'Family Visa'],
      processingTime: '6-16 weeks',
      successRate: '88%',
      features: [
        'Top universities globally',
        'Innovation and technology hub',
        'Diverse opportunities',
        'Strong economy',
        'Cultural diversity'
      ]
    },
    {
      id: 'germany',
      name: 'Germany',
      flag: '🇩🇪',
      description: 'Benefit from free education, strong economy, and excellent work-life balance in Germany.',
      image: '/germany.jpg',
      popularVisas: ['Student Visa', 'Blue Card', 'Job Seeker Visa', 'Family Reunion'],
      processingTime: '3-6 weeks',
      successRate: '96%',
      features: [
        'Free university education',
        'Strong manufacturing sector',
        'Excellent public transport',
        'Rich history and culture',
        'Work-life balance'
      ]
    },
    {
      id: 'new-zealand',
      name: 'New Zealand',
      flag: '🇳🇿',
      description: 'Experience a peaceful lifestyle, excellent education, and stunning natural beauty.',
      image: '/new-zealand.jpg',
      popularVisas: ['Student Visa', 'Skilled Migrant Visa', 'Working Holiday Visa', 'Partner Visa'],
      processingTime: '4-8 weeks',
      successRate: '93%',
      features: [
        'Peaceful lifestyle',
        'High-quality education',
        'Beautiful landscapes',
        'Low crime rate',
        'English-speaking'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Popular Destinations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our most popular destinations for visa applications. Each country offers unique opportunities for education, work, and immigration.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {countries.map((country) => (
            <div key={country.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Country Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-2">{country.flag}</div>
                    <h3 className="text-2xl font-bold">{country.name}</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{country.description}</p>

                {/* Popular Visas */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Popular Visas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {country.popularVisas.map((visa, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {visa}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {country.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-2 text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FaClock className="text-blue-500 mr-1" />
                      <span className="text-sm font-semibold text-gray-800">Processing</span>
                    </div>
                    <p className="text-xs text-gray-600">{country.processingTime}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FaUsers className="text-green-500 mr-1" />
                      <span className="text-sm font-semibold text-gray-800">Success Rate</span>
                    </div>
                    <p className="text-xs text-gray-600">{country.successRate}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link 
                    href={`/countries/${country.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-center block"
                  >
                    View Details
                  </Link>
                  <Link 
                    href={`/application?country=${country.id}`}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-center block"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Successful Applications</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">15+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Countries Covered</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-6">Get personalized advice from our expert consultants and choose the perfect destination for your goals.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/consultation" 
              className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Book Free Consultation
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesPage;
