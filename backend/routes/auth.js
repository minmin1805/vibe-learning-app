import express from "express";
import { signup, login, logout, getProfile, updateProfile } from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getProfile)
router.put("/update", verifyToken, updateProfile)
export default router;