import express from "express";
const userRouter = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/OrderController.js";
import { protect, admin } from "../Middleware/authmiddleware.js";

userRouter
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);
userRouter.route("/myorders").get(protect, getMyOrders);
userRouter.route("/:id").get(protect, getOrderById);
userRouter.route("/:id/pay").put(protect, updateOrderToPaid);
userRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
export default userRouter;
