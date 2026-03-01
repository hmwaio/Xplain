import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  changeEmail,
  changePassword,
  confirmEmailChange,
  deleteProfilePicture,
  updateProfile,
} from "../../services/account/updateProfile.service.js";
import { sendOTPEmail } from "../../services/email/email.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

/* PATCH /api/users/profile - Update own profile */
export const update = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const result = await updateProfile(userId, req.body);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update profile" });
    }
  }
};

/* DELETE /api/users/profile/picture/:type */
export const deletePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const type = req.params.type as "profile" | "cover";

    if (type !== "profile" && type !== "cover") {
      return res.status(BAD_REQUEST).json({ error: "Invalid picture type" });
    }

    const result = await deleteProfilePicture(userId, type);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete picture" });
    }
  }
};

/* PATCH /api/users/change-password */
export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const { currentPassword, newPassword } = req.body;

    const result = await changePassword(userId, currentPassword, newPassword);

    return res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(BAD_REQUEST).json({ error: error.message });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to change password" });
  }
};


export const requestEmailController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.user_id;
    const { newEmail, password } = req.body;

    const result = await changeEmail(userId, newEmail, password);

    // 🔥 SEND OTP EMAIL HERE
    await sendOTPEmail(result.email, result.otp);

    return res.status(OK).json({
      message: "OTP sent to new email",
      email: result.email, // optional, useful for frontend
    });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(BAD_REQUEST).json({ error: error.message });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to send OTP" });
  }
};

export const confirmEmailController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const { email, otp } = req.body;

    const result = await confirmEmailChange(
      userId,
      email,
      otp
    );

    return res.status(200).json(result);

  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Verification failed"
    });
  }
};
