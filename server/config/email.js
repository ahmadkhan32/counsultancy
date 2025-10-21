const nodemailer = require('nodemailer');
require('dotenv').config();

// Only create transporter if email credentials are provided
let transporter = null;

if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log('Email configuration error:', error);
    } else {
      console.log('Email server is ready to take our messages');
    }
  });
} else {
  console.warn('⚠️  Email credentials not found. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in your .env file');
}

const sendEmail = async (to, subject, html, text = '') => {
  if (!transporter) {
    console.warn('Email transporter not configured. Skipping email send.');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

const sendConsultationConfirmation = async (consultationData) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Consultation Booking Confirmation</h2>
      <p>Dear ${consultationData.clientInfo.name},</p>
      <p>Thank you for booking a consultation with Visa Consultancy. Here are your booking details:</p>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Consultation Details</h3>
        <p><strong>Visa Type:</strong> ${consultationData.consultationDetails.visaType}</p>
        <p><strong>Country:</strong> ${consultationData.consultationDetails.country}</p>
        <p><strong>Preferred Date:</strong> ${new Date(consultationData.consultationDetails.preferredDate).toLocaleDateString()}</p>
        <p><strong>Preferred Time:</strong> ${consultationData.consultationDetails.preferredTime}</p>
        <p><strong>Consultation Type:</strong> ${consultationData.consultationDetails.consultationType}</p>
      </div>
      
      <p>We will contact you soon to confirm your appointment. If you have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>Visa Consultancy Team</p>
    </div>
  `;

  return await sendEmail(
    consultationData.clientInfo.email,
    'Consultation Booking Confirmation - Visa Consultancy',
    html
  );
};

const sendApplicationConfirmation = async (applicationData) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Visa Application Received</h2>
      <p>Dear ${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName},</p>
      <p>Thank you for submitting your visa application. We have received your application and will begin processing it shortly.</p>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Application Details</h3>
        <p><strong>Application ID:</strong> ${applicationData.id}</p>
        <p><strong>Visa Type:</strong> ${applicationData.visaInfo.visaType}</p>
        <p><strong>Country:</strong> ${applicationData.visaInfo.country}</p>
        <p><strong>Status:</strong> Pending Review</p>
      </div>
      
      <p>Our team will review your application and contact you within 2-3 business days with the next steps.</p>
      
      <p>Best regards,<br>Visa Consultancy Team</p>
    </div>
  `;

  return await sendEmail(
    applicationData.personalInfo.email,
    'Visa Application Received - Visa Consultancy',
    html
  );
};

const sendInquiryConfirmation = async (inquiryData) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Inquiry Received</h2>
      <p>Dear ${inquiryData.name},</p>
      <p>Thank you for contacting Visa Consultancy. We have received your inquiry and will respond within 24 hours.</p>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Your Inquiry</h3>
        <p><strong>Subject:</strong> ${inquiryData.subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: white; padding: 15px; border-radius: 4px;">${inquiryData.message}</p>
      </div>
      
      <p>We appreciate your interest in our services and look forward to assisting you with your visa needs.</p>
      
      <p>Best regards,<br>Visa Consultancy Team</p>
    </div>
  `;

  return await sendEmail(
    inquiryData.email,
    'Inquiry Received - Visa Consultancy',
    html
  );
};

module.exports = {
  sendEmail,
  sendConsultationConfirmation,
  sendApplicationConfirmation,
  sendInquiryConfirmation
};
