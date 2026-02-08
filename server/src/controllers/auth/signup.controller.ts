import type { Request, Response } from "express";
import { completeRegistrationSchema, sendOtpSchema, verifyOtpSchema } from "../../types/type.js";
import { CompleteRegistration } from "../../services/auth/registration.auth.js";
import { verifyOTP } from "../../services/auth/verifyotp.auth.js";
import { signupUser } from "../../services/auth/signup.auth.js";
import { sendOTPEmail } from "../../services/email/email.service.js";


export const send = async (req: Request, res: Response) => {
  try {
    const data = sendOtpSchema.parse(req.body);
    const { otp, email } = await signupUser(data);

    // TODO: Send OTP via Brevo here
    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "OTP sent to your email",
      email: email  // Echo back for frontend confirmation
    });

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export const verify = async (req: Request, res: Response) => {
  try {
    const data = verifyOtpSchema.parse(req.body);
    const { tempToken } = await verifyOTP(data);

    res.status(200).json({
      message: "OTP verified successfully",
      tempToken: tempToken      // Frontend stores this for Step 3
    });
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}



export const signup = async (req: Request, res: Response) => {
  try {
    // validate inputs
    const data = completeRegistrationSchema.parse(req.body);
    const tempToken = req.headers.authorization?.split(' ')[1];

    if (!tempToken) {
      return res.status(401).json({ error: "No session token" });
    }

    const { user, token } = await CompleteRegistration(data, tempToken);

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // send response
    res.status(201).json({
      message: "Account created successfully",
      user: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
