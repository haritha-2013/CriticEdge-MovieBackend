import express from 'express';
import { createRating, deleteRating, getRatingByID, getRatings, updateRating } from '../controllers/ratingController.js';

const router = express.Router(); 

// Creating a new rating
router.post('/', createRating);

// To get all ratings
router.get('/', getRatings);

// To get rating by ID
router.get('/:id', getRatingByID);

// To update a rating
router.put('/ratings/:id', updateRating);

// To delete a rating
router.delete('/ratings/:id', deleteRating) ;

export default router;