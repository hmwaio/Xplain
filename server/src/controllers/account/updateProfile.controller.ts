import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  deleteProfilePicture,
  updateProfile,
} from "../../services/account/updateProfile.service.js";

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
