import Movie from '../models/movieModel.js';

// Create a new movie
export const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body); // Data from request body 
        const savedMovie = await newMovie.save(); // Save the data to the database

        res.status(201).json(savedMovie);
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
        const movie = await Movie.findById(req.params.id ); // Find a movie from the database by using its ID
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
        const updatedMovie = await Movie.findByIdAndUpdate(
           req.params.id,
            req.body,
            { new: true } // Find the movie by using its Id and update it and return updated data
        );
        if (updatedMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Filtering movies
export const getFilteredMovies = async (req, res) => {
    try {
        const { year, popular, genre } = req.query;
        const filter = {};

        if (year) {
            const startDAte = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            filter.releaseDate = {$gte: startDAte, $lte: endDate };
        }

        if (popular) {
            filter.popularity = { $gte: parseInt(popular, 10) }; // Filter based on popularity
        } // Ensure popular is an integer

        if (genre) {
            const genreArray = genre.split(','); // For multiple genres
            filter.genres = { $in: genreArray }; // Filter based on genre
        }

        const movies = await Movie.find(filter).limit(50);
        res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: "error fetching movies" });
        
    }
};

// Delete a movie
export const deleteMovie = async (req, res ) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id ); // Find the movie by using its Id and delete it from the database

        if(deletedMovie) {
            res.status(200).json({ message: 'Movie deleted successfully' });
        }else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};