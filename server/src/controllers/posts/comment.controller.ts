import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  addComment,
  deleteComment,
  getPostComments,
} from "../../services/posts/comment.service.js";

const { OK, CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

// Helper to parse cursor
const parseCursor = (req: Request) => {
  return req.query.cursorId && req.query.cursorDate
    ? {
        id: parseInt(req.query.cursorId as string),
        created_at: new Date(req.query.cursorDate as string),
      }
    : undefined;
};

/* POST /api/posts/:postId/comments */
export const add = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId as string);
    const userId = (req as any).user.user_id;
    const { content } = req.body;

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    if (!content || content.trim().length === 0) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Comment content required" });
    }

    const comment = await addComment(postId, userId, content);
    res.status(CREATED).json({ message: "Comment added", comment });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to add comment" });
    }
  }
};

/* DELETE /api/comments/:id */
export const remove = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.id as string);
    const userId = (req as any).user.user_id;

    if (isNaN(commentId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid comment ID" });
    }

    const result = await deleteComment(commentId, userId);
    res.status(201).json({ message: "Comment deleted", result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete comment" });
    }
  }
};

/* GET /api/posts/:postId/comments (infinite scroll) */
export const getAll = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId as string);
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = parseCursor(req);
    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }
    const result = await getPostComments(postId, cursor, limit);
    res.status(OK).json({ result });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch comments" });
  }
};
