import mongoose from "mongoose";
import PremiumContent from "../models/premiumModel.js";

// Create a new premium
export const createPremiumContent = async (req, res) => {
    try {
        const { movieID, accessLevel, description } = req.body; // Get required fields from the request body
        const premiumContentID = new mongoose.Types.ObjectId().toString(); // To get a new ID using MongoDB objectId

        const newPremiumContent = new PremiumContent({
            premiumContentID,
            movieID,
            accessLevel,
            description,
            userID: req.user._id
        });

        await newPremiumContent.save();

        res.status(201).json({ message: "Premium content created successfully", premiumContent: newPremiumContent });
    } catch (error) {
        res.status(500).json({ error: "Failed to create premium content", details: error.message });
   
}
};

// Get all premium content
export const getPremiumContents = async (req, res) => {
    try {
        const premiumContents = await PremiumContent.find({ userdID: req.user._id }); //Get all from database
        res.status(200).json(premiumContents);

    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve premium content", details: error.message });
    }

};

// Get premium content by ID
export const getPremiumContentByID = async (req, res) => {
    try {
        const { id } = req.params;

        const premiumContent = await PremiumContent.findOne({ premiumContentID: id, userID: req.user._id });

        if (!PremiumContent) {
            return res.status(404).json({ error: "Premium content not found" });
        }
        res.status(200).json(premiumContent);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve premium content", deails: error.message  });
    }

};

// Update premium content
export const updatePremiumContent = async (req, res) => {
    try { 
        const { id } = req.params;
        const { movieID, accessLevel, description } = req.body;
        const updatePremiumContent = await PremiumContent.findOneAndUpdate(
            { premiumContentID: id, userID: req.user._id },
            { movieID, accessLevel, description },
            { new: true }
        );
        if (!updatePremiumContent) {
            return res.status(404).json({ error: "Premium content not found" });

        }
        res.status(200).json({ message: "Premium content updated successfully", premiumContent: updatePremiumContent});
    } catch (error) {
        res.status(500).json({ error: "Failed to update premium content", details: error.message});
    }

};

// Delete premium
export const deletePremiumContent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletePremiumContent = await PremiumContent.findOneAndDelete({ premiumContentID: id}); // Find by id and delete it
    
    if (!deletePremiumContent) {
        return res.status(404).json({ error: "Premium content not found" });
    }
    res.status(200).json({ message: "Premium content deleted successfully", premiumContent: updatePremiumContent});
} catch (error) {
    res.status(500).json({ error: "Failed to delete premium content", details: error.message});
}

};
