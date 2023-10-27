import express from "express";
import { getUserProfile, getAllUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/profile", getUserProfile);
router.get("/profile/:id", getUserProfile);
router.get("/profiles", getAllUsers);

export { router as userProfileRouter };
