import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({


    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },

  


});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;