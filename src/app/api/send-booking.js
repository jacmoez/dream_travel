
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Destructure fields exactly as sent from the ContactUs booking modal
  const {
    firstName,
    lastName,
    email,
    phone,
    message,        // renamed from 'requests' to match the textarea
    packageName,
  } = req.body;

  // Required fields (phone and message are optional)
  if (!firstName || !lastName || !email || !packageName) {
    return res.status(400).json({ success: false, error: 'Missing required fields: first name, last name, email, or package name' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'booking@yourcompany.com',  // change to your receiving email
      subject: `New Booking Request: ${packageName}`,
      html: `
        <h3>Booking Request</h3>
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message / Requests:</strong> ${message || 'None'}</p>
      `,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}