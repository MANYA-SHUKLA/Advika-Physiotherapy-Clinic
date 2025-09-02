import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Helper functions to read/write bookings
const getBookings = () => {
  try {
    const filePath = path.join(process.cwd(), 'bookings.json');
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
};

const saveBooking = (newBooking: any) => {
  try {
    const bookings = getBookings();
    bookings.push(newBooking);
    const filePath = path.join(process.cwd(), 'bookings.json');
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving booking:', error);
    return false;
  }
};

// Email configuration - validate environment variables
const getEmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.error('Email credentials not configured');
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const { service, date, time, name, phone, email, notes } = await request.json();

    // Validate required fields
    if (!service || !date || !time || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for double booking (same service, date, and time)
    const bookings = getBookings();
    const isAlreadyBooked = bookings.some(
      (booking: any) => 
        booking.service === service && 
        booking.date === date && 
        booking.time === time
    );

    if (isAlreadyBooked) {
      return NextResponse.json(
        {
          error: 'This service is already booked at the selected date and time. Please choose another time or service.',
        },
        { status: 409 }
      );
    }

    // Create booking object
    const bookingData = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      service,
      date,
      time,
      name,
      phone,
      email,
      notes: notes || '',
      bookedAt: new Date().toISOString()
    };

    // Save to JSON file
    const saveResult = saveBooking(bookingData);
    if (!saveResult) {
      return NextResponse.json(
        { error: 'Failed to save booking. Please try again.' },
        { status: 500 }
      );
    }

    // Send emails if configured
    const transporter = getEmailTransporter();
    if (transporter) {
      try {
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
                <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Phone:</strong> ${phone}</li>
              </ul>
              ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
              <p>We will contact you if there are any changes to your appointment.</p>
              <p>If you need to reschedule or have any questions, please contact us at ${
                process.env.CLINIC_PHONE || '+91 80055 86588'
              }.</p>
              <br>
              <p>Best regards,<br>Advika Physiotherapy Clinic Team</p>
            </div>
          `,
        };

        // Send notification email to clinic
        const clinicMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO,
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
                <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Reference ID:</strong> ${bookingData.id}</li>
              </ul>
              ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
              <p>Booking received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          `,
        };

        await Promise.all([
          transporter.sendMail(userMailOptions),
          transporter.sendMail(clinicMailOptions),
        ]);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        message: 'Booking created successfully.',
        bookingId: bookingData.id,
        ...(transporter ? { emailSent: true } : { emailSent: false })
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again later.' },
      { status: 500 }
    );
  }
}