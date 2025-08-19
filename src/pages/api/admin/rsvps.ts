import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simple authentication check - you can enhance this
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    // For now, we'll skip authentication in development
    // In production, you should implement proper authentication
    console.log('Admin access - consider implementing proper authentication');
  }

  try {
    // Fetch all RSVPs from Firestore, ordered by creation date (newest first)
    const rsvpsQuery = query(
      collection(db, 'rsvps'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(rsvpsQuery);
    const rsvps = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
      status: 'success',
      rsvps,
      count: rsvps.length
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching RSVPs'
    });
  }
}