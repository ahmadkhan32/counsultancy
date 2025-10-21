import React, { useState, useEffect } from 'react';
import { Star, Quote, User, MapPin, Calendar, ThumbsUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/api/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(getDefaultTestimonials());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultTestimonials = () => [
    {
      _id: '1',
      clientName: 'Sarah Johnson',
      clientLocation: 'New York, USA',
      visaType: 'Student Visa',
      country: 'Canada',
      rating: 5,
      testimonial: 'Visa Consultancy made my dream of studying in Canada a reality. Their expert guidance and attention to detail throughout the application process was exceptional. I highly recommend their services to anyone looking for professional visa assistance.',
      clientPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isApproved: true,
      isFeatured: true,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      clientName: 'Michael Chen',
      clientLocation: 'California, USA',
      visaType: 'Work Visa',
      country: 'Australia',
      rating: 5,
      testimonial: 'The team at Visa Consultancy is simply outstanding. They helped me secure my work visa for Australia in record time. Their knowledge of the process and dedication to their clients is unmatched. Thank you for making my career move possible!',
      clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isApproved: true,
      isFeatured: true,
      createdAt: '2024-01-10T14:30:00Z'
    },
    {
      _id: '3',
      clientName: 'Emily Rodriguez',
      clientLocation: 'Texas, USA',
      visaType: 'Immigration Visa',
      country: 'United Kingdom',
      rating: 5,
      testimonial: 'After years of trying to navigate the complex UK immigration process on my own, I finally decided to seek professional help. Visa Consultancy exceeded all my expectations. They made the impossible possible and I am now a permanent resident in the UK.',
      clientPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isApproved: true,
      isFeatured: true,
      createdAt: '2024-01-05T09:15:00Z'
    },
    {
      _id: '4',
      clientName: 'David Kim',
      clientLocation: 'Washington, USA',
      visaType: 'Student Visa',
      country: 'Germany',
      rating: 5,
      testimonial: 'I was skeptical about using a visa consultancy service, but Visa Consultancy proved me wrong. Their expertise in German student visa requirements saved me months of confusion. The entire process was smooth and stress-free.',
      clientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isApproved: true,
      isFeatured: false,
      createdAt: '2024-01-01T16:45:00Z'
    },
    {
      _id: '5',
      clientName: 'Lisa Wang',
      clientLocation: 'Oregon, USA',
      visaType: 'Tourist Visa',
      country: 'France',
      rating: 5,
      testimonial: 'Quick and efficient service! I needed a tourist visa for France urgently, and Visa Consultancy delivered. They processed my application faster than expected and kept me informed throughout the process. Highly recommended!',
      clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isApproved: true,
      isFeatured: false,
      createdAt: '2023-12-28T11:20:00Z'
    },
    {
      _id: '6',
      clientName: 'John Smith',
      clientLocation: 'Florida, USA',
      visaType: 'Work Visa',
      country: 'Canada',
      rating: 5,
      testimonial: 'Professional, knowledgeable, and reliable. Visa Consultancy helped me secure my Canadian work visa without any hassles. Their team was always available to answer my questions and provided excellent support throughout the process.',
      clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isApproved: true,
      isFeatured: false,
      createdAt: '2023-12-25T13:10:00Z'
    }
  ];

  const handleSubmitTestimonial = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/testimonials', data);
      toast.success('Thank you for your testimonial! It will be reviewed before publishing.');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredTestimonials = testimonials.filter(t => t.isFeatured);
  const otherTestimonials = testimonials.filter(t => !t.isFeatured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
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
            <h1 className="text-5xl font-bold mb-6">Client Testimonials</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Read what our satisfied clients have to say about their visa application experience. 
              Their success stories inspire us to continue providing exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Successful Applications</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Success Stories</h2>
            <p className="section-subtitle">
              Stories from our most successful visa applications
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial._id} className="card relative">
                <div className="absolute top-4 right-4">
                  <Quote className="w-8 h-8 text-blue-200" />
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testimonial.clientPhoto}
                      alt={testimonial.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.clientName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{testimonial.clientLocation}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.testimonial}"</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {testimonial.visaType}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {testimonial.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(testimonial.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Real experiences from real people who achieved their visa goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTestimonials.map((testimonial) => (
              <div key={testimonial._id} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.clientPhoto}
                      alt={testimonial.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.clientName}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.clientLocation}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 text-sm mb-4">"{testimonial.testimonial}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {testimonial.visaType}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {testimonial.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(testimonial.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Testimonial */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
              <p className="text-gray-600">
                Did we help you achieve your visa goals? We'd love to hear about your experience!
              </p>
            </div>
            
            {!showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Submit Your Testimonial
                </button>
              </div>
            ) : (
              <div className="card">
                <TestimonialForm
                  onSubmit={handleSubmitTestimonial}
                  isSubmitting={isSubmitting}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let us help you achieve your visa goals with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/consultation" className="btn bg-white text-blue-600 hover:bg-gray-100">
              Book Free Consultation
            </a>
            <a href="/application" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Start Application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Testimonial Form Component
const TestimonialForm = ({ onSubmit, isSubmitting, onCancel }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientLocation: '',
    visaType: '',
    country: '',
    rating: 5,
    testimonial: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">
            <User className="w-4 h-4 inline mr-2" />
            Your Name *
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <MapPin className="w-4 h-4 inline mr-2" />
            Your Location *
          </label>
          <input
            type="text"
            name="clientLocation"
            value={formData.clientLocation}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="City, State, Country"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Visa Type *</label>
          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select visa type</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Immigration Visa">Immigration Visa</option>
            <option value="Business Visa">Business Visa</option>
            <option value="Transit Visa">Transit Visa</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Destination Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select country</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Rating *</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setFormData({ ...formData, rating })}
              className={`p-2 rounded ${
                rating <= formData.rating
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Your Testimonial *</label>
        <textarea
          name="testimonial"
          value={formData.testimonial}
          onChange={handleChange}
          className="form-textarea"
          required
          rows={4}
          placeholder="Share your experience with our services..."
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary flex-1"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Testimonials;
