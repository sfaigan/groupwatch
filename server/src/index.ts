import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import compression from "compression";

import movieRouter from "./routes/movieRouter";
import { createServer } from "http";
import { Server } from "socket.io";
import { randomBytes } from "crypto";

import pingRouter from "./routes/ping";
import groupsRouter from "./routes/groups";
import {
  addUserToGroup,
  deleteUser,
  getUser,
  getUsersInGroup,
} from "./controllers/groups";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const PORT = process.env.PORT || 3001;
const CLIENT_BUILD_RELATIVE_PATH = "../../client/build";
const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

// Express setup
const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());

if (NODE_ENV === "production") {
  console.log("Running in production mode...");
  app.use(
    "/static",
    express.static(path.join(__dirname, CLIENT_BUILD_RELATIVE_PATH + "/static"))
  );
  app.get("/", (req, res) => {
    res.sendFile(
      path.join(__dirname, CLIENT_BUILD_RELATIVE_PATH, "index.html")
    );
  });
} else {
  console.log("Running in development mode...");
}

// Routes
app.use("/api/movies", movieRouter);
app.use("/api/ping", pingRouter);
app.use("/api/groups", groupsRouter);

// Socket.io setup
const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  socket.on("createGroup", (name, callback) => {
    console.log(`Socket ${socket.id} creating a group...`);
    const groupId = randomBytes(3).toString("hex").toString().toUpperCase();
    const { userId, user, error } = addUserToGroup(socket.id, name, groupId);

    if (error || !userId || !user) {
      return callback(error, undefined);
    }

    socket.join(groupId);
    socket.in(groupId).emit("notification", {
      title: "Someone just joined the group",
      description: `${user.name} just joined the group!`,
    });
    io.in(groupId).emit("users", getUsersInGroup(groupId));
    callback(groupId);
  });

  socket.on("joinGroup", (name, groupId, callback) => {
    console.log(`Socket ${socket.id} joining a group...`);
    const { userId, user, error } = addUserToGroup(socket.id, name, groupId);

    if (error || !userId || !user) {
      return callback(error);
    }

    socket.join(groupId);
    socket.in(groupId).emit("notification", {
      title: "Someone just joined the group",
      description: `${user.name} just joined the group!`,
    });
    io.in(groupId).emit("users", getUsersInGroup(groupId));
    console.log(getUsersInGroup(groupId));
    callback();
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    if (user) {
      io.in(user?.groupId).emit("message", { user: user.name, text: message });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.groupId).emit("notification", {
        title: "Someone just left the group.",
        description: `${user.userName} just left the group.`,
      });
      io.in(user.groupId).emit("users", getUsersInGroup(user.groupId));
      console.log(getUsersInGroup(user.groupId));
    }
  });
});

// Initialize
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
