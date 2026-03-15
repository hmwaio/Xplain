import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { deletePost } from "../../services/posts/deletePost.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id as string);

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    const authorId = (req as any).user.user_id;
    const result = await deletePost(postId, authorId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update post" });
    }
  }
};
