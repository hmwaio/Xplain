import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || '',
});

export const sendOTPEmail = async (recipientEmail: string, otp: string) => {
  if (!process.env.SMTP_FROM) {
    throw new Error('SMTP_FROM not set in environment variables');
  }

  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.BREVO_FROM_NAME || 'XPlain Team',
        email: process.env.SMTP_FROM,
      },
      to: [{ email: recipientEmail }],
      subject: 'OTP for XPlain',
      htmlContent: `
        <h1>Verification Code for ${recipientEmail}</h1>
        <p>Your OTP is <strong>${otp}</strong></p>
        <p>This code will expire in 5 minutes.</p>
      `,
      textContent: `Your OTP for XPlain is: ${otp} (expires in 5 minutes)`,
    });

    console.log('Email sent successfully:', result);
    return result;
  } catch (error: any) {
    console.error('Brevo send email failed:', error?.message || error);
    throw error;
  }
};

/**
 * Test Brevo API connection
 */
export const testBrevoConnection = () => {
  if (!process.env.BREVO_API_KEY) {
    console.warn('BREVO_API_KEY not set — emails will fail');
  } else {
    console.log('BREVO API key is loaded and ready');
  }
};
