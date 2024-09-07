import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", 
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
});

const Rating = mongoose.model('Rating', RatingSchema);
export default Rating;