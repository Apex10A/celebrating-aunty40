import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import nodemailer from 'nodemailer';

// Generate unique guest code
export function generateGuestCode(): string {
  return 'EVT-' + Math.floor(10000 + Math.random() * 90000);
}

// Check if guest code already exists
export async function isCodeUnique(code: string): Promise<boolean> {
  const q = query(collection(db, 'rsvps'), where('guestCode', '==', code));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

// Generate unique guest code (ensures uniqueness)
export async function generateUniqueGuestCode(): Promise<string> {
  let code: string;
  let isUnique = false;
  
  do {
    code = generateGuestCode();
    isUnique = await isCodeUnique(code);
  } while (!isUnique);
  
  return code;
}

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
});

// Send confirmation email to guest
export async function sendConfirmationEmail(
  email: string,
  name: string,
  guestCode: string,
  attending: boolean
) {
  const subject = attending 
    ? '🎉 RSVP Confirmed - Your Guest Code Inside!'
    : 'Thank you for your RSVP';

  const htmlContent = attending ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a1a); color: #ffffff; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #FFD700; font-size: 28px; margin-bottom: 10px;">🎉 You're Confirmed!</h1>
        <div style="height: 2px; width: 100px; background: #FFD700; margin: 0 auto;"></div>
      </div>
      
      <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-radius: 8px; border: 1px solid #FFD700; margin-bottom: 20px;">
        <h2 style="color: #FFD700; text-align: center; margin-bottom: 15px;">Your Guest Code</h2>
        <div style="background: #FFD700; color: #000000; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
          ${guestCode}
        </div>
        <p style="text-align: center; margin-top: 10px; color: #FFD700; font-size: 14px;">
          ⚠️ Please save this code - you'll need it to access the event!
        </p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #FFD700;">Dear ${name},</h3>
        <p>Thank you for confirming your attendance at our double celebration! We're absolutely thrilled that you'll be joining us for this special milestone.</p>
        
        <h4 style="color: #FFD700; margin-top: 20px;">Event Details:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Event:</strong> Funmbi's 40th Birthday & 15th Wedding Anniversary</li>
          <li><strong>Date:</strong> [Event Date]</li>
          <li><strong>Time:</strong> [Event Time]</li>
          <li><strong>Venue:</strong> [Event Venue]</li>
        </ul>
        
        <div style="background: rgba(255, 215, 0, 0.1); padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="color: #FFD700; margin-top: 0;">Important Reminders:</h4>
          <ul style="margin: 0;">
            <li>Bring your guest code: <strong>${guestCode}</strong></li>
            <li>Dress code: [Dress Code]</li>
            <li>Contact us if you have any questions</li>
          </ul>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #FFD700;">
        <p style="color: #FFD700;">Can't wait to celebrate with you!</p>
        <p><strong>Funmbi & Tope</strong></p>
      </div>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a1a); color: #ffffff; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #FFD700; font-size: 28px; margin-bottom: 10px;">💝 Thank You</h1>
        <div style="height: 2px; width: 100px; background: #FFD700; margin: 0 auto;"></div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #FFD700;">Dear ${name},</h3>
        <p>Thank you for letting us know that you won't be able to join our celebration. We completely understand and appreciate you taking the time to respond.</p>
        <p>We'll miss having you there, but we hope to celebrate with you soon in another way!</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #FFD700;">
        <p style="color: #FFD700;">With love and understanding,</p>
        <p><strong>Funmbi & Tope</strong></p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}

// Send notification email to organizers
export async function sendOrganizerNotification(rsvpData: any) {
  const subject = `New RSVP: ${rsvpData.name} - ${rsvpData.attending ? 'Attending' : 'Not Attending'}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>New RSVP Received</h2>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p><strong>Name:</strong> ${rsvpData.name}</p>
        <p><strong>Email:</strong> ${rsvpData.email}</p>
        <p><strong>Phone:</strong> ${rsvpData.phone || 'Not provided'}</p>
        <p><strong>Attending:</strong> ${rsvpData.attending ? 'Yes' : 'No'}</p>
        ${rsvpData.attending ? `
          <p><strong>Number of Guests:</strong> ${rsvpData.numberOfGuests}</p>
          <p><strong>Guest Code:</strong> ${rsvpData.guestCode}</p>
          <p><strong>Has Driver:</strong> ${rsvpData.hasDriver ? 'Yes' : 'No'}</p>
          <p><strong>Dietary Restrictions:</strong> ${rsvpData.dietaryRestrictions || 'None'}</p>
        ` : ''}
        <p><strong>Message:</strong> ${rsvpData.message || 'None'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ORGANIZER_EMAIL,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Organizer notification sent successfully');
  } catch (error) {
    console.error('Error sending organizer notification:', error);
  }
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as Nigerian number if it starts with 0
  if (cleaned.startsWith('0')) {
    return '+234' + cleaned.substring(1);
  }
  
  // If it already starts with 234, add +
  if (cleaned.startsWith('234')) {
    return '+' + cleaned;
  }
  
  // Otherwise return as is
  return phone;
}