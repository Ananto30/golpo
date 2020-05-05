import axios from "axios";
import commonStore from "./store/commonStore.js";

const api = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
  },
});

const getHeader = () => {
  return {
    headers: {
      Authorization: "Bearer " + commonStore.authToken,
    },
  };
};

const Auth = {
  login: (username, password) =>
    api.post("/auth/login", {
      username: username,
      password: password,
    }),
};

const Post = {
  getAll: () => api.get("/post", getHeader()),
  getById: (id) => api.get(`/post/${id}`, getHeader()),
};

const Chat = {
  getChats: () => api.get("/chat", getHeader()),
  getChatsByReceiver: (receiver) => api.get(`/chat/${receiver}`, getHeader()),
};

export default {
  Auth,
  Post,
  Chat,
};
