import apiClient from "./client.api";

export const commentAPI = {
  // Get post comments
  getComments: (postId: number, params?: { limit?: number; cursorId?: number; cursorDate?: string }) =>
    apiClient.get(`/post/${postId}/comments`, { params }),

  // Add comment
  addComment: (postId: number, content: string) =>
    apiClient.post(`/post/${postId}/comment`, { content }),

  // Delete comment
  deleteComment: (commentId: number) =>
    apiClient.delete(`/post/comment/${commentId}`),
};