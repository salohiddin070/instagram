import { axiosInstance } from "./axiosInstance";

export const CommentService = {
  addComment: async function (data) {
    const res = await axiosInstance.post("/comment", data)
    return res.data;
  },
  deleteComment: async function (id) {
    const res = await axiosInstance.delete(`/comment/${id}`)
    return res.data;
  },
  updateComment: async function (id, data) {
    const res = await axiosInstance.put(`/comment/${id}`, data)
    return res.data;
  },
};
