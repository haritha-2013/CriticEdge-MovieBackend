import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { isAdmin }from '../middlewares/adminMiddleware.js';
import { createUser, deleteUser, getAllUsers, getUserById } from '../controllers/adminController.js';



const router = express.Router();

router.use(authMiddleware); //Apply authentication middleware
router.use(isAdmin); // Apply admin middleware


router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users',  createUser); // Route to create a new user (admin only)
router.delete('/users/:id', deleteUser);


export default router;