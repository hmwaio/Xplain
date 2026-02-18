import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { getUserProfile } from "../../services/account/readProfile.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

/* GET /api/users/:id/profile - Public profile */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id as string);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Get viewer ID if authenticated
    const viewerId = (req as any).user?.user_id;

    const limit = parseInt(req.query.limit as string) || 20;
    const cursor =
      req.query.cursorId && req.query.cursorDate
        ? {
            id: parseInt(req.query.cursorId as string),
            created_at: new Date(req.query.cursorDate as string),
          }
        : undefined;

    const profile = await getUserProfile(userId, viewerId, cursor, limit);
    res.status(OK).json(profile);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch profile" });
    }
  }
};
