import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  getAllPosts,
  getPostById,
} from "../../services/posts/getPosts.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

/* GET /api/posts/:id (Single post detail) */
export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id as string);
    const userId = (req as any).user?.user_id;
    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }
    const post = await getPostById(postId, userId);
    res.status(OK).json({ post });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch post" });
    }
  }
};

/* GET /api/posts (Home feed - infinite scrolling) */
export const getAll = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const userId = (req as any).user?.user_id;
    const cursor =
      req.query.cursorId && req.query.cursorDate
        ? {
            id: parseInt(req.query.cursorId as string),
            created_at: new Date(req.query.cursorDate as string),
          }
        : undefined;
    const result = await getAllPosts(cursor, limit, userId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch post" });
    }
  }
};
