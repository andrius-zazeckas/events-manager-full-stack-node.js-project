import jwt from "jsonwebtoken";
import { jwtSecret } from "./config";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  let payload = null;

  if (!token) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }

    return res.status(400).send(error).end();
  }

  return next();
};
