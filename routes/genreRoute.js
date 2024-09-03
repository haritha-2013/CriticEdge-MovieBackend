import express from 'express';
import { createGenre, deleteGenre, getGenreById, getGenres, updateGenre } from '../controllers/genreController.js';

const router = express.Router();

// Get all genres
router.get('/', getGenres);

// Get genre by Id
router.get('/:id', getGenreById);

// Create genre 
router.post('/', createGenre);

// Update genre
router.put('/:id', updateGenre);

// Delete genre 
router.delete('/:id', deleteGenre);

export default router;