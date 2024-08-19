import express from 'express';
import { createMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movieController.js';

const router = express.Router();

// Create a new movie
router.post('/movies', createMovie);

// Get all movies 
router.get('/movies', getAllMovies);

// Get movies by ID
router.get('/movies/:id', getMovieById);

// Update movie
router.put('/movies/:id', updateMovie);

// Delete movie
router.delete('/movies/:id', deleteMovie)

export default router;