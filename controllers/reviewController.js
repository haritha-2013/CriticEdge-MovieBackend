import Review from '../models/reviewModel.js'; 

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { userID, movieID, rating, reviewText } = req.body;
        const reviewID = new mongoose.Types.objectId().toString(); // To get a unique review ID

        const newReview = new Review ({
            reviewID,  // Assign the new reviewId
            userID, // Assign userID from req.body
            movieID, // Assigm movieID from the req.body
            rating,  // Assign rating from ther req.body
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
        const { movieID } = req.params; // Get movieID from the req.params
        const reviews = await Review.find({ movieID }); // Find reviews matching the movieID
        res.status(200).json(reviews); 
    
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

// Get a review by ID
export const getReviewID = async (req, res) => {
    try {
        const { reviewID } = req.params; // Get reviewID from the req params
        const review = await Review.findOne({ reviewID }); // Find a review matching the reviewID
    
        if (!review) {
            return res.status(404).json({ message: 'Review not found'});
        }

        res.status(200).json(review);
    
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error});
    }
}; 

// Update a review

export const updateReview = async (req, res) => {
    try {
        const { reviewID} = req.params; // Get reviewID from the req params
        const { rating, reviewText } = req.body; // Get updated rating and reviewText from the reqest body

        const updatedReview = await Review.findoneAndUpdate (
            { reviewID}, // Find the review by reviewID
            { rating, reviewText }, // Update the rating and reviewText
            { new: true } // Updated document
        ); 

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
        const deletedReview = await Review.findOneAndDelete({ reviewID });
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
};

