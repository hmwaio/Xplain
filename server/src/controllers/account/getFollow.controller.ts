import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  getFollowCounts,
  getFollowers,
  getFollowing,
} from "../../services/account/getFollow.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const getFollowersList = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (isNaN(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid user ID" });
    }
    const followers = await getFollowers(userId);
    res.status(OK).json({ followers });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch followers" });
  }
};

export const getFollowingList = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (isNaN(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid user ID" });
    }
    const following = await getFollowing(userId);
    res.status(OK).json({ following });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch following" });
  }
};

export const getCounts = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const counts = await getFollowCounts(userId);
    res.status(OK).json({ counts });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch counts" });
  }
};
