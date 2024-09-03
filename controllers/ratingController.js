import mongoose from 'mongoose';
import Rating from '../models/ratingModel.js';

// Creting a new rating
export const createRating = async (req, res) => {
    try {
        const { userID, movieID, rating} = req.body; // get required data from the req.body
        const ratingID = new mongoose.Types.ObjectId().toString();  // Get a unique ratingID using MongoDB ObjectId
        
        const newRating = new Rating({ ratingID, userID, movieID, rating }); // Create a new rating with the provided data

        await newRating.save();// Save the new rating to the database
        res.status(201).json({ message: "Rating created successfully", rating: newRating});

    } catch (error) {
        res.status(500).json
({ error: "Failed to create rating", details: error.message});
    }
};

// Get all ratings
export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find(); // Get all ratings from the database

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve ratings" , details: error.message});
    }
};

// Get rating by ID
export const getRatingByID = async (req, res) => {
    try {
        const {id} = req.params; // Get the ratingID from the request parameters
        const trimmedId = id.trim();

        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const rating = await Rating.findById(trimmedId); // Get the rating by ID

        if (!rating) {
            return res.status(404).json({ error: "Rating not found" });
        }
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: "Failed to get rating", details: error.message});
    }
};

// Update a rating 
export const updateRating = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from the request parameters
        const { rating } = req.body; // Get updated rating value from the request body
        
        const trimmedId = id.trim();
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const updateRating = await Rating.findOneAndUpdate(
            { ratingID: id }, // Find the rating by ID and we get the new rating 
            { rating },
            { new: true} // Return the updated rating
        );

        if(!updateRating) {
            return res.status(404).json({ error: "Rating not found" });
        }
    res.status(200).json({ message: "Rating updated successfully", rating: updateRating });
    } catch (error) {
        res.status(500).json({ error: "Failed to update rating", details: error.message });
    }
};

// Delete a rating
export const deleteRating = async (req, res) => {
    try {
        const { id} = req.params // Get ID from the request parameters
        const trimmedId = id.trim();
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const deletedRating = await Rating.findOneAndDelete({ ratingID: id }); // To get the rating by its Id and delete 
        if (!deletedRating) {
            return res.status(404).json({ error: "Rating not found" });
        } 
        res.status(200).json({ message: "Rating deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete rating", details: error.message});
    }
    
};