import mongoose from "mongoose";

const PremiumContentSchema = new mongoose.Schema({
    premiumContentID: {
        type: String,
        unique: true
    },
    movieID: {
        type: String,
        required: true
    },
    accessLevel: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },


})

const PremiumContent = mongoose.model('PremiumContent', PremiumContentSchema);
export default PremiumContent;