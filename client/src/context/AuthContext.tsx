import { createContext } from "react";
import type { LoginInputType, SignupInputType,  } from "../types/auth.types.js";
import type { User } from "../types/user.types.js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginInputType) => Promise<void>;
  signup: (data: SignupInputType, tempToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
