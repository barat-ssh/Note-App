import express from "express";
const router = express.Router();

// importing db
import { UserModel } from "../models/db";

// interface models
export interface note {
  title: String;
  note: String;
}

// creating routes
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const alreadyExists = await UserModel.findById(id);
  if (alreadyExists) {
    const data: Object = {
      note: alreadyExists.note,
      count: alreadyExists.note.length,
    };
    res.status(200).json(data);
  } else {
    res.status(401).json({ message: "invalid userID" });
  }
});

export default router;

router.post("/:id/add", async (req, res) => {
  const id = req.params.id;
  const { title, note } = req.body;
  let alreadyExists = await UserModel.findById(id);
  if (alreadyExists) {
    const newNote: note = {
      title: title,
      note: note,
    };
    alreadyExists.note.push(newNote);
    alreadyExists = await UserModel.findById(id);
    res.status(200).json(alreadyExists?.note);
  } else {
    res.status(402).json({ message: "invalid userID" });
  }
});
