import express from "express";
import { userRegister, userLogin, userLogout } from "./auth.controller";

export const router = express.Router();

router.post("/user-register", userRegister);
router.post("/user-login", userLogin);
router.post("/user-logout", userLogout);
