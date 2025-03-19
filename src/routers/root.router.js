import express from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import authRouter from "./auth.router.js";
import cartRouter from "./cart.router.js";
import { swaggerDocument } from "../common/swagger/init.swagger.js";
import swaggerUi from "swagger-ui-express";
import commentsRouter from "./comments.router.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("Welcome");
});

rootRouter.use("/products", productsRouter);
rootRouter.use("/comment", commentsRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/cart", cartRouter);

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get(
  "/api-docs",
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  })
);

export default rootRouter;
