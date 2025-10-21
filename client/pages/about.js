import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Users, Award, Globe, Clock, CheckCircle, Star } from 'lucide-react';
import { getTestimonials } from '../lib/supabase';

export default function About() {
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
      specializations: ["Documentation", "Tourist Visa"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const certifications = [
    {
      title: "Certified Immigration Consultant",
      issuer: "International Association of Immigration Consultants",
      year: "2023"
    },
    {
      title: "Visa Processing Specialist",
      issuer: "Global Visa Services Association",
      year: "2022"
    },
    {
      title: "Student Visa Expert",
      issuer: "Education Abroad Council",
      year: "2021"
    }
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Client-First Approach",
      description: "We prioritize our clients' needs and provide personalized solutions for each unique situation."
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Excellence in Service",
      description: "We maintain the highest standards of professionalism and quality in all our services."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Global Expertise",
      description: "Our team has extensive knowledge of visa requirements across different countries and regions."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Timely Processing",
      description: "We understand the importance of time and ensure efficient processing of all applications."
    }
  ];

  if (loading) {
    return (
      <Layout>
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
    <Layout title="About Us - Visa Consultancy" description="Learn about our mission, team, and commitment to providing exceptional visa consultancy services worldwide.">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Visa Consultancy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner in navigating the complex world of visa applications. 
              We've been helping individuals and families achieve their dreams of studying, 
              working, and living abroad for over a decade.
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

      {/* Mission & Vision */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To provide comprehensive, reliable, and personalized visa consultancy services that 
                help our clients achieve their international dreams. We believe that everyone deserves 
                the opportunity to explore, study, work, and live in their desired destination.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to simplify the complex visa application process through expert guidance, 
                meticulous documentation, and unwavering support throughout your journey.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To be the leading visa consultancy firm globally, recognized for our exceptional 
                success rates, client satisfaction, and innovative approach to visa processing.
              </p>
              <p className="text-lg text-gray-600">
                We envision a world where visa applications are accessible, transparent, and successful 
                for all, breaking down barriers and opening doors to new opportunities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
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
            <h2 className="section-title">Meet Our Expert Team</h2>
            <p className="section-subtitle">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.experience} experience</p>
                <div className="space-y-1">
                  {member.specializations.map((spec, specIndex) => (
                    <span key={specIndex} className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm mr-2 mb-2">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Certifications & Accreditations</h2>
            <p className="section-subtitle">
              Recognized expertise and professional credentials
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-600 mb-2">{cert.issuer}</p>
                <p className="text-sm text-primary-600 font-medium">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Visa Consultancy?</h2>
            <p className="section-subtitle">
              Here's what sets us apart from the competition
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">95% success rate with over 5000 successful applications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
                    <p className="text-gray-600">Certified consultants with years of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Personalized Service</h3>
                    <p className="text-gray-600">Tailored solutions for each client's unique needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Round-the-clock assistance throughout your application</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Client Satisfaction</h3>
              <div className="text-center mb-6">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-3xl font-bold text-primary-600">4.9/5</p>
                <p className="text-gray-600">Based on 1000+ reviews</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Service Quality</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Satisfaction</span>
                  <span className="font-semibold">97%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our expert team guide you through your visa application process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Book Free Consultation
            </Link>
            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
