import Layout from '../components/Layout';

const TermsOfServicePage = () => {
  return (
    <Layout title="Terms of Service - Visa Consultancy" description="Read our terms of service and understand the conditions for using our visa consultancy services.">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20">
          <div className="container">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Please read these terms carefully before using our visa consultancy services.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-sm text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using our services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Visa Consultancy provides professional visa consultancy services including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Visa application consultation and guidance</li>
                  <li>Document preparation and review</li>
                  <li>Application submission assistance</li>
                  <li>Interview preparation</li>
                  <li>Follow-up and status tracking</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Client Responsibilities</h2>
                <p className="text-gray-700 mb-4">As a client, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Submit required documents in a timely manner</li>
                  <li>Pay all applicable fees as agreed</li>
                  <li>Follow our guidance and recommendations</li>
                  <li>Notify us of any changes in your circumstances</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Limitations</h2>
                <p className="text-gray-700 mb-4">
                  While we provide expert guidance and support, we cannot guarantee:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Visa approval (decisions are made by government authorities)</li>
                  <li>Specific processing times (controlled by embassies/consulates)</li>
                  <li>Changes in government policies or requirements</li>
                  <li>Outcomes beyond our control</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Fees and Payment</h2>
                <p className="text-gray-700 mb-4">
                  Our service fees are clearly communicated before service commencement. Payment terms include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Service fees are separate from government visa fees</li>
                  <li>Payment is required before service commencement</li>
                  <li>Refunds are subject to our refund policy</li>
                  <li>Additional services may incur additional fees</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confidentiality</h2>
                <p className="text-gray-700 mb-4">
                  We maintain strict confidentiality of all client information and documents. 
                  Your personal information is protected and used only for visa processing purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  Our liability is limited to the amount paid for our services. We are not liable for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Visa rejections or delays</li>
                  <li>Government policy changes</li>
                  <li>Third-party actions or decisions</li>
                  <li>Indirect or consequential damages</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
                <p className="text-gray-700 mb-4">
                  Either party may terminate services with written notice. Termination does not affect 
                  obligations incurred before termination.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These terms are governed by the laws of the jurisdiction where our services are provided. 
                  Any disputes will be resolved through appropriate legal channels.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these terms at any time. Changes will be posted on this page 
                  and will become effective immediately upon posting.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@visaconsultancy.com<br />
                    <strong>Phone:</strong> +1 (555) 123-4567<br />
                    <strong>Address:</strong> 123 Business District, Suite 456, New York, NY 10001
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;
