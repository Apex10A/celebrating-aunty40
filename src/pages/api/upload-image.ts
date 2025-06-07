import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'celebration-gallery',
      resource_type: 'auto',
    });

    // Store the image details in your database here
    // await prisma.image.create({
    //   data: {
    //     publicId: uploadResponse.public_id,
    //     url: uploadResponse.secure_url,
    //     width: uploadResponse.width,
    //     height: uploadResponse.height,
    //   }
    // });

    return res.status(200).json({
      status: 'success',
      data: {
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error uploading image'
    });
  }
} 