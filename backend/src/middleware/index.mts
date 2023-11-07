import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const router = express.Router();

// middleware configuration

router.use(express.json());
router.use(cookieParser());

// router.use(tokenVerification)

router.use(
  cors({
    origin: ["http://localhost:3000", "https://", "*"],
    credentials: true,
  }),
);

export { router as middlewareRouter };
