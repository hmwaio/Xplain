import { Router } from "express";
import { send, verify, signup } from "../controllers/auth/signup.controller.js";
import { signin } from "../controllers/auth/signin.controller.js";
import { signout } from "../controllers/auth/signout.controller.js";
import { forgotPass, resetOTP, resetPass } from "../controllers/auth/forgot.controller.js";
import { otpPerDayLimiter, otpPerHourLimiter, otpPerMinuteLimiter, otpVerifyLimiter } from "../middleware/rateLimiter/auth.middleware.js";

const router = Router();

/* SignUp */
router.post("/send-otp", otpPerMinuteLimiter, otpPerHourLimiter, otpPerDayLimiter, send);
router.post("/resend-otp", otpPerMinuteLimiter, otpPerHourLimiter, otpPerHourLimiter, send)
router.post("/verify-otp", otpVerifyLimiter, verify);
router.post("/registration", signup);

/* SignIn */
router.post("/login", signin);

/* SignOut */
router.post("/logout", signout);

/* ForgotPassword */
router.post("/forgot-password", otpPerMinuteLimiter, otpPerHourLimiter, otpPerDayLimiter, forgotPass);
router.post("/verify-reset-otp", otpVerifyLimiter, resetOTP);
router.post("/reset-password", resetPass);

export default router;