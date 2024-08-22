import express from 'express';
import { createGenre, deleteGenre, getGenreById, getGenres, updateGenre } from '../controllers/genreController.js';

const router = express.Router();

// Get all genres
router.get('/', getGenres);

// Get genre by Id
router.get('api/genres/:id', getGenreById);

// Create genre 
router.post('/', createGenre);

// Update genre
router.put('/genres/:id', updateGenre);

// Delete genre 
router.delete('/genres/:id', deleteGenre);

export default router;