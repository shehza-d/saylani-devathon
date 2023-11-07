import express from "express";
import {
  loginHandler,
  signupHandler,
  forgetPassword,
} from "../controllers/auth/index.js";
import { tokenName } from "../config/constants.js";

const router = express.Router();

router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.post("/logout", (req, res) =>
  res.clearCookie(tokenName).send({ message: "Logout successful" }),
);

// router.post("/forget-password", forgetPassword);

export { router as authRouter };
