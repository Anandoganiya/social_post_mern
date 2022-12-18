import { NextFunction, Request, Response } from "express";

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const err = new Error(`Not Found ${req.originalUrl}`);
  next(err);
}

export default notFound;
