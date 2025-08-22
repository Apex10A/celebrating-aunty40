# 🚀 Quick Start Guide

## ✅ What's Already Done
- ✅ Cloudinary is already configured in your project
- ✅ All RSVP system code is implemented
- ✅ Photo upload uses Cloudinary (no Firebase Storage needed)
- ✅ Email system is ready

## 🔧 What You Need to Set Up

### 1. Firebase (FREE - Firestore only)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (free tier is enough)
3. Enable **Firestore Database** (production mode)
4. Get your config from Project Settings > General > Your apps

### 2. Update Your .env File
Add these to your existing `.env` file:

```env
# Firebase Configuration (FREE - no billing required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ORGANIZER_EMAIL=organizer@example.com

# Admin Password
ADMIN_PASSWORD=your_secure_password
```

### 3. Gmail App Password Setup
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account > Security > 2-Step Verification > App passwords
3. Generate password for "Mail"
4. Use this 16-character password in EMAIL_PASS

### 4. Firebase Rules
In Firebase Console > Firestore Database > Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      allow read, write: if true;
    }
  }
}
```

## 🎯 Test Your Setup

1. **Start the app**:
   ```bash
   npm run dev
   ```

2. **Test RSVP**: Go to `http://localhost:3000/rsvp`
3. **Test Admin**: Go to `http://localhost:3000/admin`
4. **Test Verification**: Go to `http://localhost:3000/verify`

## 🎉 You're Ready!

Once you've added the Firebase config to your `.env` file, everything should work perfectly:

- ✅ Guests can RSVP with photos
- ✅ Unique codes are generated
- ✅ Emails are sent automatically
- ✅ Admin dashboard shows all data
- ✅ Guest verification works at the event

## 🆘 Need Help?

If you get stuck:
1. Check browser console for errors
2. Verify all environment variables are set
3. Make sure Firebase rules are published
4. Test email delivery (check spam folder)

**The system is production-ready and uses your existing Cloudinary setup!**