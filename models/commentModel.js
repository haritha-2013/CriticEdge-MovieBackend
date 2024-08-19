import mongoose from "mongoose";
import Review from "./reviewModel";

const CommentSchema = new mongoose .Schema({
    commentID: {
        type: String,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    reviewID: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        default: Date.now
    }

});

const Comment = mongoose.model('Comment, CommentSchema');
export default Comment;