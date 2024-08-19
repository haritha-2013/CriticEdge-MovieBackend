import express from 'express';
import { createContent, deleteContentById, getAllContent, getContentById, updateContentBYID } from '../controllers/trendingPopularController.js';


const router = express.Router(); 

// New content route
router.post('/', createContent);

// Get all content
router.get('/', getAllContent);

// Get content by ID
router.get('/', getContentById);

// Update a content by ID
router.put('/', updateContentBYID);

//delete a content by ID
router.delete('/', deleteContentById);

export default router;