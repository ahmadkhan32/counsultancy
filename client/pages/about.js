import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Users, Award, Globe, Clock, CheckCircle, Star } from 'lucide-react';
import { getTestimonials } from '../lib/supabase';

export default function About({ user, logout }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const data = await getTestimonials(true);
        setTestimonials(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonialsData();
  }, []);

  const stats = [
    { number: "5000+", label: "Successful Applications" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Countries Covered" },
    { number: "10+", label: "Years Experience" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Senior Visa Consultant",
      experience: "8 years",
      specializations: ["Student Visa", "Work Visa"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Immigration Specialist",
      experience: "12 years",
      specializations: ["Immigration", "Family Visa"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Documentation Expert",
      experience: "6 years",
      specializations: ["Documentation", "Business Visa"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Client-First Approach",
      description: "We prioritize our clients' success and satisfaction above all else."
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Excellence in Service",
      description: "We maintain the highest standards of professionalism and expertise."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Global Perspective",
      description: "We understand international visa requirements and cultural nuances."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Timely Delivery",
      description: "We respect your time and deliver results within promised timelines."
    }
  ];

  if (loading) {
    return (
      <Layout user={user} logout={logout}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} logout={logout}>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Visa Consultancy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We are dedicated to helping individuals and families achieve their dreams of studying, 
              working, or living abroad through expert visa guidance and support.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2013, our visa consultancy has grown from a small team of passionate 
                immigration experts to a comprehensive service provider helping thousands of 
                clients worldwide achieve their visa goals.
              </p>
              <p className="text-gray-600 mb-6">
                We understand that applying for a visa can be overwhelming and stressful. 
                That's why we've built our services around providing clear guidance, 
                transparent communication, and personalized support throughout your entire journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span>Licensed immigration consultants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span>Up-to-date with latest visa regulations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span>Personalized approach for each client</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop" 
                alt="Our team" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4">{member.experience} experience</p>
                <div className="space-y-1">
                  {member.specializations.map((spec, specIndex) => (
                    <span key={specIndex} className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs mr-1 mb-1">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-subtitle">
                Real experiences from real people who achieved their visa goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {testimonial.client_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.client_name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>{testimonial.client_location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">"{testimonial.testimonial}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our experienced team guide you through your visa application process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Book Free Consultation
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
