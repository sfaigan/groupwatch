import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import pingRouter from "./ping";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.SERVER_PORT || 3001;
const CLIENT_BUILD_RELATIVE_PATH = "../../client/build";
const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

const app = express();
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

app.use("/ping", pingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});