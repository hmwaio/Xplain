import jwt from 'jsonwebtoken';
import type { UserTokenPayLoad } from "../types/type.js";

const JWT_SECRET = process.env.JWT_SECRET || "";
const TEMP_TOKEN_SECRET = process.env.TEMP_TOKEN_SECRET || "";

export const signToken = (payload: UserTokenPayLoad): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
};

export const verifyToken = (token: string): UserTokenPayLoad | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayLoad;
    return decoded;
  } catch (error) {
    return null;
  }
}
