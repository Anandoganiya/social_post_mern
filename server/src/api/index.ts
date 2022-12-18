import express from "express";
import { authRouter } from "./auth";
import { postRouter } from "./post";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/post", authenticationMiddleware, postRouter);

export default router;
