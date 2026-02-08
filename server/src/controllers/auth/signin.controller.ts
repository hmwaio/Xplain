import type { Request, Response } from "express";
import { signInSchema } from "../../types/type.js";
import { signinUser } from "../../services/auth/signin.auth.js";


export const signin = async (req: Request, res: Response) => {
  try {
    const data = signInSchema.parse(req.body);

    const { user, token } = await signinUser(data)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // send response
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        user_id: user.user_id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    if (error instanceof Error) { res.status(401).json({ error: error.message }); }
    else { res.status(500).json({ error: "Internal server error" }); }
  }
}