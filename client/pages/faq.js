import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import Layout from '../components/Layout';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What services do you offer?',
          answer: 'We offer comprehensive visa consultancy services including student visas, work visas, tourist visas, business visas, immigration visas, and transit visas for various countries worldwide.'
        },
        {
          question: 'How long does the visa process take?',
          answer: 'Processing times vary depending on the visa type and destination country. Generally, tourist visas take 1-2 weeks, student visas 2-8 weeks, and work visas 4-12 weeks. We provide specific timelines during consultation.'
        },
        {
          question: 'Do you guarantee visa approval?',
          answer: 'While we cannot guarantee approval (as that depends on embassy decisions), we have a high success rate due to our expertise in documentation, application preparation, and guidance throughout the process.'
        }
      ]
    },
    {
      category: 'Application Process',
      questions: [
        {
          question: 'What documents do I need for a visa application?',
          answer: 'Required documents vary by visa type and country. Generally, you need a valid passport, application form, photographs, financial documents, travel itinerary, and supporting documents. We provide a complete checklist during consultation.'
        },
        {
          question: 'Can you help with document preparation?',
          answer: 'Yes, we assist with document preparation, review, and organization. We ensure all documents meet embassy requirements and are properly formatted.'
        },
        {
          question: 'Do you handle the entire application process?',
          answer: 'We provide end-to-end support including consultation, document preparation, application submission, interview preparation, and follow-up until visa approval.'
        }
      ]
    },
    {
      category: 'Fees and Payment',
      questions: [
        {
          question: 'What are your consultation fees?',
          answer: 'We offer free initial consultations. Our service fees vary based on visa type and complexity. We provide transparent pricing with no hidden costs.'
        },
        {
          question: 'When do I need to pay?',
          answer: 'Payment is typically required after consultation and before we begin document preparation. We accept various payment methods for your convenience.'
        },
        {
          question: 'Are government fees included in your charges?',
          answer: 'Government visa fees are separate and paid directly to the embassy. Our service fees are for consultation, document preparation, and application support.'
        }
      ]
    },
    {
      category: 'Support and Communication',
      questions: [
        {
          question: 'How can I track my application status?',
          answer: 'We provide regular updates on your application status and are available for questions throughout the process. You can contact us anytime for updates.'
        },
        {
          question: 'What if my visa is rejected?',
          answer: 'If your visa is rejected, we analyze the reasons and help you reapply with improved documentation. We also provide guidance on addressing rejection concerns.'
        },
        {
          question: 'Do you provide post-visa support?',
          answer: 'Yes, we offer post-visa support including travel guidance, arrival assistance information, and ongoing support for your visa journey.'
        }
      ]
    }
  ];

  return (
    <Layout title="FAQ - Visa Consultancy" description="Find answers to frequently asked questions about our visa consultancy services, application process, and support.">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20">
          <div className="container">
            <div className="text-center">
              <FaQuestionCircle className="text-6xl mx-auto mb-6 text-blue-200" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Find answers to common questions about our visa consultancy services and application process.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container py-16">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                {section.category}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {section.questions.map((faq, index) => {
                  const globalIndex = sectionIndex * 10 + index;
                  const isOpen = openItems.has(globalIndex);
                  
                  return (
                    <div key={index} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition duration-300"
                      >
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        {isOpen ? (
                          <FaChevronUp className="text-blue-600" />
                        ) : (
                          <FaChevronDown className="text-blue-600" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="border-t pt-4">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <div className="bg-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-blue-100 mb-6">
                Our expert team is here to help. Contact us for personalized assistance with your visa needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/consultation"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Book Free Consultation
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
