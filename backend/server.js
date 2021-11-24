import express from "express";
import path from "path";
import router from "./Routes/productRutes.js";
import userRouter from "./Routes/userRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import dotenv from "dotenv";

import morgan from "morgan";
import { notfound, errorHandler } from "./Middleware/errorMiddleware.js";
import connect from "./config/db.js";

dotenv.config();
connect();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products/", router);
app.use("/api/users/", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal/", (req, res) =>
  res.json(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

app.use(notfound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV}  mode ${PORT}`)
);
