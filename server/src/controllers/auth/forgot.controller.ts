import type { Request, Response } from "express";
import { forgotPassword, verifyResetOTP, resetPassword } from "../../services/auth/forgot.auth.js";
import { resetPasswordSchema, sendOtpSchema, verifyOtpSchema } from "../../types/type.js";
import { sendOTPEmail } from "../../services/email/email.service.js";

export const forgotPass = async (req: Request, res: Response) => {
  try {
    const data = sendOtpSchema.parse(req.body);
    const { otp, email } = await forgotPassword(data);

    // TODO: Send OTP via Brevo here
    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "OTP sent to your email",
      email: email, // Echo back for frontend confirmation
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const resetOTP = async (req: Request, res: Response) => {
  try {
    const data = verifyOtpSchema.parse(req.body);
    const { tempToken } = await verifyResetOTP(data);

    res.status(200).json({
      message: "OTP verified successfully",
      tempToken: tempToken, // Frontend stores this for Step 3
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const resetPass = async (req: Request, res: Response) => {
  try {
    // validate inputs
    const data = resetPasswordSchema.parse(req.body);
    const tempToken = req.headers.authorization?.split(" ")[1];

    if (!tempToken) {
      return res.status(401).json({ error: "No session token" });
    }
    const { message } = await resetPassword(data, tempToken);

    res.status(200).json({
      message: message,
    });

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
