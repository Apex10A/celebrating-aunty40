import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { 
  generateUniqueGuestCode, 
  sendConfirmationEmail, 
  sendOrganizerNotification,
  formatPhoneNumber 
} from '../../../lib/utils';

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
    attending,
    hasDriver,
    photoUrls = []
  } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ 
      status: 'error',
      message: 'Name and email are required' 
    });
  }

  try {
    // Check if email already exists
    const existingRSVPQuery = query(
      collection(db, 'rsvps'), 
      where('email', '==', email.toLowerCase())
    );
    const existingRSVPs = await getDocs(existingRSVPQuery);
    
    if (!existingRSVPs.empty) {
      return res.status(400).json({
        status: 'error',
        message: 'An RSVP with this email already exists. Please contact us if you need to make changes.'
      });
    }

    // Generate unique guest code for attending guests
    const guestCode = attending ? await generateUniqueGuestCode() : null;

    // Prepare RSVP data
    const rsvpData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? formatPhoneNumber(phone.trim()) : null,
      numberOfGuests: attending ? parseInt(numberOfGuests) : 0,
      dietaryRestrictions: dietaryRestrictions?.trim() || null,
      message: message?.trim() || null,
      attending,
      hasDriver: attending ? hasDriver : false,
      guestCode,
      photoUrls: photoUrls || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store RSVP in Firestore
    const docRef = await addDoc(collection(db, 'rsvps'), rsvpData);

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, name, guestCode || '', attending);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the RSVP if email fails
    }

    // Send notification to organizers
    try {
      await sendOrganizerNotification({
        ...rsvpData,
        id: docRef.id
      });
    } catch (notificationError) {
      console.error('Error sending organizer notification:', notificationError);
      // Don't fail the RSVP if notification fails
    }

    return res.status(200).json({
      status: 'success',
      message: 'RSVP submitted successfully',
      guestCode: guestCode,
      data: {
        id: docRef.id,
        ...rsvpData
      }
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error submitting RSVP. Please try again.'
    });
  }
} 