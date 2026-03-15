import apiClient from "./client.api";

export const postAPI = {
  getHomeFeed: (params?: {
    limit?: number;
    cursorId?: number;
    cursorDate?: string;
  }) => {
    return apiClient.get("/posts", { params });
  },

  // Get single post
  getPost: (id: number) => {
    return apiClient.get(`/post/${id}`);
  },

  // Create post
  createPost: (data: unknown) => {
    return apiClient.post("/new-post", data);
  },

  // Update post
  updatePost: (id: number, data: unknown) => {
    return apiClient.patch(`/post/${id}/edit`, data);
  },

  // draft upload
  publishPost: (id: number) => {
    return apiClient.patch(`/post/${id}/edit`, {
      status: "published",
    });
  },

  // Delete post
  deletePost: (id: number) => {
    return apiClient.delete(`/post/${id}/delete`);
  },

  // Like post
  likePost: (postId: number) => {
    return apiClient.post(`/post/${postId}/like`);
  },

  // Unlike post
  unlikePost: (postId: number) => {
    return apiClient.delete(`/post/${postId}/like`);
  },

  // Save post
  savePost: (postId: number) => {
    return apiClient.post(`/post/${postId}/save`);
  },

  // Unsave post
  unsavePost: (postId: number) => {
    return apiClient.delete(`/post/${postId}/save`);
  },

  // Get saved posts
  getSavedPosts: (params?: {
    limit?: number;
    cursorId?: number;
    cursorDate?: string;
  }) => {
    return apiClient.get("/saved-posts", { params });
  },
};
