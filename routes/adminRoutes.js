import express from 'express';
import { protect, isAdmin } from '../middlewares/adminMiddleware.js';
import { adminLogin, adminSignup,  deleteUser, getAllUsers, getUserById } from '../controllers/adminController.js';

const router = express.Router();

// Route to sign up a new admin
router.post('/signup', adminSignup);
// Route to log in as admin
router.post('/login', adminLogin);

// Admin access routes
//router.use(protect); // Authentication middlewares
//router.use(isAdmin);

// Admin only routes
router.get('/users',protect, isAdmin,  getAllUsers);
router.get('/users/:id',protect,isAdmin, getUserById);
router.delete('/users/:id',protect,isAdmin, deleteUser);

export default router;