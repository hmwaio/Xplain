import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  followUser,
  unfollowUser,
} from "../../services/account/follow.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const follow = async (req: Request, res: Response) => {
  try {
    const followingId = parseInt(req.params.userId as string);
    const followerId = (req as any).user.user_id;

    if (isNaN(followingId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid following ID" });
    }

    const result = await followUser(followerId, followingId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to follow user" });
    }
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const followingId = parseInt(req.params.userId as string);
    const followerId = (req as any).user.user_id;

    if (isNaN(followingId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid following ID" });
    }

    const result = await unfollowUser(followerId, followingId);
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to unfollow user" });
    }
  }
};
