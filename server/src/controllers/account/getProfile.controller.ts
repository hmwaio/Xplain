import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  getOwnDraftPosts,
  getOwnProfile,
  getOwnPublishedPosts,
} from "../../services/account/getProfile.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

const parseCursor = (req: Request) => {
  return req.query.cursorId && req.query.cursorDate
    ? {
        id: parseInt(req.query.cursorId as string),
        created_at: new Date(req.query.cursorDate as string),
      }
    : undefined;
};

/* GET /api/users/me - Own profile (private) */
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const limit = parseInt(req.query.limit as string) || 20;
    const cursor = parseCursor(req);

    const profile = await getOwnProfile(userId, cursor, limit);
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

/* GET /api/users/me/posts/published */
export const getMyPublishedPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const limit = parseInt(req.query.limit as string) || 20;
    const cursor = parseCursor(req);

    const result = await getOwnPublishedPosts(userId, cursor, limit);
    res.status(OK).json(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch posts" });
  }
};

/* GET /api/users/me/posts/drafts */
export const getMyDraftPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const limit = parseInt(req.query.limit as string) || 20;
    const cursor = parseCursor(req);

    const result = await getOwnDraftPosts(userId, cursor, limit);
    res.status(OK).json(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch drafts" });
  }
};
