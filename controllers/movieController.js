import Movie from '../models/movieModel.js';

// Create a new movie
export const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body); // Data from request body 
        const saveMovie = await newMovie.save(); // Save the data to the database

        res.status(201).json(saveMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
        }
};

// Get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); // Get all movies from the database
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findOne ({ movieID: req.params}); // Find a movie from the database by using its ID
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
};

// Update movie
export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { movieID: req.params.id},
            req.body,
            { new: true } // Find the movie by using its Id and update it and return updated data
        );
        if (updateMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a movie
export const deleteMovie = async (req, res ) => {
    try {
        const deletedMovie = await Movie.findOneAndDelete({ movieID: req.parama.id }); // Find the movie by using its Id and delete it from the database

        if(deletedMovie) {
            res.status(200).json({ message: 'Movie deleted successfully' });
        }else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};