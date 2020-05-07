import { observable, action, decorate } from "mobx";

class CommonStore {
  loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  authToken = window.localStorage.getItem("jwtToken");

  // cache the users images, you know we need images in various places
  usersImageCache = JSON.parse(window.localStorage.getItem("usersImageCache"));

  setLoggedUser(user) {
    this.loggedUser = user;
    localStorage.setItem("loggedUser", JSON.stringify(user));
  }

  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem("jwtToken", token);
  }

  // private method
  setImageCache(users) {
    let newCache = {};
    users.map((user) => {
      user.image && (newCache[user.username] = user.image);
    });
    localStorage.setItem("usersImageCache", JSON.stringify(newCache));
  }

  updateImageCache(users) {
    if (!this.usersImageCache) {
      this.setImageCache(users);
    } else {
      let cache = this.usersImageCache;
      users.map((user) => {
        user.image && (cache[user.username] = user.image);
      });
      localStorage.setItem("usersImageCache", JSON.stringify(cache));
    }
  }

  addUserImageCache(user) {
    if (this.usersImageCache && user.image)
      this.usersImageCache[user.username] = user.image;
    localStorage.setItem(
      "usersImageCache",
      JSON.stringify(this.usersImageCache)
    );
  }

  resetAuth() {
    this.loggedUser = undefined;
    this.authToken = undefined;
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
  updateImageCache: action,
});

export default new CommonStore();
