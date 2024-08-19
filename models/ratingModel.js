import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    ratingID: {
        type: String,
        unique: true
    },
    usedID: { type: String, 
        required: true
    },
    movieID: {
        type: String, 
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const Rating = mongoose.model('Rating', RatingSchema);
export default Rating;