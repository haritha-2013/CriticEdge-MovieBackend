import express from "express";
import { login, logout, refreshToken, signup } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";




const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout',authenticate,  logout);


export default router;