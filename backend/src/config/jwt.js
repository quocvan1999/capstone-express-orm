import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "2h",
  });
};

export const createRefToken = (data) => {
  return jwt.sign({ payload: data }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};
