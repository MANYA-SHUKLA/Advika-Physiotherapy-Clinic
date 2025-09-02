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
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0c332d; padding: 20px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">Advika Physiotherapy Clinic</h1>
                <p style="margin: 5px 0 0; font-size: 14px; color: #d0f6ed;">Appointment Confirmed</p>
              </div>
              <div style="padding: 25px; background-color: #f9fdfa; color: #333;">
                <p style="font-size: 16px; line-height: 1.5;">Dear <strong>${name}</strong>,</p>
                <p style="font-size: 16px; line-height: 1.5;">Thank you for booking an appointment with us. We look forward to seeing you!</p>
                <div style="background-color: #e6f7f3; border-left: 4px solid #147a6c; padding: 15px; margin: 25px 0;">
                  <h3 style="margin: 0 0 10px; color: #147a6c;">Appointment Details:</h3>
                  <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 8px;"><strong>Service:</strong> ${service}</li>
                    <li style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
                    <li style="margin-bottom: 8px;"><strong>Time:</strong> ${time}</li>
                    <li style="margin-bottom: 8px;"><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Reference ID:</strong> ${result.insertedId.toString()}</li>
                  </ul>
                </div>
                ${notes ? `<p style="font-size: 14px; margin-top: 20px;"><strong>Additional Notes:</strong><br>${notes}</p>` : ''}
                <p style="font-size: 14px; margin-top: 20px; line-height: 1.5;">If you need to reschedule or have any questions, please contact us at <a href="tel:${process.env.CLINIC_PHONE || '+91 80055 86588'}" style="color: #0c332d; text-decoration: none;">${process.env.CLINIC_PHONE || '+91 80055 86588'}</a>.</p>
              </div>
              <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                <p style="margin: 0;">Advika Physiotherapy Clinic | D 008, Ajnara Integrity, Raj Nagar Extension, Ghaziabad</p>
                <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} Advika Physiotherapy Clinic. All rights reserved.</p>
              </div>
            </div>
          `,
        };

        const clinicMailOptions = {
          from: `"Advika Physiotherapy Clinic" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO,
          subject: 'New Appointment Booking - Advika Physiotherapy Clinic',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #147a6c; padding: 20px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">New Appointment Booking</h1>
                <p style="margin: 5px 0 0; font-size: 14px; color: #e6f7f3;">A new client has scheduled an appointment.</p>
              </div>
              <div style="padding: 25px; background-color: #f9fdfa; color: #333;">
                <h3 style="margin: 0 0 10px; color: #147a6c;">Client & Booking Details:</h3>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
                  <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
                  <li style="margin-bottom: 8px;"><strong>Phone:</strong> ${phone}</li>
                  <li style="margin-bottom: 8px;"><strong>Service:</strong> ${service}</li>
                  <li style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
                  <li style="margin-bottom: 8px;"><strong>Time:</strong> ${time}</li>
                  <li><strong>Reference ID:</strong> ${result.insertedId.toString()}</li>
                </ul>
                ${notes ? `<p style="font-size: 14px; margin-top: 20px;"><strong>Additional Notes:</strong><br>${notes}</p>` : ''}
              </div>
              <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                <p style="margin: 0;">Booking received at: ${new Date().toLocaleString()}</p>
              </div>
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