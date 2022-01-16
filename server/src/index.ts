import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import compression from "compression";

import movieRouter from "./routes/movieRouter";
import { createServer } from "http";
import { Server } from "socket.io";

import pingRouter from "./routes/ping";
import groupsRouter from "./routes/groups";
import {
  addUserToGroup,
  deleteUser,
  getUser,
  getUsersInGroup,
} from "./controllers/groups";
import { addGroup, addUserToGroupCache, createCache, getGroupSize, getMovieData, getYesVotes, incrementMaybeCountByUser, incrementNoCountByUser, incrementYesCountByUser, removeUserFromGroup, setUserVote, updateGroupData } from "./cache";
import { union } from "./helper";
import { GetMovie, getMovieProviders } from "./controllers/movieController";
import { PROVIDER_MAP } from "./constants";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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
  socket.on("createGroup", (name, streamingServices, genres, callback) => {
    console.log(`Socket ${socket.id} creating a group...`);
    const { groupId, user, error } = addUserToGroup(socket.id, name, streamingServices, genres);

    if (error || !user || !groupId) {
      return callback(error, undefined);
    }

    socket.join(groupId);
    socket.in(groupId).emit("notification", {
      title: "Someone just joined the group",
      description: `${user.name} just joined the group!`,
    });
    io.in(groupId).emit("users", getUsersInGroup(groupId));
    addGroup(groupId);
    addUserToGroupCache(groupId, socket.id, { name, isHost: true });
    callback(groupId);
  });

  socket.on("joinGroup", (groupId, name, streamingServices, genres, callback) => {
    console.log(`Socket ${socket.id} joining a group...`);
    const { user, error } = addUserToGroup(socket.id, name, streamingServices, genres, groupId);

    if (error || !user) {
      return callback(error);
    }

    socket.join(groupId);
    socket.in(groupId).emit("notification", {
      title: "Someone just joined the group",
      description: `${user.name} just joined the group!`,
    });
    io.in(groupId).emit("users", getUsersInGroup(groupId));
    console.log(getUsersInGroup(groupId));
    addUserToGroupCache(groupId, socket.id, { name, isHost: false });
    callback();
  });

  socket.on("startSearch", (groupId, callback) => {
    console.log("Starting search...");
    const users = getUsersInGroup(groupId);
    const streamingServicesArrays = Object.entries(users).map(([userId, user]) => user.streamingServices!);
    const genresArrays = Object.entries(users).map(([userId, user]) => user.genres!);

    if (streamingServicesArrays.length > 0 ) {
      const streamingServices = union(streamingServicesArrays);
      updateGroupData(groupId, "streamingServices", streamingServices);
    }

    if (genresArrays.length > 0 ) {
      const genres = union(genresArrays);
      updateGroupData(groupId, "genres", genres);
    }

    callback();
  })

  socket.on("movieVote", async (groupId, movieId, vote, callback) => {
    console.log("Accepting vote...");
    setUserVote(groupId, socket.id, movieId, vote);
    const groupSize = getGroupSize(groupId);
    const yesVotes = getYesVotes(groupId, movieId)
    if (groupSize === yesVotes.length) {
      console.log("Match found");
      const movie = await GetMovie(movieId);
      const providers = await getMovieProviders(movieId);
      io.in(groupId).emit("matchFound", movie, providers);
    }
    callback();
  })

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
      removeUserFromGroup(user.groupId, user.userId);
      console.log(getUsersInGroup(user.groupId));
    }
  });
});

// Initialize
createCache();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
