import express from "express";
import cartController from "../controllers/cart.controller.js";
const cartRouter = express.Router();
cartRouter.post("/getCartById/:id", cartController.getCartById);
cartRouter.post("/addToCart", cartController.addToCart);
export default cartRouter;
