import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
    genreID: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Genre = mongoose.model('Genre', GenreSchema);
export default Genre;