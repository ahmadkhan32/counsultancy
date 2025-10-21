import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, FileText, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      visaType: location.state?.visaType || '',
      country: location.state?.country || ''
    }
  });

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Basic details about yourself' },
    { number: 2, title: 'Visa Details', description: 'Information about your visa application' },
    { number: 3, title: 'Documents', description: 'Upload required documents' },
    { number: 4, title: 'Review & Submit', description: 'Review and submit your application' }
  ];

  const requiredDocuments = [
    'Passport (valid for at least 6 months)',
    'Passport-sized photographs',
    'Financial statements (last 3 months)',
    'Educational certificates',
    'Employment letter (if applicable)',
    'Travel insurance',
    'Visa application form',
    'Supporting documents'
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      file: file,
      id: Date.now() + Math.random()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add personal info
      formData.append('personalInfo', JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        nationality: data.nationality,
        passportNumber: data.passportNumber,
        passportExpiry: data.passportExpiry
      }));

      // Add visa info
      formData.append('visaInfo', JSON.stringify({
        country: data.country,
        visaType: data.visaType,
        purpose: data.purpose,
        intendedArrivalDate: data.intendedArrivalDate,
        duration: data.duration
      }));

      // Add documents
      uploadedFiles.forEach((file, index) => {
        formData.append('documents', file.file);
      });

      const response = await axios.post('/api/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Application submitted successfully! We will review it and contact you soon.');
      setCurrentStep(1);
      setUploadedFiles([]);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name *
                </label>
                <input
                  type="text"
                  className="form-input"
                  {...register('firstName', { required: 'First name is required' })}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4 inline mr-2" />
                  Last Name *
                </label>
                <input
                  type="text"
                  className="form-input"
                  {...register('lastName', { required: 'Last name is required' })}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  className="form-input"
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Nationality *
                </label>
                <select
                  className="form-input"
                  {...register('nationality', { required: 'Nationality is required' })}
                >
                  <option value="">Select your nationality</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Canadian">Canadian</option>
                  <option value="Australian">Australian</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Other">Other</option>
                </select>
                {errors.nationality && (
                  <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Passport Number *
                </label>
                <input
                  type="text"
                  className="form-input"
                  {...register('passportNumber', { required: 'Passport number is required' })}
                  placeholder="Enter your passport number"
                />
                {errors.passportNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.passportNumber.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Passport Expiry Date *
                </label>
                <input
                  type="date"
                  className="form-input"
                  {...register('passportExpiry', { required: 'Passport expiry date is required' })}
                />
                {errors.passportExpiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.passportExpiry.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Visa Details</h3>
            
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

            <div className="form-group">
              <label className="form-label">Purpose of Visit *</label>
              <textarea
                className="form-textarea"
                {...register('purpose', { required: 'Purpose is required' })}
                placeholder="Describe the purpose of your visit..."
                rows={4}
              />
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Intended Arrival Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  {...register('intendedArrivalDate')}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Duration of Stay</label>
                <select
                  className="form-input"
                  {...register('duration')}
                >
                  <option value="">Select duration</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2+ years">2+ years</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Required Documents</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Document Checklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Upload className="w-4 h-4 inline mr-2" />
                Upload Documents *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Click to upload documents
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                  </p>
                </label>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Uploaded Files:</h4>
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Review Your Application</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {watch('firstName')} {watch('lastName')}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {watch('email')}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {watch('phone')}
                </div>
                <div>
                  <span className="font-medium">Date of Birth:</span> {watch('dateOfBirth')}
                </div>
                <div>
                  <span className="font-medium">Nationality:</span> {watch('nationality')}
                </div>
                <div>
                  <span className="font-medium">Passport Number:</span> {watch('passportNumber')}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Visa Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Visa Type:</span> {watch('visaType')}
                </div>
                <div>
                  <span className="font-medium">Country:</span> {watch('country')}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {watch('duration')}
                </div>
                <div>
                  <span className="font-medium">Arrival Date:</span> {watch('intendedArrivalDate')}
                </div>
              </div>
              <div className="mt-4">
                <span className="font-medium">Purpose:</span>
                <p className="text-sm mt-1">{watch('purpose')}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Documents</h4>
              <p className="text-sm">
                {uploadedFiles.length} file(s) uploaded
              </p>
              <ul className="text-sm mt-2 space-y-1">
                {uploadedFiles.map((file) => (
                  <li key={file.id} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Visa Application</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Complete your visa application in just a few simple steps. 
              Our guided process ensures you provide all necessary information and documents.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-4 hidden md:block">
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="btn btn-outline"
                  >
                    Previous
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Application;
