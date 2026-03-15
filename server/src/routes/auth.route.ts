import { Router } from "express";
import { send, verify, signup } from "../controllers/auth/signup.controller.js";
import { signin } from "../controllers/auth/signin.controller.js";
import { signout } from "../controllers/auth/signout.controller.js";
import { forgotPass, resetOTP, resetPass } from "../controllers/auth/forgot.controller.js";
import { otpPerDayLimiter, otpPerHourLimiter, otpPerMinuteLimiter, otpVerifyLimiter } from "../middleware/rateLimiter/timer.middleware.js";
import { validate } from "../middleware/validate.js";
import { completeRegistrationSchema, resetPasswordSchema, sendOtpSchema, signInSchema, verifyOtpSchema } from "../types/type.js";

const router = Router();

/* SignUp */
router.post("/send-otp", validate(sendOtpSchema), otpPerMinuteLimiter, otpPerHourLimiter, otpPerDayLimiter, send);
router.post("/resend-otp", validate(sendOtpSchema), otpPerMinuteLimiter, otpPerHourLimiter, otpPerDayLimiter, send)
router.post("/verify-otp", validate(verifyOtpSchema), otpVerifyLimiter, verify);
router.post("/registration", validate(completeRegistrationSchema), signup);

/* SignIn */
router.post("/login", validate(signInSchema), signin);

/* SignOut */
router.post("/logout", signout);

/* ForgotPassword */
router.post("/forgot-password", otpPerMinuteLimiter, otpPerHourLimiter, otpPerDayLimiter, forgotPass);
router.post("/verify-reset-otp", validate(verifyOtpSchema), otpVerifyLimiter, resetOTP);
router.post("/reset-password", validate(resetPasswordSchema), resetPass);

export default router;