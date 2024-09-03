import express from 'express';
import { createMovie, deleteMovie, getAllMovies, getFilteredMovies, getMovieById, updateMovie } from '../controllers/movieController.js';
import authUser from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new movie
router.post('/', authUser, createMovie);

// Get all movies 
router.get('/', getAllMovies);

// Get movies by ID
router.get('/:id', getMovieById);

// Update movie
router.put('/:id', authUser, updateMovie);

// Filtef movies 
router.get('/movies/filter', getFilteredMovies);

//router.get('/movies/:id', async (Req, res) => {
    //try {
      //  const movieDetails = await getMovieDetails(req.params.id);
       // res.json(movieDetails);
   // } catch (error) {
     //   res.status(500).json({ message: 'Error fetching movies details' });
    //}
//});

// Delete movie
router.delete('/:id', authUser, deleteMovie);

export default router;