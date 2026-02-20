import apiClient from './client.api';


export const postAPI = {
  getHomeFeed: (params?: { limit?: number; cursorId?: number; cursorDate?: string }) => {
    apiClient.get("/posts", { params })
  },

  // Get single post
  getPost: (id: number) => {
    apiClient.get(`/posts/${id}`)
  },

  // Create post
  createPost: (data: unknown) => {
    apiClient.post("/posts", data)
  },

  // Update post
  updatePost: (id: number, data: unknown) => {
    apiClient.patch(`/posts/${id}`, data)
  },

  // Delete post
  deletePost: (id: number) => {
    apiClient.delete(`/posts/${id}`)
  },

  // Like post
  likePost: (postId: number) => {
    apiClient.post(`/posts/${postId}/like`)
  },

  // Unlike post
  unlikePost: (postId: number) => {
    apiClient.delete(`/posts/${postId}/like`)
  },

  // Save post
  savePost: (postId: number) => {
    apiClient.post(`/posts/${postId}/save`)
  },

  // Unsave post
  unsavePost: (postId: number) => {
    apiClient.delete(`/posts/${postId}/save`)
  },

  // Get saved posts
  getSavedPosts: (params?: { limit?: number; cursorId?: number; cursorDate?: string }) => {
    apiClient.get("/saved-posts", { params })
  }
}