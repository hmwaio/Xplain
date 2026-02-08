import type { Request, Response } from "express";


export const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.cookie("token", "");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}