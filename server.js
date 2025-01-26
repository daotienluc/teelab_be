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

app.use(rootRouter);

app.use(handleError);

const port = 3002;

export default (req, res) => {
  app(req, res); // Vercel sẽ sử dụng hàm này để xử lý các yêu cầu
};
