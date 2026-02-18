import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { likePost, unlikePost } from "../../services/posts/like.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const like = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId as string);
    const userId = (req as any).user.user_id;

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    const result = await likePost(postId, userId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to like post" });
    }
  }
};

export const unlike = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId as string);
    const userId = (req as any).user.user_id;

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    const result = await unlikePost(postId, userId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to unlike post" });
    }
  }
};
