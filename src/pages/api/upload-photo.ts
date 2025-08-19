import type { NextApiRequest, NextApiResponse } from 'next';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../lib/firebase';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        return mimetype && mimetype.includes('image');
      },
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ 
        status: 'error',
        message: 'No file uploaded' 
      });
    }

    // Read file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.originalFilename?.split('.').pop() || 'jpg';
    const fileName = `rsvp-photos/${timestamp}-${randomString}.${fileExtension}`;

    // Upload to Firebase Storage
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: file.mimetype || 'image/jpeg',
    });

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      status: 'success',
      url: downloadURL,
      fileName: fileName
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error uploading photo'
    });
  }
}