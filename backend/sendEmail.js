// Import Nodemailer package
const nodemailer = require('nodemailer');

// Create a transporter object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itsaikonda@gmail.com',  // Replace with your Gmail address
    pass: 'fhzb xlvg yxds vlny'      // Use the App Password you generated on Google
  }
});

// Email options: specify sender, recipient, subject, and body
const mailOptions = {
  from: 'saikonda2403@gmail.com',  // Sender address
  to: 'itsaikonda@gmail.com',    // Recipient email address
  subject: 'Test Email from Nodemailer', // Subject line
  text: 'This is a test email sent via Nodemailer in Node.js.', // Plain text body
  html: '<h1>This is a test email sent via Nodemailer in Node.js.</h1>' // HTML body (optional)
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
