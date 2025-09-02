import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory storage for demo purposes
const bookings: { date: string; time: string }[] = [];

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

export async function POST(request: NextRequest) {
  try {
    const { service, date, time, name, phone, email, notes } = await request.json();

    // Check for double booking
    const isAlreadyBooked = bookings.some(
      booking => booking.date === date && booking.time === time
    );

    if (isAlreadyBooked) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please choose another time.' },
        { status: 409 }
      );
    }

    // Add to bookings
    bookings.push({ date, time });

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Booking Confirmation - Advika Physiotherapy Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0c332d;">Appointment Booking Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for booking an appointment with Advika Physiotherapy Clinic.</p>
          <h3 style="color: #0c332d;">Appointment Details:</h3>
          <ul>
            <li><strong>Service:</strong> ${service}</li>
            <li><strong>Date:</strong> ${date}</li>
            <li><strong>Time:</strong> ${time}</li>
            <li><strong>Phone:</strong> ${phone}</li>
          </ul>
          ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
          <p>We will contact you if there are any changes to your appointment.</p>
          <p>If you need to reschedule or have any questions, please contact us at ${process.env.CLINIC_PHONE || '+91 XXXXX XXXXX'}.</p>
          <br>
          <p>Best regards,<br>Advika Physiotherapy Clinic Team</p>
        </div>
      `,
    };

    // Send notification email to clinic
    const clinicMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shuklamanya99@gmail.com', // Receiver email
      subject: 'New Appointment Booking - Advika Physiotherapy Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0c332d;">New Appointment Booking</h2>
          <h3>Client Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Service:</strong> ${service}</li>
            <li><strong>Date:</strong> ${date}</li>
            <li><strong>Time:</strong> ${time}</li>
          </ul>
          ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
          <p>Booking received at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(clinicMailOptions)
    ]);

    return NextResponse.json({ 
      message: 'Booking created successfully. Confirmation email has been sent.' 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again later.' },
      { status: 500 }
    );
  }
}