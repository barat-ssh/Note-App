import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";

// importing database
import { UserModel } from "../models/db";

// creating endpoints
router.get("/", (req, res) => {
  res.send("world");
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const alreadyExists = await UserModel.find({ email });
  if (alreadyExists) {
    res.status(200).json({ message: "user already Exists" });
  } else {
    const user = {
      email: email,
      password: password,
      name: name,
    };
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(200).json({ message: "User created", newUser });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const alreadyExists = await UserModel.findOne({ email });
  if (alreadyExists) {
    if (alreadyExists.password === password) {
      res.status(200).json({ message: "Logged In" });
    }
  } else {
    res.status(401).json({ message: "incorrect username or password" });
  }
});

router.post("/onula", async (req, res) => {
  const { email, password, name } = req.body;
  const alreadyExists = await UserModel.find({ email });
  if (alreadyExists) {
    res.status(200).json({ message: "User already exists ->" });
    return;
  } else {
    try {
      const PASSWORD = await bcrypt.hash(password, 10);
      try {
        const user = {
          email: email,
          password: PASSWORD,
          name: name,
        };
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(200).json({ message: "user created", newUser });
      } catch (error) {
        res.status(401).json({ message: "Error while creating user", error });
      }
    } catch (error) {
      res.status(401).json({ message: "Error while creating user", error });
    }
  }
});

router.post("/onula", async (req, res) => {
  const { email, password } = req.body;
  const alreadyExists = await UserModel.findOne({ email });
  if (alreadyExists) {
    bcrypt.compare(password, alreadyExists.password, (err, result) => {
      if (err) {
        res.status(401).json({ message: "Error while logging in..", err });
      } else if (result) {
        res.status(200).json({ message: "Logged in..." });
      } else {
        res.status(401).json({ message: "Incorrect email and password" });
      }
    });
  } else {
    res.status(202).json({ message: "Incorrect email or password" });
  }
});

export default router;
