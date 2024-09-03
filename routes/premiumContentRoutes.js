import express from 'express';
import { createPremiumContent, deletePremiumContent, getPremiumContentByID, getPremiumContents, updatePremiumContent } from '../controllers/premiumContentController.js';

const router = express.Router();

// Create a new premium
router.post('/', createPremiumContent);

// Get all premium content
router.get('/', getPremiumContents);

// Get premium content by ID 
router.get('/:id', getPremiumContentByID)

// Update premium content
router.put('/:id', updatePremiumContent);

// Delete premium content 
router.delete('/:id', deletePremiumContent);

export default router;