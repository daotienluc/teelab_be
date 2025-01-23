import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/login-facebook", authController.loginFacebook);
authRouter.post("/login-google", authController.loginGoogle);

export default authRouter;
