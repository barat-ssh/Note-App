import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("UserModel", userScheme);

export const connectMongoose = async () => {
  const url =
    "mongodb+srv://barath0121:nFuAeH5md3xWuqNt@cluster0.a8ppubw.mongodb.net/Notes?retryWrites=true&w=majority";
  try {
    await mongoose.connect(url);
    console.log("Database connected...");
  } catch (error) {
    console.log("Error while connection to connectMongoDB: ", error);
  }
};
