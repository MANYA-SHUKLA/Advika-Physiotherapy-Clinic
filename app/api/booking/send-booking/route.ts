import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory storage for demo purposes
// In production, use a proper database
const bookings: { date: string; time: string }[] = [];

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

    // Add to bookings (in production, use a database)
    bookings.push({ date, time });

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to clinic
    const clinicMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shuklamanya99@gmail.com',
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Additional Notes:</strong> ${notes || 'None'}</p>
        <br>
        <p>This booking was submitted from the website booking form.</p>
      `,
    };

    // Email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Appointment Request Received - Advika Physiotherapy Clinic`,
      html: `
        <h2>Thank you for your booking request!</h2>
        <p>Dear ${name},</p>
        <p>We have received your appointment request with the following details:</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <br>
        <p>Our team will review your request and confirm your appointment shortly.</p>
        <p>If you have any questions, please contact us at +91 80055 86588</p>
        <br>
        <p>Best regards,<br>Advika Physiotherapy Clinic</p>
      `,
    };

    // Send emails
    await transporter.sendMail(clinicMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json({ message: 'Booking created successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}