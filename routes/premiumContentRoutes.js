import express from 'express';
import { createPremiumContent, deletePremiumContent, getPremiumContentByID, getPremiumContents, updatePremiumContent } from '../controllers/premiumContentController.js';

const router = express.Router();

// Create a new premium
router.post('/premium-contents', createPremiumContent);

// Get all premium content
router.get('/premium-contents', getPremiumContents);

// Get premium content by ID 
router.get('/premium-contents/:id', getPremiumContentByID)

// Update premium content
router.put('/premium/:id', updatePremiumContent);

// Delete premium content 
router.delete('/premium/:id', deletePremiumContent);

export default router;