import PostModel from "../../model/postModel";
import userServices from "../user/userServices";

class PostServices {

    addPost = async (input: {
        userId: Object,
        image: string,
        caption: string
    }) => {
        const post = new PostModel(input);
        await post.save();
        await userServices.addPost(input.userId, post._id);
        return post
    }
}

export default new PostServices();