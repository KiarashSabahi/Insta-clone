import mongoose from "mongoose";
import IUser from "../interfaces/userInterface";



const postSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    likes: [{
        type: Object,
    }]
}, {
    timestamps: true
})

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
