import { useEffect, useState, type ReactNode } from "react";
import { authAPI } from "../api/auth.api";
import type { LoginInputType, SignupInputType } from "../types/auth.types";
import type { User } from "../types/user.types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.profile);
    } catch (error) {
      setUser(null);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginInputType) => {
    await authAPI.login(data);
    const response = await authAPI.getMe();
    setUser(response.data.profile);
  };

  const signup = async (data: SignupInputType, tempToken: string) => {
    await authAPI.completeRegistration(data, tempToken); // server sets cookie
    const response = await authAPI.getMe();
    setUser(response.data.profile);
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
