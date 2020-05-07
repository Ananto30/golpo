import axios from "axios";
import commonStore from "./store/commonStore.js";

const api = axios.create({
  baseURL: "http://192.168.0.105:7000",
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

const verifySuccessCalls = (res) => {
  if (res.status === 200) return res;
};

const Auth = {
  login: (username, password) =>
    api.post("/auth/login", {
      username: username,
      password: password,
    }),
};

const User = {
  getAllUsers: () =>
    api.get("/user", getHeader()).then(verifySuccessCalls).catch(errorHandler),
  getByUsername: (username) =>
    api
      .get(`/user/${username}`, getHeader())
      .then(verifySuccessCalls)
      .catch(errorHandler),
  updateMeta: (meta) =>
    api.post("/user/me/update", meta, getHeader()).catch(errorHandler),

  //TODO: this one is pretty tricky, need to rethink about the header design
  getUsersMeta: (usernames) =>
    api
      .get("/user/usersmeta", {
        params: { usernames: usernames },
        headers: {
          Authorization: "Bearer " + commonStore.authToken,
        },
      })
      .then(verifySuccessCalls)
      .catch(errorHandler),
};

const Post = {
  getAll: () =>
    api.get("/post", getHeader()).then(verifySuccessCalls).catch(errorHandler),
  getById: (id) => api.get(`/post/${id}`, getHeader()).catch(errorHandler),
  getByUsername: (username) =>
    api.get(`/post/user/${username}`, getHeader()).catch(errorHandler),
  createPost: (text) =>
    api.post("/post", { text: text }, getHeader()).catch(errorHandler),
  createComment: (postId, text) =>
    api
      .post(`/post/${postId}/comment`, { text: text }, getHeader())
      .catch(errorHandler),
};

const Chat = {
  getChats: () => api.get("/chat", getHeader()).catch(errorHandler),
  getChatsByReceiver: (receiver) =>
    api.get(`/chat/${receiver}`, getHeader()).catch(errorHandler),
  sendChat: (receiver, text) =>
    api
      .post(
        `/chat/${receiver}`,
        {
          text: text,
        },
        getHeader()
      )
      .catch(errorHandler),
};

export default {
  Auth,
  User,
  Post,
  Chat,
};
