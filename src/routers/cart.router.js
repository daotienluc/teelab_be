import express from "express";
import cartController from "../controllers/cart.controller.js";
const cartRouter = express.Router();
cartRouter.get("/getCartById/:id", cartController.getCartById);
cartRouter.post("/addToCart", cartController.addToCart);
cartRouter.delete("/deleteProductCart/:id", cartController.deleteProductCart);
export default cartRouter;
