import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaUser, FaCheckCircle } from 'react-icons/fa';
import Layout from '../components/Layout';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback testimonials
      setTestimonials([
        {
          id: 1,
          name: 'Sarah Johnson',
          location: 'New York, USA',
          rating: 5,
          content: 'Excellent service! They helped me get my student visa to Canada in just 2 weeks. Highly recommended!',
          visa_type: 'Student Visa',
          country: 'Canada'
        },
        {
          id: 2,
          name: 'Ahmed Hassan',
          location: 'Dubai, UAE',
          rating: 5,
          content: 'Professional and efficient. They guided me through the entire work visa process for Germany.',
          visa_type: 'Work Visa',
          country: 'Germany'
        },
        {
          id: 3,
          name: 'Maria Rodriguez',
          location: 'Mexico City, Mexico',
          rating: 5,
          content: 'Outstanding support throughout my immigration process. Thank you for making my dream come true!',
          visa_type: 'Immigration Visa',
          country: 'Australia'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <Layout title="Testimonials - Visa Consultancy">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Testimonials - Visa Consultancy" description="Read success stories from our satisfied clients who achieved their visa goals with our expert guidance.">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20">
          <div className="container">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Success Stories</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Hear from our satisfied clients who achieved their visa goals with our expert guidance and support.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here are real stories from real people who achieved their visa dreams with our help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>
                
                <div className="mb-4">
                  <FaQuoteLeft className="text-blue-500 text-2xl mb-2" />
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-blue-500 mr-2" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-blue-600">
                    <FaCheckCircle className="mr-1" />
                    <span>{testimonial.visa_type} - {testimonial.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Visa Journey?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of successful clients who achieved their visa goals with our expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/consultation"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Book Free Consultation
                </a>
                <a
                  href="/application"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
                >
                  Start Your Application
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestimonialsPage;
