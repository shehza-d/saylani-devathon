import express from "express";
import cors from "cors";
// import { tokenVerification } from "../helpers/tokenVerification.js";

const router = express.Router();

// router.use("/signup", () => {});

router.use(express.json());
// router.use(cookieParser());
// router.use(tokenVerification)
router.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000", "*"],
    credentials: true,
  })
);

export { router as middlewareRouter };
