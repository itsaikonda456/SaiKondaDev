// server.js update
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Enhanced CORS configuration to accept requests from your React app
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://your-domain.com'], // Add your app's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Increase JSON payload size limit if needed
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itsaikonda@gmail.com',  // Your Gmail address
    pass: 'fhzb xlvg yxds vlny'     // Your App Password
  }
});

// Test endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Appointment Email Server is running');
});

// API endpoint to handle appointment acceptance
app.put('/api/appointments/:id/accept', async (req, res) => {
  try {
    console.log('Received acceptance request for ID:', req.params.id);
    console.log('Appointment data:', req.body);
    
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in appointment data"
      });
    }

    const appointmentId = req.params.id;
    const appointmentData = req.body;

    // Send confirmation email to the client
    await sendAcceptanceEmail(appointmentData);

    res.status(200).json({ 
      success: true, 
      message: "Appointment accepted and confirmation email sent" 
    });
  } catch (error) {
    console.error("Error accepting appointment:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to process appointment acceptance", 
      error: error.message 
    });
  }
});

// API endpoint to handle appointment rejection
app.put('/api/appointments/:id/reject', async (req, res) => {
  try {
    console.log('Received rejection request for ID:', req.params.id);
    console.log('Appointment data:', req.body);
    
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in appointment data"
      });
    }

    const appointmentId = req.params.id;
    const appointmentData = req.body;

    // Send rejection email to the client
    await sendRejectionEmail(appointmentData);

    res.status(200).json({ 
      success: true, 
      message: "Appointment rejected and notification email sent" 
    });
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to process appointment rejection", 
      error: error.message 
    });
  }
});

// Function to send acceptance email
async function sendAcceptanceEmail(appointment) {
  const mailOptions = {
    from: 'saikonda2403@gmail.com',  // Sender address
    to: appointment.email,           // Client's email
    subject: 'Your Appointment Has Been Confirmed',
    text: `
Dear ${appointment.name},

We're pleased to confirm your appointment on ${appointment.date} at ${appointment.time}.

Appointment Details:
- Date: ${appointment.date}
- Time: ${appointment.time}
${appointment.services ? `- Services: ${appointment.services.join(", ")}` : ''}

Please arrive 5-10 minutes before your scheduled time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.

Thank you for choosing our services!

Best regards,
Your Business Name
Contact: itsaikonda@gmail.com
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #4CAF50; text-align: center;">Appointment Confirmation</h2>
  <p>Dear <strong>${appointment.name}</strong>,</p>
  
  <p>We're pleased to confirm your appointment on <strong>${appointment.date}</strong> at <strong>${appointment.time}</strong>.</p>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
    <h3 style="margin-top: 0;">Appointment Details:</h3>
    <ul style="list-style-type: none; padding-left: 5px;">
      <li><strong>Date:</strong> ${appointment.date}</li>
      <li><strong>Time:</strong> ${appointment.time}</li>
      ${appointment.services ? `<li><strong>Services:</strong> ${appointment.services.join(", ")}</li>` : ''}
    </ul>
  </div>
  
  <p>Please arrive 5-10 minutes before your scheduled time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
  
  <p>Thank you for choosing our services!</p>
  
  <p style="margin-top: 20px;">Best regards,<br>
  Your Business Name<br>
  Contact: <a href="mailto:itsaikonda@gmail.com">itsaikonda@gmail.com</a></p>
</div>
    `
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending acceptance email:', error);
        reject(error);
      } else {
        console.log('Acceptance email sent:', info.response);
        resolve(info);
      }
    });
  });
}

// Function to send rejection email
async function sendRejectionEmail(appointment) {
  const mailOptions = {
    from: 'saikonda2403@gmail.com',  // Sender address
    to: appointment.email,           // Client's email
    subject: 'Regarding Your Appointment Request',
    text: `
Dear ${appointment.name},

Thank you for your interest in our services.

Unfortunately, we are unable to accommodate your appointment request for ${appointment.date} at ${appointment.time}. This could be due to scheduling conflicts or unavailability of the requested service.

We would be happy to help you schedule for an alternative date and time. Please feel free to submit a new appointment request or contact us directly.

We apologize for any inconvenience this may cause.

Best regards,
Your Business Name
Contact: itsaikonda@gmail.com
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #F44336; text-align: center;">Appointment Request Update</h2>
  <p>Dear <strong>${appointment.name}</strong>,</p>
  
  <p>Thank you for your interest in our services.</p>
  
  <p>Unfortunately, we are unable to accommodate your appointment request for <strong>${appointment.date}</strong> at <strong>${appointment.time}</strong>. This could be due to scheduling conflicts or unavailability of the requested service.</p>
  
  <p>We would be happy to help you schedule for an alternative date and time. Please feel free to submit a new appointment request or contact us directly.</p>
  
  <p>We apologize for any inconvenience this may cause.</p>
  
  <p style="margin-top: 20px;">Best regards,<br>
  Your Business Name<br>
  Contact: <a href="mailto:itsaikonda@gmail.com">itsaikonda@gmail.com</a></p>
</div>
    `
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending rejection email:', error);
        reject(error);
      } else {
        console.log('Rejection email sent:', info.response);
        resolve(info);
      }
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test server at http://localhost:${PORT}`);
});