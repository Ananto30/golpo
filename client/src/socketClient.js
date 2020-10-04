import socketIOClient from "socket.io-client";
import commonStore from "./store/commonStore";
import activityStore from "./store/activityStore";

let socketIns = null;

class SocketClient {
  socket = null;
  connect() {
    const socket = socketIOClient("https://golpo13.herokuapp.com", {
      query: { token: commonStore.authToken },
    });
    this.socket = socket;

    socket.on("connect", () => {
      console.log("Yee im connected");
    });

    socket.on("activity", (data) => {
      activityStore.addActivity(JSON.parse(data));
    });
  }

  static init() {
    socketIns = new SocketClient();
    socketIns.connect();
  }

  static getSoket() {
    if (socketIns) return socketIns;
  }
}
export default {
  StartSocketServer: SocketClient.init,
  socketIns: SocketClient.getSoket,
};
