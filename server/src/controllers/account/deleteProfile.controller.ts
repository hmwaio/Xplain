import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { deleteAccount } from "../../services/account/deleteAccount.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

/* DELETE /api/users/account - Delete account */
export const remove = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.user_id;
    const { password } = req.body;

    if (!password) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Password required to delete account" });
    }

    const result = await deleteAccount(userId, password);

    // Clear cookie
    res.clearCookie("token");
    res.status(OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete account" });
    }
  }
};
