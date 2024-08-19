import express from "express";
import { login, logout, refreshToken, signup } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateSignup } from "../middlewares/validationMiddleware.js";



const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout',authenticate,  logout);

export default router;