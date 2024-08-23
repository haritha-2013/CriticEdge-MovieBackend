import express from "express";
import { adminCreate, adminLogin, adminLogout, adminProfile, checkAdmin } from "../controllers/adminController.js";
import authAdmin from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/create", adminCreate);
router.post("/login", adminLogin );
router.get("/profile/:id", authAdmin, adminProfile );

router.get('/check-admin', authAdmin, checkAdmin );
router.post("/logout",  adminLogout);
export default router;