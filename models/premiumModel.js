import mongoose from "mongoose";

const PremiumContentSchema = new mongoose.Schema({
    premiumContentID: {
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
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});

const PremiumContent = mongoose.model('PremiumContent', PremiumContentSchema);
export default PremiumContent;