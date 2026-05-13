import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      interests,
      destinations,
      nationality,
      arrivalDate,
      departureDate,
      numberOfTravellers,
      message,
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !nationality) {
      return NextResponse.json(
        { error: "Missing required fields (first name, last name, email, nationality)" },
        { status: 400 }
      );
    }

    if (!interests || interests.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one interest (Travel or Golf)" },
        { status: 400 }
      );
    }
    if (!destinations || destinations.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one destination" },
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
      from: `"Book Now Request" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: ` New Booking Request from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Request</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6;">
          <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 35px -10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1b4332, #2d6a4f); padding: 30px 25px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600; letter-spacing: -0.3px;"> New Booking Request</h1>
              <p style="margin: 8px 0 0; color: #d4e6d4; font-size: 14px;">From the Book Now page</p>
            </div>

            <!-- Customer Details Table -->
            <div style="padding: 30px 25px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 15px; line-height: 1.5;">
                <!-- Name -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332; width: 140px;"> Full Name</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">${firstName} ${lastName}</td>
                </tr>
                <!-- Email -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Email Address</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;"><a href="mailto:${email}" style="color: #c8602a; text-decoration: none;">${email}</a></td>
                </tr>
                <!-- Phone -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Phone Number</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">${phone || "Not provided"}</td>
                </tr>
                <!-- Nationality -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Nationality</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">${nationality}</td>
                </tr>
                <!-- Interests -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Interests</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">
                    ${interests.map((i: string) => `<span style="display: inline-block; background: #eef2f0; padding: 4px 12px; border-radius: 30px; font-size: 13px; margin-right: 6px; margin-bottom: 4px;">${i}</span>`).join('')}
                  </td>
                </tr>
                <!-- Destinations -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Destinations</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">
                    ${destinations.map((d: string) => `<span style="display: inline-block; background: #fff0e0; padding: 4px 12px; border-radius: 30px; font-size: 13px; margin-right: 6px; margin-bottom: 4px;">${d}</span>`).join('')}
                  </td>
                </tr>
                <!-- Arrival Date -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Arrival Date</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">${arrivalDate || "Not specified"}</td>
                </tr>
                <!-- Departure Date -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Departure Date</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">${departureDate || "Not specified"}</td>
                </tr>
                <!-- Travellers -->
                <tr style="border-bottom: 1px solid #e9ecef;">
                  <td style="padding: 14px 10px; font-weight: 600; color: #1b4332;"> Travellers</td>
                  <td style="padding: 14px 10px; color: #2c3e2f;">${numberOfTravellers || "Not specified"}</td>
                </tr>
              </table>

              <!-- Message Box -->
              <div style="margin-top: 30px; background: #f8faf8; border-radius: 20px; padding: 20px; border-left: 4px solid #c8602a;">
                <p style="margin: 0 0 10px; font-weight: 700; color: #1b4332; font-size: 16px;"> Special Requests / Message</p>
                <p style="margin: 0; color: #2c3e2f; line-height: 1.5; white-space: pre-wrap;">${message?.replace(/\n/g, "<br/>") || "No extra information provided."}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9f9f9; padding: 20px 25px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #5f6c66; font-size: 12px;"> This booking request was sent from your website's <strong>Book Now</strong> page.</p>
              <p style="margin: 8px 0 0; color: #5f6c66; font-size: 12px;">Reply directly to this email to contact the customer (reply‑to set to ${email}).</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        NEW BOOKING REQUEST (Book Now page)
        ----------------------------------------
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Nationality: ${nationality}
        Interests: ${interests.join(", ")}
        Destinations: ${destinations.join(", ")}
        Arrival Date: ${arrivalDate || "Not specified"}
        Departure Date: ${departureDate || "Not specified"}
        Travellers: ${numberOfTravellers || "Not specified"}
        Message: ${message || "None"}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Booking request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Book Now API error:", error);
    return NextResponse.json(
      { error: "Failed to send booking request" },
      { status: 500 }
    );
  }
}