import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { service, date, time, name, phone, email, notes } = await request.json();

 
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
      subject: `New Booking: ${service} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0c332d;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${service}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${date}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${time}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Notes:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${notes || 'None'}</td></tr>
          </table>
          <br>
          <p style="color: #666; font-size: 14px;">Sent from Advika Physiotherapy Clinic Booking System</p>
        </div>
      `,
    };

    
    await transporter.sendMail(clinicMailOptions);

    if (email) {
      const clientMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Booking Confirmation - Advika Physiotherapy Clinic`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0c332d;">Thank you for your booking request, ${name}!</h2>
            <p>We've received your appointment request and will contact you shortly to confirm.</p>
            
            <div style="background-color: #f0f9f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #147a6c; margin-top: 0;">Appointment Details:</h3>
              <table style="width: 100%;">
                <tr><td style="padding: 5px;"><strong>Service:</strong></td><td style="padding: 5px;">${service}</td></tr>
                <tr><td style="padding: 5px;"><strong>Date:</strong></td><td style="padding: 5px;">${date}</td></tr>
                <tr><td style="padding: 5px;"><strong>Time:</strong></td><td style="padding: 5px;">${time}</td></tr>
                <tr><td style="padding: 5px;"><strong>Phone:</strong></td><td style="padding: 5px;">${phone}</td></tr>
                ${notes ? `<tr><td style="padding: 5px;"><strong>Notes:</strong></td><td style="padding: 5px;">${notes}</td></tr>` : ''}
              </table>
            </div>
            
            <p>We'll contact you at <strong>${phone}</strong> to confirm your appointment.</p>
            <br>
            <p>Best regards,<br><strong>Advika Physiotherapy Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        `,
      };

      await transporter.sendMail(clientMailOptions);
    }

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}