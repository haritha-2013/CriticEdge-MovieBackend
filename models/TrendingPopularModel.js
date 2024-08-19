import mongoose from "mongoose";

const TrendingPopularContentSchema = new mongoose.Schema({
    contentID: {
        type: String,
        unique: true
    },
    movieID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const TrendingPopularContent = mongoose.model('TrendingPopularContent', TrendingPopularContentSchema);
export default TrendingPopularContent;