import express from 'express';
import { createPremiumContent, deletePremiumContent, getPremiumContentByID, getPremiumContents, updatePremiumContent } from '../controllers/premiumContentController.js';
import authUser from '../middlewares/authMiddleware.js';
const router = express.Router();

// Create a new premium
router.post('/', authUser, createPremiumContent);

// Get all premium content
router.get('/', authUser, getPremiumContents);

// Get premium content by ID 
router.get('/:id', authUser, getPremiumContentByID)

// Update premium content
router.put('/:id', authUser, updatePremiumContent);

// Delete premium content 
router.delete('/:id', authUser, deletePremiumContent);

export default router;