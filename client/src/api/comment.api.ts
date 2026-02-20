import apiClient from "./client.api";

export const commentAPI = {
  // Get post comments
  getComments: (postId: number, params?: { limit?: number; cursorId?: number; cursorDate?: string }) =>
    apiClient.get(`/posts/${postId}/comments`, { params }),

  // Add comment
  addComment: (postId: number, content: string) =>
    apiClient.post(`/posts/${postId}/comments`, { content }),

  // Delete comment
  deleteComment: (commentId: number) =>
    apiClient.delete(`/comments/${commentId}`),
};