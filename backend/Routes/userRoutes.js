import express from "express";
const userRouter = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

import { protect, admin } from "../Middleware/authmiddleware.js";
userRouter.route("/").post(registerUser).get(protect, admin, getUsers);
userRouter.post("/login", authUser);
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

userRouter
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default userRouter;
