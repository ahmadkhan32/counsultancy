import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaGlobe, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

const ConsultationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visaType: '',
    country: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: 'online',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const visaTypes = [
    'Student Visa',
    'Work Visa',
    'Tourist Visa',
    'Immigration Visa',
    'Business Visa',
    'Family Visa',
    'Not Sure'
  ];

  const countries = [
    'Canada',
    'United Kingdom',
    'Australia',
    'United States',
    'Germany',
    'New Zealand',
    'France',
    'Netherlands',
    'Other'
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          visaType: '',
          country: '',
          preferredDate: '',
          preferredTime: '',
          consultationType: 'online',
          message: ''
        });
      } else {
        throw new Error('Failed to submit consultation request');
      }
    } catch (error) {
      console.error('Error submitting consultation:', error);
      setShowWhatsApp(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '+971502662341';
    const message = `Hi! I would like to book a consultation for visa services. Here are my details:
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Visa Type: ${formData.visaType}
Country: ${formData.country}
Preferred Date: ${formData.preferredDate}
Preferred Time: ${formData.preferredTime}
Consultation Type: ${formData.consultationType}
Message: ${formData.message || 'No additional message'}`;

    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Consultation Booked Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for booking a consultation with us. We will contact you within 24 hours to confirm your appointment and provide further details.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Book Another Consultation
            </button>
            <a
              href="/"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 block"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (showWhatsApp) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaWhatsapp className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Alternative Contact Method</h2>
          <p className="text-gray-600 mb-6">
            There was an issue with the online form. You can contact us directly via WhatsApp for immediate assistance with your consultation booking.
          </p>
          <div className="space-y-3">
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2" />
              Contact via WhatsApp
            </button>
            <button
              onClick={() => setShowWhatsApp(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Try Form Again
            </button>
            <a
              href="/"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 block"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Book Your Free Consultation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get expert advice from our experienced visa consultants. Choose your preferred time and let us help you achieve your international goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Consultation Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Your Consultation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Visa Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaGlobe className="mr-2 text-blue-600" />
                    Visa Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type *</label>
                    <select
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select visa type</option>
                      {visaTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" />
                    Schedule Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type *</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="consultationType"
                          value="online"
                          checked={formData.consultationType === 'online'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>Online (Video Call)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="consultationType"
                          value="in-person"
                          checked={formData.consultationType === 'in-person'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>In-Person (Office Visit)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us more about your visa requirements or any specific questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Booking Consultation...
                    </>
                  ) : (
                    'Book Free Consultation'
                  )}
                </button>

                {/* WhatsApp Alternative */}
                <div className="text-center">
                  <p className="text-gray-600 mb-3">Or contact us directly via WhatsApp</p>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    <FaWhatsapp className="mr-2" />
                    WhatsApp: +971 50 266 2341
                  </button>
                </div>
              </form>
            </div>

            {/* Consultation Benefits */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Book a Consultation?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Expert Guidance</h3>
                      <p className="text-gray-600">Get personalized advice from experienced visa consultants</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Free Assessment</h3>
                      <p className="text-gray-600">Complimentary evaluation of your visa eligibility</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Document Review</h3>
                      <p className="text-gray-600">Professional review of your application documents</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Timeline Planning</h3>
                      <p className="text-gray-600">Clear roadmap for your visa application process</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FaClock className="mr-3" />
                    <span>30-45 minute consultation</span>
                  </li>
                  <li className="flex items-center">
                    <FaUser className="mr-3" />
                    <span>One-on-one with expert consultant</span>
                  </li>
                  <li className="flex items-center">
                    <FaEnvelope className="mr-3" />
                    <span>Follow-up email with recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <FaPhone className="mr-3" />
                    <span>Ongoing support throughout the process</span>
                  </li>
                </ul>
              </div>

              {/* WhatsApp Contact */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FaWhatsapp className="mr-3" />
                  Quick WhatsApp Contact
                </h2>
                <p className="mb-4">
                  Need immediate assistance? Contact us directly via WhatsApp for instant support.
                </p>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2" />
                  Chat on WhatsApp: +971 50 266 2341
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
