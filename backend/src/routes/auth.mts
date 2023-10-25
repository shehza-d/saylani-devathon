import express from "express";
// import {
//   getAllFaqs,
//   getFaq,
//   addFaq,
//   updateFaq,
//   deleteFaq,
//   deleteAllFaqs,
// } from "../controllers/faq.js";

const router = express.Router();

router.post("/signup", () => {});
router.post("/login", () => {});
router.post("/logout", () => {});
router.post("/forget-password", () => {});
router.post("/change-password", () => {}); // this is a user route not auth route

export { router as authRouter };
