import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { guestCode } = req.body;

  if (!guestCode) {
    return res.status(400).json({ 
      status: 'error',
      message: 'Guest code is required' 
    });
  }

  try {
    // Search for RSVP with the provided guest code
    const q = query(
      collection(db, 'rsvps'), 
      where('guestCode', '==', guestCode.toUpperCase())
    );
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid guest code. Please check your code and try again.'
      });
    }

    const rsvpDoc = querySnapshot.docs[0];
    const rsvpData = rsvpDoc.data();

    // Check if the guest is actually attending
    if (!rsvpData.attending) {
      return res.status(400).json({
        status: 'error',
        message: 'This guest code belongs to someone who is not attending.'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Valid guest code',
      guest: {
        id: rsvpDoc.id,
        name: rsvpData.name,
        email: rsvpData.email,
        numberOfGuests: rsvpData.numberOfGuests,
        hasDriver: rsvpData.hasDriver,
        dietaryRestrictions: rsvpData.dietaryRestrictions,
        guestCode: rsvpData.guestCode
      }
    });
  } catch (error) {
    console.error('Error verifying guest code:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error verifying guest code'
    });
  }
}