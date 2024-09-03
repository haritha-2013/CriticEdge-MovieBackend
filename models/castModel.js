import mongoose from "mongoose";

const CastSchema = new mongoose.Schema({
   name: {
        type: String, required: true
    },
    role: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    movies: {
        type: [String]
    }
});
 
const Cast = mongoose.model('Cast', CastSchema);
export default Cast;