import mongoose from 'mongoose';
import Review from '../models/reviewModel.js'; 

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { movieID, userID, reviewText } = req.body;
     
        if (!mongoose.Types.ObjectId.isValid(movieID) || !mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: 'Invalid movie ID or user ID' });
        }

        const newReview = new Review ({
            movieID, // Assigm movieID from the req.body
            userID,
            reviewText // Assign reviewText from the req.body
        });
        
        await newReview.save(); //Save the new review to the database
        res.status(201).json({ message: 'Review created successfully', review: newReview})        
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error});    
    }
};

// Get all reviews for a movie

export const getReviewsByMovie = async (req, res) => {
    try {
        const { movieID } = req.query; // Get movieID from the req.params
        const trimmedMovieID = movieID ? movieID.trim() : '';
        if (!trimmedMovieID) {
            return res.status(400).json({ message: 'Movie ID is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(trimmedMovieID)) {
            return res.status(400).json({ message: 'Invalid Movie ID' });
        }
        const reviews = await Review.find({ movieID })
        .populate('userID', 'username' )
        .populate('movieID', 'title' ); // Find reviews matching the movieID
        //And also populating movie details
        res.status(200).json(reviews); 
    
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

// Get a review by ID
export const getReviewByID = async (req, res) => {
    try {
        const { reviewID } = req.params; // Get reviewID from the req params
        if(!mongoose.Types.ObjectId.isValid(reviewID)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }
        const review = await Review.findById(reviewID)
        .populate('userID', 'username')
        .populate('movieID', 'title'); // Find a review matching the reviewID
    
        if (!review) {
            return res.status(400).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error ', error});
    }
}; 

// Update a review

export const updateReview = async (req, res) => {
    try {
        const { reviewID } = req.params; // Get reviewID from the req params
        const { reviewText } = req.body; // Get updated rating and reviewText from the reqest body

        if (!mongoose.Types.ObjectId.isValid(reviewID)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewID, // Find the, review by reviewID
            { reviewText }, // Update the rating and reviewText
            { new: true } // Updated document(
        ).populate('userID', 'username')
        .populate('movieID', 'title'); 

        if (!updatedReview) {
            return res.status(404).json({ message: ' Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
};

// Deelete a review
export const deleteReview = async (req, res) => {
    try {
        const { reviewID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(reviewID)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }
        const deletedReview = await Review.findByIdAndDelete(reviewID);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
};

