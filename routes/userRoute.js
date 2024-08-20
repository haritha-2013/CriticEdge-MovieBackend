import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { protect, isAdmin } from '../middlewares/adminMiddleware.js';
import {  deleteUser, getAllUsers, getUserById } from '../controllers/adminController.js';




const router = express.Router(); // Create a new router
// Route to sign up a new admin
router.post('/admin/signup' , protect, isAdmin);


// Routes for user profile 
router.get('/profile', authenticate, getProfile);
router.put('/profile',authenticate, updateProfile);

// routes for admin
router.get('/', authenticate, isAdmin, getAllUsers);
router.get('/:userId', authenticate, isAdmin, getUserById);
router.delete('/:userId', authenticate, isAdmin, deleteUser)
//router.post('/users', authenticate, isAdmin, createUser);


export default router;