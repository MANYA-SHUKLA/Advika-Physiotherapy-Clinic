import { NextRequest, NextResponse } from 'next/server';

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

    // For Vercel deployment, we'll just log the booking
    // In production, you would set up a proper email service
    console.log('New Booking Received:', {
      service,
      date,
      time,
      name,
      phone,
      email,
      notes
    });

    // In a real implementation, you would send emails here
    // For now, we'll just return a success response
    return NextResponse.json({ 
      message: 'Booking created successfully. Our team will contact you shortly.' 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}