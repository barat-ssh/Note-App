import express from "express";
const app = express();
const PORT = 3001;
app.use(express.json());

// connecting to db
import { connectMongoose } from "./models/db";
connectMongoose();

// importing routes
import credentialsRoute from "./routes/credentials";
import noteRoute from "./routes/notes";

// using routes
app.use("/", credentialsRoute);
app.use("/", noteRoute);

// http connect
app.listen(PORT, () => {
  console.log("server hitting...");
});
