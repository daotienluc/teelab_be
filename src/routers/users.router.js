import express from "express";
import usersController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/All-users", usersController.getAllUser);
usersRouter.get("/user/:id", usersController.getUserById);

usersRouter.post("/add-user", usersController.addUser);

usersRouter.put("/update-user/:id", usersController.updateUser);

usersRouter.delete("/delete-user/:id", usersController.deleteUser);

export default usersRouter;
