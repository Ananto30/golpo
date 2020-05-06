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

const errorHandler = (err) => {
  console.log(err);
  if (err.response.status === 401 || err.response.status === 403) {
    commonStore.resetAuth();
  }
};

const Auth = {
  login: (username, password) =>
    api.post("/auth/login", {
      username: username,
      password: password,
    }),
};

const User = {
  getByUsername: (username) =>
    api.get(`/user/${username}`, getHeader()).catch(errorHandler),
  updateMeta: (meta) =>
    api.post("/user/me/update", meta, getHeader()).catch(errorHandler),
};

const Post = {
  getAll: () => api.get("/post", getHeader()).catch(errorHandler),
  getById: (id) => api.get(`/post/${id}`, getHeader()).catch(errorHandler),
  getByUsername: (username) =>
    api.get(`/post/user/${username}`, getHeader()).catch(errorHandler),
};

const Chat = {
  getChats: () => api.get("/chat", getHeader()).catch(errorHandler),
  getChatsByReceiver: (receiver) =>
    api.get(`/chat/${receiver}`, getHeader()).catch(errorHandler),
};

export default {
  Auth,
  User,
  Post,
  Chat,
};
