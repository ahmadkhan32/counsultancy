import Link from 'next/link';
import { FaGraduationCap, FaBriefcase, FaPlane, FaGlobe, FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa';

const VisaCategoriesPage = () => {
  const visaCategories = [
    {
      id: 'student',
      title: 'Student Visa',
      icon: FaGraduationCap,
      color: 'blue',
      description: 'Pursue your education dreams abroad with our comprehensive student visa services.',
      eligibility: [
        'Valid passport with at least 6 months validity',
        'Letter of acceptance from recognized institution',
        'Proof of financial support',
        'Academic transcripts and certificates',
        'English language proficiency test results'
      ],
      documents: [
        'Passport and passport-sized photographs',
        'Visa application form',
        'Letter of acceptance from educational institution',
        'Financial documents (bank statements, sponsorship letters)',
        'Academic transcripts and certificates',
        'English language test results (IELTS/TOEFL)',
        'Medical examination certificate',
        'Police clearance certificate'
      ],
      processingTime: '4-8 weeks',
      fees: 'Varies by country ($150-$500)'
    },
    {
      id: 'work',
      title: 'Work Visa',
      icon: FaBriefcase,
      color: 'green',
      description: 'Advance your career with international work opportunities through our expert guidance.',
      eligibility: [
        'Valid job offer from employer',
        'Relevant work experience and qualifications',
        'Valid passport with sufficient validity',
        'Clean criminal record',
        'Health insurance coverage'
      ],
      documents: [
        'Passport and recent photographs',
        'Work visa application form',
        'Job offer letter from employer',
        'Employment contract',
        'Educational and professional certificates',
        'Work experience letters',
        'Financial documents',
        'Medical examination report',
        'Police clearance certificate'
      ],
      processingTime: '6-12 weeks',
      fees: 'Varies by country ($200-$800)'
    },
    {
      id: 'tourist',
      title: 'Tourist Visa',
      icon: FaPlane,
      color: 'purple',
      description: 'Explore the world with our hassle-free tourist visa application services.',
      eligibility: [
        'Valid passport with at least 6 months validity',
        'Proof of travel itinerary',
        'Sufficient funds for the trip',
        'Return ticket or onward travel proof',
        'No criminal record'
      ],
      documents: [
        'Passport and photographs',
        'Tourist visa application form',
        'Travel itinerary and hotel bookings',
        'Bank statements (last 3-6 months)',
        'Employment letter or business registration',
        'Travel insurance',
        'Return flight tickets'
      ],
      processingTime: '2-4 weeks',
      fees: 'Varies by country ($50-$200)'
    },
    {
      id: 'immigration',
      title: 'Immigration Visa',
      icon: FaGlobe,
      color: 'red',
      description: 'Start a new life in your dream country with our comprehensive immigration services.',
      eligibility: [
        'Meet country-specific immigration criteria',
        'Valid passport and travel documents',
        'Clean criminal and medical record',
        'Sufficient settlement funds',
        'Language proficiency (if required)'
      ],
      documents: [
        'Passport and photographs',
        'Immigration application forms',
        'Educational certificates (assessed)',
        'Work experience documentation',
        'Financial statements and proof of funds',
        'Medical examination reports',
        'Police clearance certificates',
        'Language test results',
        'Settlement plan'
      ],
      processingTime: '6-18 months',
      fees: 'Varies by country ($1000-$5000)'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-700',
      green: 'from-green-500 to-green-700',
      purple: 'from-purple-500 to-purple-700',
      red: 'from-red-500 to-red-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Visa Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of visa services. Each category is designed to meet your specific needs and help you achieve your international goals.
          </p>
        </div>

        {/* Visa Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {visaCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Header */}
                <div className={`bg-gradient-to-r ${getColorClasses(category.color)} p-8 text-white`}>
                  <div className="flex items-center space-x-4">
                    <IconComponent className="text-4xl" />
                    <div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <p className="text-blue-100 mt-2">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Eligibility Criteria */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-2">
                      {category.eligibility.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h3>
                    <ul className="space-y-2">
                      {category.documents.map((doc, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Processing Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaClock className="text-blue-500 mr-2" />
                        <span className="font-semibold text-gray-800">Processing Time</span>
                      </div>
                      <p className="text-gray-600">{category.processingTime}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaDollarSign className="text-green-500 mr-2" />
                        <span className="font-semibold text-gray-800">Fees</span>
                      </div>
                      <p className="text-gray-600">{category.fees}</p>
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <Link 
                    href={`/application?category=${category.id}`}
                    className={`w-full bg-gradient-to-r ${getColorClasses(category.color)} text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center block`}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Visa?</h2>
          <p className="text-xl mb-6">Our expert consultants are here to guide you through the process and help you select the perfect visa category for your needs.</p>
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

export default VisaCategoriesPage;
