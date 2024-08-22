import express from 'express';
import { protect, isAdmin } from '../middlewares/adminMiddleware.js';
import { adminLogin, adminSignup,  deleteUser, getAllUsers, getUserById } from '../controllers/adminController.js';

const router = express.Router();

// Route to sign up a new admin
router.post('/signup', adminSignup);
// Route to log in as admin
router.post('/login', adminLogin);

// Admin access routes
router.use(protect, isAdmin); // Authentication middlewares


// Admin only routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);

export default router;