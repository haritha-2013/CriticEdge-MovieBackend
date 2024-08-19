import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { createUser, deleteUser, getAllUsers, getUserById } from '../controllers/adminController.js';




const router = express.Router(); // Create a new router

// Routes for user profile 
router.get('profile', authenticate, getProfile);
router.put('profile',authenticate, updateProfile);

// routes for admin
router.get('/', authenticate, isAdmin, getAllUsers);
router.get('/:userId', authenticate, isAdmin, getUserById);
router.delete('/:userId', authenticate, isAdmin, deleteUser)
router.post('/users', authenticate, isAdmin, createUser);


export default router;