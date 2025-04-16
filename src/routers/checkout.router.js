import express from "express";
import checkoutService from "../services/checkout.services.js";
const checkoutRouter = express.Router();

checkoutRouter.get("/getAllOrder", checkoutService.getAllOrder);

checkoutRouter.post("/payment", checkoutService.payment);
checkoutRouter.post("/payLater", checkoutService.payLater);
checkoutRouter.post("/callback", checkoutService.callback);
checkoutRouter.post(
  "/checkStatusTransaction",
  checkoutService.checkStatusTransaction
);

export default checkoutRouter;
