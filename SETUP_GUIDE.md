# 🎉 Anniversary Event RSVP System Setup Guide

This guide will help you set up the complete RSVP system with Firebase Firestore, photo uploads, and unique guest codes.

## 🚀 Features Implemented

✅ **RSVP Form Submission** with unique guest codes  
✅ **Photo Upload** functionality using Firebase Storage  
✅ **Email Notifications** to guests and organizers  
✅ **Admin Dashboard** to manage RSVPs and view photos  
✅ **Guest Code Verification** system for event entry  

## 📋 Setup Steps

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Choose your region
4. Enable **Storage**:
   - Go to Storage
   - Get started with default rules
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Add web app if not exists
   - Copy the config object

### 2. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### 3. Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Add to `.env.local`:
   ```env
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ORGANIZER_EMAIL=organizer@example.com
   ```

### 4. Firebase Security Rules

Update your Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to rsvps collection
    match /rsvps/{document} {
      allow read, write: if true;
    }
  }
}
```

Update your Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /rsvp-photos/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### 5. Run the Application

```bash
npm run dev
```

## 📱 How to Use

### For Guests:

1. **RSVP Page** (`/rsvp`):
   - Fill out the form
   - Upload photos (optional)
   - Receive unique guest code via email

2. **Guest Code**:
   - Save the code from the email
   - Bring it to the event for entry verification

### For Event Staff:

1. **Verification Page** (`/verify`):
   - Enter guest codes to verify entry
   - See guest details and number of attendees

### For Organizers:

1. **Admin Dashboard** (`/admin`):
   - View all RSVPs
   - Export guest list to CSV
   - View uploaded photos
   - See event statistics

## 🔧 Customization

### Event Details
Update the email templates in `lib/utils.ts` with your event details:
- Event date and time
- Venue address
- Dress code
- Contact information

### Styling
The design uses a gold and black theme. You can customize colors in the Tailwind classes throughout the components.

### Email Templates
Modify the HTML email templates in `lib/utils.ts` to match your event branding.

## 📊 Data Structure

### RSVP Document (Firestore)
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+2348012345678",
  numberOfGuests: 2,
  dietaryRestrictions: "Vegetarian",
  message: "Excited to attend!",
  attending: true,
  hasDriver: false,
  guestCode: "EVT-48291",
  photoUrls: ["https://firebase.storage.../photo1.jpg"],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🚨 Security Notes

1. **Admin Dashboard**: Currently has basic authentication. For production, implement proper authentication.
2. **Firebase Rules**: The current rules allow public access. Tighten them based on your security needs.
3. **Environment Variables**: Never commit `.env.local` to version control.

## 🎯 Testing

1. Test RSVP submission with and without photos
2. Check email delivery (check spam folder)
3. Verify guest codes work on verification page
4. Test admin dashboard functionality
5. Try CSV export feature

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Check email credentials
4. Ensure all environment variables are set

## 🎉 You're Ready!

Your anniversary event RSVP system is now ready to use! Guests can RSVP with photos, receive unique codes, and you can manage everything from the admin dashboard.

**Important URLs:**
- RSVP Form: `http://localhost:3000/rsvp`
- Admin Dashboard: `http://localhost:3000/admin`
- Guest Verification: `http://localhost:3000/verify`