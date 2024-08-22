import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    favoriteID: {
        type: String,
        
    },
   
    movieID: {
        type: String,
        required: true
    }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);
export default Favorite;