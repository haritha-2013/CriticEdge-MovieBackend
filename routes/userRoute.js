import express from "express";
import { checkUser, userCreate, userLogin, userLogout, userProfile } from "../controllers/userController.js";
import authUser from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", userCreate);
router.post("/login", userLogin);
router.get("/profile/:id", authUser, userProfile, );


router.get('/checkuser', authUser, checkUser );

router.post("/logout", userLogout);

export default router;



