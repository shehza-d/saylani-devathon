import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const router = express.Router();

// middleware configuration

router.use(express.json()); // this parses JSON data only in Body or req
router.use(cookieParser());
router.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://saylani-devathon-by-shehzad.surge.sh",
    ],
    credentials: true,
  })
);

export { router as middlewareRouter };
