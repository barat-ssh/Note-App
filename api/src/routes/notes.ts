import express from "express";
const router = express.Router();

// importing db
import { UserModel } from "../models/db";

router.get("/:id", async (req, res) => {
  const userData = await UserModel.findOne({});
});

export default router;
