import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 3001;
app.use(express.json());

// connecting to db
import { connectMongoose } from "./models/db";
connectMongoose();

// importing routes
import credentialsRoute from "./routes/credentials";

// using routes
app.use("/creds", credentialsRoute);

// http connect
app.listen(PORT, () => {
  console.log("server hitting...");
});
