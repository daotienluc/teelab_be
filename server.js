import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import { handleError } from "./src/common/helpers/error.helper.js";
import axios from "axios";
import crypto from "crypto";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://teelab-fe.vercel.app",
      "https://daolucdev.io.vn",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", rootRouter);

app.use(handleError);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Đang chạy server trên port ${port}`);
});
