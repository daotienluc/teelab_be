import express from "express";
import usersController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/getAllUser", usersController.getAllUser);
usersRouter.get("/getUserById/:id", usersController.getUserById);

usersRouter.post("/addUser", usersController.addUser);

usersRouter.put("/updateUser/:id", usersController.updateUser);

usersRouter.delete("/deleteUser/:id", usersController.deleteUser);

export default usersRouter;
