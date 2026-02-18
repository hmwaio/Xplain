import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { updatePost } from "../../services/posts/updatePost.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const update = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id as string);

    if (isNaN(postId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid post ID" });
    }

    const authorId = (req as any).user.user_id;
    const data = req.body;
    const post = await updatePost(postId, authorId, data);
    res.status(OK).json({ message: "Post updated successfully", post });
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
