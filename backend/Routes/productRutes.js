import express from "express";
const router = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
  getTopProducts,
} from "../controllers/prductController.js";
import { protect, admin } from "../Middleware/authmiddleware.js";

router.route("/").get(getProduct).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
export default router;
