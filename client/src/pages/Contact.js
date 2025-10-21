import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/inquiries', data);
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: 'Email',
      details: ['info@visaconsultancy.com', 'support@visaconsultancy.com'],
      description: 'Send us an email anytime'
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: 'Address',
      details: ['123 Business District', 'Suite 456, New York, NY 10001'],
      description: 'Visit our office for in-person consultation'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: 'Office Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      description: 'We are here to help during business hours'
    }
  ];

  const faqs = [
    {
      question: 'How long does the visa application process take?',
      answer: 'Processing times vary by country and visa type. Generally, tourist visas take 2-4 weeks, student visas take 4-8 weeks, and work visas take 6-12 weeks.'
    },
    {
      question: 'Do you provide consultation services?',
      answer: 'Yes, we offer free initial consultations to assess your eligibility and provide guidance on the best visa options for your situation.'
    },
    {
      question: 'What documents do I need for a visa application?',
      answer: 'Required documents vary by visa type and country, but typically include passport, photographs, financial statements, and supporting documents specific to your visa category.'
    },
    {
      question: 'Can you help with visa rejections?',
      answer: 'Yes, we can help you understand the reasons for rejection and guide you through the reapplication process or appeal procedures.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our expert team. We're here to help you with all your visa-related questions 
              and provide personalized guidance for your application.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              Multiple ways to reach us for your convenience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-input"
                        {...register('phone')}
                        placeholder="Enter your phone number"
                      />
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

                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <select
                      className="form-input"
                      {...register('subject', { required: 'Subject is required' })}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Work Visa">Work Visa</option>
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Immigration Visa">Immigration Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Visa Rejection">Visa Rejection</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message *
                    </label>
                    <textarea
                      className="form-textarea"
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Our Location</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Business District, Suite 456</p>
                    <p className="text-sm">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Contact Us?</h2>
            <p className="section-subtitle">
              We provide comprehensive support throughout your visa journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Get personalized advice from certified visa consultants with years of experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Response</h3>
              <p className="text-gray-600">
                We respond to all inquiries within 24 hours during business days.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Channels</h3>
              <p className="text-gray-600">
                Contact us via phone, email, or visit our office for in-person consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't wait - contact us today for a free consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15551234567" className="btn bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a href="mailto:info@visaconsultancy.com" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
