import Genre from '../models/genreModel.js';

// Create new genre 
export const createGenre = async (req, res) => {
    const {name, description } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const genre = new Genre ({ name, description }); // Create a new genre
        const savedGenre = await genre.save(); // Save the genre to the database
        res.status(201).json(savedGenre); // Saved genre in return

    } catch ( error) {
        res.status(400).json({ message: error.message})
    }
};


// Get all genres
export const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find(); 
       res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// Get genre by ID
export const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if(!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.status(200).json(genre);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

// Update genres
export const updateGenre = async (req, res) => {
    //const { name, description } = req.body; // Genre data from the request body
    try {
         const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true});
         if (!genre) {
             return res.status(404).json({ message: "Genre not found" });

         }

         const updatedGenre = await genre.save(); 
         res.status(200).json(updatedGenre);

    } catch ( error) {
        res.status(400).json({ message: error.message });
    }
}; 

// Delete genre
export const deleteGenre = async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if(!deletedGenre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.status(200).json({ message: "Genre deleted successfully !!!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleteing genre", error });
        
    }
    
    };