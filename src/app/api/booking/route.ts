import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, message, packageName } =
      await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields (first name, last name, email)' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Booking Request" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Booking Request from ${firstName} ${lastName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Package:</strong> ${packageName || 'Not specified'}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Additional details:</strong></p>
        <p>${message?.replace(/\n/g, '<br/>') || 'No extra information'}</p>
      `,
      text: `
        New Booking Request
        Package: ${packageName || 'Not specified'}
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Details: ${message || 'None'}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Booking request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}