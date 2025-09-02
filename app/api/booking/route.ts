import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Booking {
  _id?: ObjectId;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  bookedAt: Date;
}


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
    const { service, date, time, name, phone, email, notes } = await request.json();

    if (!service || !date || !time || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(); 

    const existingBooking = await db
      .collection('bookings')
      .findOne({ service, date, time });

    if (existingBooking) {
      return NextResponse.json(
        {
          error: 'This service is already booked at the selected date and time. Please choose another time or service.',
        },
        { status: 409 }
      );
    }


    const bookingData: Booking = {
      service,
      date,
      time,
      name,
      phone,
      email,
      notes: notes || '',
      bookedAt: new Date()
    };

    const result = await db
      .collection('bookings')
      .insertOne(bookingData);

    if (!result.acknowledged) {
      console.error('Failed to save booking to database');
      return NextResponse.json(
        { error: 'Failed to save booking. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Booking saved successfully with ID:', result.insertedId);

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
                <li><strong>Reference ID:</strong> ${result.insertedId.toString()}</li>
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
                <li><strong>Reference ID:</strong> ${result.insertedId.toString()}</li>
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
        bookingId: result.insertedId
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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const bookings = await db
      .collection('bookings')
      .find({})
      .sort({ bookedAt: -1 })
      .toArray();
    
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