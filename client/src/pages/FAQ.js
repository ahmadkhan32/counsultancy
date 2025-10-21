import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqCategories = [
    {
      title: 'General Questions',
      icon: '❓',
      questions: [
        {
          question: 'What services do you provide?',
          answer: 'We provide comprehensive visa consultancy services including student visas, work visas, tourist visas, immigration visas, business visas, and transit visas. Our services include eligibility assessment, document preparation, application submission, and ongoing support throughout the process.'
        },
        {
          question: 'How much do your services cost?',
          answer: 'Our consultation fees vary depending on the visa type and complexity of your case. Student visas start at $100, work visas at $150, tourist visas at $50, and immigration visas at $200. We also provide free initial consultations to assess your eligibility.'
        },
        {
          question: 'Do you guarantee visa approval?',
          answer: 'While we cannot guarantee visa approval as the final decision rests with the respective embassy or consulate, we have a 95% success rate due to our thorough preparation, expert guidance, and attention to detail in every application we handle.'
        },
        {
          question: 'How long have you been in business?',
          answer: 'We have been providing visa consultancy services for over 10 years, helping thousands of clients successfully obtain their visas. Our team consists of certified consultants with extensive experience in various visa categories and countries.'
        }
      ]
    },
    {
      title: 'Student Visa',
      icon: '🎓',
      questions: [
        {
          question: 'What documents do I need for a student visa?',
          answer: 'For a student visa, you typically need: valid passport, admission letter from the educational institution, financial statements showing sufficient funds, academic transcripts, English proficiency test scores (IELTS/TOEFL), health insurance, and a statement of purpose.'
        },
        {
          question: 'How long does a student visa take to process?',
          answer: 'Student visa processing times vary by country: USA (4-8 weeks), UK (3-6 weeks), Canada (4-8 weeks), Australia (4-12 weeks), Germany (2-4 weeks). We recommend applying at least 3-4 months before your intended start date.'
        },
        {
          question: 'Can I work while on a student visa?',
          answer: 'Work permissions vary by country. In the USA, F-1 students can work on-campus up to 20 hours per week. In the UK, students can work up to 20 hours per week during term time. In Canada, students can work up to 20 hours per week off-campus. We can provide specific details for your destination country.'
        },
        {
          question: 'What if my student visa is rejected?',
          answer: 'If your student visa is rejected, we can help you understand the reasons for rejection and guide you through the reapplication process. Common reasons include insufficient funds, weak ties to home country, or incomplete documentation. We'll help you address these issues for a successful reapplication.'
        }
      ]
    },
    {
      title: 'Work Visa',
      icon: '💼',
      questions: [
        {
          question: 'What types of work visas do you handle?',
          answer: 'We handle various work visas including H-1B (USA), Skilled Worker Visa (UK), Express Entry (Canada), 482 Visa (Australia), Blue Card (Germany), and many others. Each visa type has specific requirements and eligibility criteria that we can help you navigate.'
        },
        {
          question: 'Do I need a job offer before applying for a work visa?',
          answer: 'Most work visas require a job offer from an employer in the destination country. However, some countries like Canada offer programs like Express Entry where you can apply without a job offer if you meet certain criteria. We can assess your eligibility for different programs.'
        },
        {
          question: 'How long can I stay on a work visa?',
          answer: 'Work visa validity varies by country and visa type. Generally, initial work visas are valid for 1-3 years and can be extended. Some countries offer pathways to permanent residence after working for a certain period. We can provide specific information based on your situation.'
        },
        {
          question: 'Can my family join me on a work visa?',
          answer: 'Yes, most work visas allow you to bring your spouse and dependent children. They can usually work or study in the destination country. The specific rules vary by country, and we can help you understand the requirements for family members.'
        }
      ]
    },
    {
      title: 'Tourist Visa',
      icon: '✈️',
      questions: [
        {
          question: 'How long does a tourist visa take to process?',
          answer: 'Tourist visa processing times are generally faster: USA (2-4 weeks), UK (1-3 weeks), Canada (2-4 weeks), Australia (1-2 weeks), Schengen countries (1-2 weeks). However, processing times can vary based on the time of year and individual circumstances.'
        },
        {
          question: 'What documents do I need for a tourist visa?',
          answer: 'For a tourist visa, you typically need: valid passport, completed application form, passport-sized photographs, travel itinerary, hotel bookings, financial statements, travel insurance, and proof of ties to your home country (employment letter, property documents, etc.).'
        },
        {
          question: 'How long can I stay on a tourist visa?',
          answer: 'Tourist visa validity varies by country. Most tourist visas allow stays of 30-90 days per visit, with validity periods ranging from 6 months to 10 years. The exact duration depends on your nationality and the destination country\'s policies.'
        },
        {
          question: 'Can I extend my tourist visa?',
          answer: 'Tourist visa extensions are possible in some countries but not all. The process and requirements vary significantly. We can help you understand the extension possibilities for your specific destination and guide you through the process if extensions are allowed.'
        }
      ]
    },
    {
      title: 'Immigration Visa',
      icon: '🏠',
      questions: [
        {
          question: 'What is the difference between temporary and permanent immigration?',
          answer: 'Temporary immigration includes work visas, student visas, and other temporary residence permits. Permanent immigration leads to permanent residence (green card, PR status) and eventually citizenship. We help with both types, but permanent immigration typically has more complex requirements and longer processing times.'
        },
        {
          question: 'How long does permanent immigration take?',
          answer: 'Permanent immigration processing times vary significantly by country and program. USA (1-3 years), Canada (6-18 months), Australia (6-12 months), UK (6-12 months). Processing times depend on the specific program, your qualifications, and current application volumes.'
        },
        {
          question: 'What are the main immigration programs?',
          answer: 'Main immigration programs include: USA (EB-1, EB-2, EB-3, family sponsorship), Canada (Express Entry, Provincial Nominee Program), Australia (Skilled Migration, Employer Nomination), UK (Skilled Worker, Global Talent). Each program has specific requirements and point systems.'
        },
        {
          question: 'Do I need to take language tests for immigration?',
          answer: 'Most countries require language proficiency tests for immigration. Common tests include IELTS, TOEFL, CELPIP (Canada), and country-specific tests. The required scores vary by program and country. We can help you prepare for these tests and understand the requirements.'
        }
      ]
    },
    {
      title: 'Application Process',
      icon: '📋',
      questions: [
        {
          question: 'What is your application process?',
          answer: 'Our process includes: 1) Free initial consultation and eligibility assessment, 2) Document preparation and verification, 3) Application form completion, 4) Submission to relevant authorities, 5) Follow-up and status updates, 6) Interview preparation (if required), 7) Post-approval guidance.'
        },
        {
          question: 'How do you ensure application success?',
          answer: 'We ensure success through: thorough eligibility assessment, complete and accurate documentation, expert knowledge of requirements, attention to detail, timely submission, proper follow-up, and interview preparation. Our 95% success rate speaks to our expertise and dedication.'
        },
        {
          question: 'What if I make a mistake in my application?',
          answer: 'If you notice a mistake before submission, we can correct it. If the mistake is discovered after submission, we can help you submit a correction or additional documents. The process varies by country and mistake type. Early detection and correction are always better.'
        },
        {
          question: 'How do you keep me updated on my application status?',
          answer: 'We provide regular updates via email and phone calls. You can also track your application status through our client portal. We monitor application progress and notify you of any updates, requests for additional documents, or interview schedules.'
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.title }))
  );

  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Find answers to common questions about our visa services, application processes, 
              and requirements. Can't find what you're looking for? Contact us for personalized assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      {!searchTerm ? (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="card">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = `${categoryIndex}-${faqIndex}`;
                      return (
                        <div key={faqIndex} className="border border-gray-200 rounded-lg">
                          <button
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            onClick={() => toggleItem(globalIndex)}
                          >
                            <span className="font-semibold text-gray-800">{faq.question}</span>
                            {openItems[globalIndex] ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {openItems[globalIndex] && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Search Results */
        <section className="section bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                Search Results for "{searchTerm}" ({filteredQuestions.length} found)
              </h2>
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                  <p className="text-gray-500">Try different keywords or contact us for assistance</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((faq, index) => (
                    <div key={index} className="card">
                      <div className="flex items-start space-x-4">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mt-3 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Still Have Questions */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Still Have Questions?</h2>
            <p className="section-subtitle">
              Can't find the answer you're looking for? Our expert team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="/consultation" className="btn btn-primary">
                Book Free Consultation
              </a>
              <a href="/contact" className="btn btn-outline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
