import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({

    reviewID: {
        type: String,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    movieID: {
        type: String, 
        required: true
    },
    rating : {
        type: Number, 
        required: true
    },
    reviewText: {
        type: String
    },
    reviewDate: { 
        type: Date,
        default: Date.now
    },


})

const Review = mongoose.model('Review', ReviewSchema);
export default Review;