import { useState, useCallback } from "react";
import type { LoginInput, OTPInput, SendOTPInput, SignupInput, User } from "../types/type.js";
import apiClient from '../api/client.js';



export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = useCallback(async (data: SendOTPInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/send-otp", data);
      setUser(response.data.user);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const otpinput = useCallback(async (data: OTPInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/verify-otp", data);
      setUser(response.data.user);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const registration = useCallback(async (data: SignupInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/registration", data);
      setUser(response.data.user);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* Signin */
  const signin = useCallback(async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/login", data);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* Signout */
  const signout = useCallback(async () => {
    setLoading(true);
    try {
      await apiClient.post("/auth/logout");
      setUser(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Logout failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, registration, otpinput, signup, signin, signout };
}

