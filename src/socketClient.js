import socketIOClient from "socket.io-client";
import commonStore from "./store/commonStore";
import activityStore from "./store/activityStore";

const StartSocketServer = () => {
  const socket = socketIOClient("http://localhost:7000", {
    query: { token: commonStore.authToken },
  });

  socket.on("connect", () => {
    console.log("Yee im connected");
  });

  socket.on("activity", (data) => {
    console.log(data);
    activityStore.addActivity(JSON.parse(data));
  });
};

export default StartSocketServer;
