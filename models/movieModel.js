import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    duration: {
        type: Number
    },
    language: {
        type: String
    },
    posterImage: {
        type: String
    },
    genres: {
        type: [String]
    },
    cast: {
        type: [String]
    },
    rating: {
        type: Number,
        default: 0
    },
    popularity: {
        type: Number,
        default: 0
    },
    crew: {
        type: [String]
    },
    category: {
        type: String,
        default: 'regular'
    }

});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;