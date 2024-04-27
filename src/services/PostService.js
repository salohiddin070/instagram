import { axiosInstance } from "./axiosInstance";

export const PostService = {
  getAllPost: async function () {
    const res = await axiosInstance.get("/post");
    return res.data;
  },
  getCurrentUserPosts: async function () {
    const res = await axiosInstance.get("/my", {
      headers: { access_token: localStorage.getItem("token") },
    });
    return res.data;
  },
  createPost: async function (data) {
    const res = await axiosInstance.post("/post", data)
    return res.data;
  },
  deletePost: async function (id) {
    const res = await axiosInstance.delete(`/post/${id}`)
    return res.data;
  },
  getOnePostById: async function (id) {
    const res = await axiosInstance.get(`/post/${id}`);
    return res.data;
  },
  updatePost: async function (id, formdata) {
    const res = await axiosInstance.put(`/post/${id}`, formdata)
    return res.data;
  },
  searchPost: async function (title) {
    const res = await axiosInstance.get(`/search?title=${title}`)
    return res.data;
  },
};
