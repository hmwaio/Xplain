import apiClient from "./client.api";

export const userAPI = {
  // Get own profile
  getMyProfile: (params?: {
    limit?: number;
    cursorId?: number;
    cursorDate?: string;
  }) => apiClient.get("/users/me", { params }),

  // Get public profile
  getUserProfile: (
    userId: number,
    params?: { limit?: number; cursorId?: number; cursorDate?: string },
  ) => apiClient.get(`/users/${userId}`, { params }),

  // Update profile
  updateProfile: (data: unknown) => apiClient.patch("/users/profile", data),

  // Delete account
  deleteAccount: (password: string) =>
    apiClient.delete("/users/account", { data: { password } }),

  // Follow user
  followUser: (userId: number) => apiClient.post(`/users/${userId}/follow`),

  // Unfollow user
  unfollowUser: (userId: number) => apiClient.delete(`/users/${userId}/follow`),

  // Get followers
  getFollowers: (userId: number) => apiClient.get(`/users/${userId}/followers`),

  // Get following
  getFollowing: (userId: number) => apiClient.get(`/users/${userId}/following`),
};
