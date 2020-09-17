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

    find = async (method: string, input: object) => {
        // @ts-ignore
        return await PostModel[method](input);
    }

    deletePost = async (postId: string, userId: string) => {
        const post = await PostModel.findOneAndDelete({_id: postId});
        return post;
    }


}

export default new PostServices();