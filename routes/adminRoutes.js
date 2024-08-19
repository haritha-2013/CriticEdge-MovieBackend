import express from 'express';
import { protect, isAdmin } from '../middlewares/adminMiddleware.js';
import { authenticate} from '../middlewares/authMiddleware.js';
import { createAdmin, deleteUser, getAllUsers, getUserById, signupAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Route to sign up a new admin
router.post('/admin/signup', protect, isAdmin, createAdmin);


router.use(protect); // Authentication middlewares
router.use(isAdmin);

// Admin only routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createAdmin); // To create a new admin user
router.delete('users/:id', deleteUser);




export default router;