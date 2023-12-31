import express from "express";
import {
  getUserProfile,
  getAllDoctors,
  checkValidToken,
} from "../controllers/users.js";

const router = express.Router();

router.get("/ping", checkValidToken);
router.get("/profile", getUserProfile);
router.get("/profile/:id", getUserProfile);
router.get("/profiles", getAllDoctors);

export { router as userProfileRouter };
