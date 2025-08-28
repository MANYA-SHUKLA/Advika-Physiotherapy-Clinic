import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const clinicMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shuklamanya99@gmail.com', 
      subject: 'New Newsletter Subscription - Advika Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a34;">New Newsletter Subscription</h2>
          <p>A new user has subscribed to your Advika Clinic newsletter:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0 0 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #666; font-size: 14px;">This is an automated message from your website.</p>
        </div>
      `,
    };

  
    const subscriberMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for Subscribing to Advika Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #1e3a34; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Advika Physiotherapy Clinic</h1>
          </div>
          
          <div style="padding: 20px;">
            <h2 style="color: #1e3a34;">Thank You for Subscribing!</h2>
            <p>Dear Subscriber,</p>
            <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
            <ul>
              <li>New treatments and services</li>
              <li>Health tips and advice</li>
              <li>Special offers and promotions</li>
              <li>Clinic news and events</li>
            </ul>
            
            <p>We're committed to helping you move better, recover faster, and live pain-free.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #34d399; margin: 20px 0;">
              <p style="margin: 0;"><strong>Need to book an appointment?</strong></p>
              <p style="margin: 10px 0 0 0;">
                <a href="https://wa.me/918005586588" style="color: #1e3a34; text-decoration: underline;">
                  Message us on WhatsApp
                </a> 
                or call us at <a href="tel:+917381019858" style="color: #1e3a34;">+91 73810 19858</a>
              </p>
            </div>
            
            <p>Best regards,<br>The Advika Clinic Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>Advika Physiotherapy Clinic<br>
            D 008, Ajnara Integrity, Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201017</p>
            <p>You're receiving this email because you subscribed to our newsletter. 
            <a href="#" style="color: #666;">Unsubscribe</a></p>
          </div>
        </div>
      `,
    };

   
    await transporter.sendMail(clinicMailOptions);
    await transporter.sendMail(subscriberMailOptions);

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
