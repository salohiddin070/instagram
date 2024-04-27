import { axiosInstance } from "./axiosInstance";

export const Reactions = {
  async like (id) {
    let res = await axiosInstance.get(`/like/${id}`)
    return res.data;
  },
   async dislike (id) {
    let res = await axiosInstance.get(`/dislike/${id}`)
    return res.data;
  },
};
