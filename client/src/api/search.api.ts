import apiClient from "./client.api";

export const searchAPI = {
  // Search posts
  searchPosts: (params: {
    q?: string;
    category?: string;
    tag?: string;
    author?: string;
    page?: number;
    limit?: number;
  }) => {
    return apiClient.get("/search/posts", { params });
  },

  // Search users
  searchUsers: (query: string, page?: number, limit?: number) => {
    return apiClient.get("/search/users", { params: { q: query, page, limit } });
  },
};
