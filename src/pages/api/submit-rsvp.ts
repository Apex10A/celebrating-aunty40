import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    numberOfGuests,
    dietaryRestrictions,
    message,
    attending
  } = req.body;

  try {
    // Store RSVP in database
    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        email,
        phone,
        numberOfGuests,
        dietaryRestrictions,
        message,
        attending,
      }
    });

    // Send confirmation email
    // await sendEmail({
    //   to: email,
    //   subject: 'Thank you for your RSVP',
    //   text: `Dear ${name},\n\nThank you for your RSVP to our celebration.\n\n${
    //     attending
    //       ? 'We look forward to seeing you!'
    //       : 'We will miss you, but thank you for letting us know.'
    //   }\n\nBest regards,\nFunmbi & Tope`
    // });

    // Notify event organizers
    // await sendEmail({
    //   to: process.env.ORGANIZER_EMAIL,
    //   subject: 'New RSVP Received',
    //   text: `New RSVP from ${name}\nEmail: ${email}\nAttending: ${attending}\nGuests: ${numberOfGuests}`
    // });

    return res.status(200).json({
      status: 'success',
      message: 'RSVP submitted successfully',
      data: rsvp
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error submitting RSVP'
    });
  }
} 