import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, MapPin, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Consultation = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      visaType: location.state?.visaType || '',
      country: location.state?.country || ''
    }
  });

  const consultationTypes = [
    { value: 'online', label: 'Online Consultation', description: 'Video call via Zoom/Google Meet' },
    { value: 'in-person', label: 'In-Person Meeting', description: 'Visit our office for face-to-face consultation' },
    { value: 'phone', label: 'Phone Consultation', description: 'Telephone consultation at your convenience' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/consultations', {
        clientInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        consultationDetails: {
          visaType: data.visaType,
          country: data.country,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          message: data.message,
          consultationType: data.consultationType
        }
      });

      toast.success('Consultation booked successfully! We will contact you soon to confirm.');
      reset();
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error('Failed to book consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <User className="w-6 h-6 text-blue-600" />,
      title: "Expert Guidance",
      description: "Get personalized advice from certified visa consultants"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Flexible Timing",
      description: "Choose from multiple time slots that fit your schedule"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      title: "Free Assessment",
      description: "Get a free eligibility assessment for your visa application"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-orange-600" />,
      title: "Document Checklist",
      description: "Receive a comprehensive list of required documents"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Book Your Consultation</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get expert guidance for your visa application. Our certified consultants will help you 
              understand requirements, prepare documents, and increase your chances of success.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Book a Consultation?</h2>
            <p className="section-subtitle">
              Get personalized guidance from our expert team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-6">Book Your Free Consultation</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="form-input"
                          {...register('phone', { required: 'Phone number is required' })}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Visa Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">Visa Type *</label>
                        <select
                          className="form-input"
                          {...register('visaType', { required: 'Visa type is required' })}
                        >
                          <option value="">Select visa type</option>
                          <option value="Student Visa">Student Visa</option>
                          <option value="Work Visa">Work Visa</option>
                          <option value="Tourist Visa">Tourist Visa</option>
                          <option value="Immigration Visa">Immigration Visa</option>
                          <option value="Business Visa">Business Visa</option>
                          <option value="Transit Visa">Transit Visa</option>
                        </select>
                        {errors.visaType && (
                          <p className="text-red-500 text-sm mt-1">{errors.visaType.message}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Destination Country *</label>
                        <select
                          className="form-input"
                          {...register('country', { required: 'Country is required' })}
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
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Consultation Details */}
                    <div className="form-group">
                      <label className="form-label">Consultation Type *</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {consultationTypes.map((type) => (
                          <label key={type.value} className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            <input
                              type="radio"
                              value={type.value}
                              {...register('consultationType', { required: 'Consultation type is required' })}
                              className="mt-1"
                            />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-600">{type.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.consultationType && (
                        <p className="text-red-500 text-sm mt-1">{errors.consultationType.message}</p>
                      )}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          className="form-input"
                          {...register('preferredDate', { required: 'Preferred date is required' })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.preferredDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Preferred Time *
                        </label>
                        <select
                          className="form-input"
                          {...register('preferredTime', { required: 'Preferred time is required' })}
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        {errors.preferredTime && (
                          <p className="text-red-500 text-sm mt-1">{errors.preferredTime.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label className="form-label">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Additional Information
                      </label>
                      <textarea
                        className="form-textarea"
                        {...register('message')}
                        placeholder="Tell us about your specific requirements or questions..."
                        rows={4}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full text-lg py-4"
                    >
                      {isSubmitting ? 'Booking...' : 'Book Free Consultation'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Eligibility Assessment</h4>
                        <p className="text-sm text-gray-600">We'll evaluate your eligibility for the visa type you're interested in.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Document Checklist</h4>
                        <p className="text-sm text-gray-600">Receive a comprehensive list of required documents.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Process Guidance</h4>
                        <p className="text-sm text-gray-600">Learn about the application process and timeline.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Next Steps</h4>
                        <p className="text-sm text-gray-600">Get a clear roadmap for your visa application journey.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>info@visaconsultancy.com</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p>123 Business District</p>
                        <p>Suite 456, New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
