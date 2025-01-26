import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import { handleError } from "./src/common/helpers/error.helper.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.use(rootRouter);

app.use(handleError);

const port = 3002;

app.listen(port, () => {
  console.log(`Đang chạy server trên port ${port}`);
});
