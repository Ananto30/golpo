import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
  },
});

const Post = {
  getAll: () => api.get("/post/api/all"), 
  getById: (id) => api.get(`/post/api/${id}`),
};

export default {
  Post,
};
