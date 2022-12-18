import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json("No token Provided");
  }
  const token = authHeaders.split(" ")[1];

  try {
    jwt.verify(token, "secretkey");
    next();
  } catch (error) {
    res.status(400).json("Not authorized to access this route");
  }
};

export default authenticationMiddleware;
