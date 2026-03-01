import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  getSavedPosts,
  savePost,
  unsavePost,
} from "../../services/posts/save.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

const parseCursor = (req: Request) => {
  return req.query.cursorId && req.query.cursorDate
    ? {
        id: parseInt(req.query.cursorId as string),
        created_at: new Date(req.query.cursorDate as string),
      }
    : undefined;
};

/* POST /api/post/:postId/save */
export const save = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId as string);
    const userId = (req as any).user.user_id;

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    const result = await savePost(postId, userId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to save post" });
    }
  }
};

/* DELETE /api/post/:postId/save */
export const unsave = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId as string);
    const userId = (req as any).user.user_id;

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    const result = await unsavePost(postId, userId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to remove post" });
    }
  }
};

/* GET /api/saved-posts (infinite scroll) */
export const getMySaved = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const limit = parseInt(req.query.limit as string) || 20;
    const cursor = parseCursor(req);

    const result = await getSavedPosts(userId, cursor, limit);
    res.status(OK).json({ result });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch saved posts" });
  }
};
