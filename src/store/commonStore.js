import { observable, action, decorate, toJS } from "mobx";

import socket from "../socketClient";

class CommonStore {
  loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  authToken = window.localStorage.getItem("jwtToken");

  // cache the users images, you know we need images in various places
  usersImageCache = JSON.parse(window.localStorage.getItem("usersImageCache"));

  setLoggedUser(user) {
    this.loggedUser = user;
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  }

  setAuthToken(token) {
    this.authToken = token;
    window.localStorage.setItem("jwtToken", token);
    socket.StartSocketServer()
  }

  // private method
  setImageCache(users) {
    let newCache = {};
    users.forEach((user) => {
      if (user.image) newCache[user.username] = user.image;
    });
    window.localStorage.setItem("usersImageCache", JSON.stringify(newCache));
    this.usersImageCache = newCache;
  }

  updateImageCache(users) {
    if (this.usersImageCache == null) {
      this.setImageCache(users);
    } else {
      // copy this because we dont want to read localstorage everytime in the loop below
      let cache = this.usersImageCache;
      users.map((user) => {
        return user.image && (cache[user.username] = user.image);
      });
      this.usersImageCache = cache;
      window.localStorage.setItem("usersImageCache", JSON.stringify(cache));
    }
  }

  addUserImageCache(user) {
    if (
      this.usersImageCache &&
      user.image &&
      this.usersImageCache[user.username] !== user.image
    )
      this.usersImageCache[user.username] = user.image;
    window.localStorage.setItem(
      "usersImageCache",
      JSON.stringify(this.usersImageCache)
    );
  }

  resetAuth() {
    this.loggedUser = null;
    this.authToken = null;
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem("loggedUser");
  }
}

decorate(CommonStore, {
  loggedUser: observable,
  authToken: observable,
  usersImageCache: observable,

  setLoggedUser: action,
  setAuthToken: action,
  resetAuth: action,
  addUserImageCache: action,
  setImageCache: action,
  updateImageCache: action,
});

export default new CommonStore();
