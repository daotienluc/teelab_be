import express from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import authRouter from "./auth.router.js";
import cartRouter from "./cart.router.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("Welcome");
});

rootRouter.use("/products", productsRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/cart", cartRouter);

export default rootRouter;
