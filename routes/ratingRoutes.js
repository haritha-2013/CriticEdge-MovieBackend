import express from 'express';
import { createRating, deleteRating, getRatingByID, getRatings, updateRating } from '../controllers/ratingController.js';

const router = express.Router(); 

// Creating a new rating
router.post('/rating', createRating);

// To get all ratings
router.get('/ratings', getRatings);

// To get rating by ID
router.get('/ratings/:id', getRatingByID);

// To update a rating
router.put('/ratings/:id', updateRating);

// To delete a rating
router.delete('/ratings/:id', deleteRating) ;

export default router;