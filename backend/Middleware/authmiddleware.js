import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  //  const token;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Token not found ");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Token not found ");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("NO authorized as an admin");
  }
};
