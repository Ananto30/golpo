import { observable, action, decorate } from "mobx";

class CommonStore {
  loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  authToken = window.localStorage.getItem("jwtToken");

  setLoggedUser(user) {
    this.loggedUser = user;
    localStorage.setItem("loggedUser", JSON.stringify(user));
  }

  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem("jwtToken", token);
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

  setLoggedUser: action,
  setAuthToken: action,
  resetAuth: action,
});

export default new CommonStore();
