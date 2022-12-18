import { Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    messge: err.message,
  });
}

export default errorHandler;
