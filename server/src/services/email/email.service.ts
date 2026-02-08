import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "OTP for Blog",
    html: `
      <h1>Verification Code for this ${email}</h1>
      <p>Your OTP: <strong>${otp}</strong></p>
      <p>Expires in 5 minutes.</p>
    `,
  });
};


export const testConnection = async () => {
  try {
    await transporter.verify();
    console.log("Brevo connection successful");
  } catch (error) {
    console.log("Brevo connection failed ", error)
  }
}