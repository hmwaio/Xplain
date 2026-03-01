import apiClient from "./client.api";

export const userAPI = {
  // Get own profile
  getMyProfile: (params?: {
    limit?: number;
    cursorId?: number;
    cursorDate?: string;
  }) => {
    return apiClient.get("/users/me", { params });
  },

  // Get public profile
  getUserProfile: (
    userId: number,
    params?: { limit?: number; cursorId?: number; cursorDate?: string },
  ) => {
    return apiClient.get(`/users/${userId}`, { params });
  },

  // Update profile
  updateProfile: (data: unknown) => {
    return apiClient.patch("/users/me", data);
  },

  changeEmailRequest: (data: { newEmail: string; password: string }) => {
    return apiClient.post("/users/me/account/change-email/request", data);
  },

  changeEmailVerify: (data: { email: string; otp: string }) => {
    return apiClient.post("/users/me/account/change-email/verify", data);
  },

  changePassword: (data: { currentPassword: string; newPassword: string }) => {
    return apiClient.patch("/users/me/account/change-password", data);
  },

  // Delete account
  deleteAccount: (password: string) => {
    return apiClient.delete("/users/me/account", { data: { password } });
  },

  deleteProfilePicture: (type: "profile" | "cover") => {
    return apiClient.delete(`/users/me/picture/${type}`);
  },

  // Follow user
  followUser: (userId: number) => {
    return apiClient.post(`/users/${userId}/follow`);
  },

  // Unfollow user
  unfollowUser: (userId: number) => {
    return apiClient.delete(`/users/${userId}/follow`);
  },

  // Get followers
  getFollowers: (userId: number) => {
    return apiClient.get(`/users/${userId}/followers`);
  },

  // Get following
  getFollowing: (userId: number) => {
    return apiClient.get(`/users/${userId}/following`);
  },
};
