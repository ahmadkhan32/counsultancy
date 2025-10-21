import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ArrowRight, CheckCircle, Users, Globe, Award, Clock } from 'lucide-react';
import { getCountries, getVisaTypes, getTestimonials } from '../lib/supabase';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesData, visaTypesData, testimonialsData] = await Promise.all([
          getCountries(),
          getVisaTypes(),
          getTestimonials(true)
        ]);
        
        setCountries(countriesData.slice(0, 6));
        setVisaTypes(visaTypesData.slice(0, 4));
        setTestimonials(testimonialsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Expert Consultants",
      description: "Our team of experienced visa consultants provides personalized guidance for your application."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Global Coverage",
      description: "We assist with visa applications for countries worldwide including USA, UK, Canada, Australia."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "High Success Rate",
      description: "Our proven track record shows 95% success rate in visa applications we handle."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Fast Processing",
      description: "We expedite your application process with our efficient documentation and submission system."
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
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Your Trusted Visa Experts
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Professional visa consultancy services for study, work, visit, and immigration visas. 
                Expert guidance for your visa applications worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/application" className="btn btn-primary text-lg px-8 py-4">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/consultation" className="btn btn-secondary text-lg px-8 py-4">
                  Book Free Consultation
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Quick Application Check</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Document checklist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Processing time estimate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Fee calculation</span>
                  </div>
                </div>
                <Link href="/consultation" className="btn btn-primary w-full mt-6">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">
              We provide comprehensive visa consultancy services with a proven track record of success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Countries Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">
              We help you get visas for the most sought-after countries worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => (
              <div key={country.id} className="card hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">{country.flag}</div>
                  <h3 className="text-xl font-bold mb-2">{country.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{country.description}</p>
                  <div className="space-y-2 mb-6">
                    {country.popular_visa_types?.slice(0, 3).map((visaType, index) => (
                      <span key={index} className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs mr-1 mb-1">
                        {visaType}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/consultation?country=${country.name}`}
                    className="btn btn-primary w-full"
                  >
                    Get Visa Info
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Visa Services</h2>
            <p className="section-subtitle">
              Comprehensive visa solutions for all your travel and immigration needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visaTypes.map((visaType) => (
              <div key={visaType.id} className="card">
                <h3 className="text-2xl font-bold mb-4 text-primary-600">{visaType.name}</h3>
                <p className="text-gray-600 mb-6">{visaType.description}</p>
                <ul className="space-y-2 mb-6">
                  {visaType.eligibility?.slice(0, 4).map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/visa-categories" className="btn btn-primary">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section bg-gray-50">
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
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Visa Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get expert guidance and increase your chances of visa approval
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Book Free Consultation
            </Link>
            <Link href="/application" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Start Application
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
