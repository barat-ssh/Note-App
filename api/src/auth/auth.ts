import jwt from "jsonwebtoken";

export const secret_key = "jsonwebtoken";

export const createJWT = async (payload: any) => {
  return jwt.sign(payload, secret_key);
};

export const verifyJWT = async (token: String) => {
  try {
    return await jwt.verify(token, secret_key);
  } catch (err) {
    console.log("Error while verifying token", err);
    return null;
  }
};
