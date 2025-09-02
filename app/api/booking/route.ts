import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { dbConnect, Booking } from '../../../lib/mongoose'; // Adjust the path as needed

// Helper function to create a transporter for sending emails
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    const { service, date, time, name, phone, email, notes } = await request.json();

    // Validate required fields
    if (!service || !date || !time || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for double booking using the database
    const isAlreadyBooked = await Booking.findOne({ service, date, time });

    if (isAlreadyBooked) {
      return NextResponse.json(
        {
          error: 'This service is already booked at the selected date and time. Please choose another time or service.',
        },
        { status: 409 }
      );
    }

    // Create a new booking object
    const bookingData = {
      service,
      date,
      time,
      name,
      phone,
      email,
      notes: notes || '',
    };

    // Save the new booking to the database
    const newBooking = await Booking.create(bookingData);

    // Send confirmation emails
    const transporter = createTransporter();
    
    if (transporter && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const userMailOptions = {
          from: `"Advika Physiotherapy Clinic" <${process.env.EMAIL_USER}>`,
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
                <li><strong>Reference ID:</strong> ${newBooking._id}</li>
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

        const clinicMailOptions = {
          from: `"Advika Physiotherapy Clinic" <${process.env.EMAIL_USER}>`,
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
                <li><strong>Reference ID:</strong> ${newBooking._id}</li>
              </ul>
              ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
              <p>Booking received at: ${new Date().toLocaleString()}</p>
            </div>
          `,
        };

        await Promise.all([
          transporter.sendMail(userMailOptions),
          transporter.sendMail(clinicMailOptions),
        ]);
        
        console.log('Confirmation emails sent successfully');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    } else {
      console.warn('Email not configured, skipping email notification');
    }

    return NextResponse.json(
      {
        message: 'Booking created successfully. Confirmation email has been sent.',
        bookingId: newBooking._id
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

// Optional: Add a GET endpoint to check bookings for debugging
export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({});
    return NextResponse.json(
      { bookings, count: bookings.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve bookings' },
      { status: 500 }
    );
  }
}