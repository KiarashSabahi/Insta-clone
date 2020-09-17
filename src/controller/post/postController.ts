import {RequestHandler} from "express";
import PostService from "./postServices";
import {deleteFile} from "../../utils/file";
import postServices from "./postServices";
import {spawn} from "env-cmd/dist/spawn";
import userServices from "../user/userServices";



class PostClass {

    createPostPage: RequestHandler = async (req, res) => {
        res.status(200).render("./post/createPost.ejs");
    }

    createPost: RequestHandler = async (req, res) => {
        try {
            // @ts-ignore
            const user = req.user;
            const post = await PostService.addPost({
                userId: user._id,
                image: req.file.filename,
                caption: req.body.caption
            })
            res.status(201).redirect("/")
        } catch (e) {
            console.log({error: e, palace: "postController create post"})
            res.status(400).send({error: e})
        }
    }

    deletePost: RequestHandler = async (req, res) => {
        const post = await postServices.find("findById", {_id: req.query.postId});

        // @ts-ignore
        const user = req.user;

        if (!post) {
            return res.status(400).send({Error: "Post not found"})
        }

        if (!req.query.postId) {
            return res.status(400).send({Error: "Invalid Post"});
        }

        try {
            const path = "./images/" + post.image;
            deleteFile(path);
        } catch (e) {
            console.log({place: "postController, deletePost delete file", Error: e});
            return res.status(500).end();
        }

        try {
            await userServices.deletePost(user._id, post._id);
        } catch (e) {
            console.log({place: "postController, deletePost user deletepost", Error: e});
            return res.status(500).end()
        }

        try {
            await postServices.deletePost(post._id, user._id);
        } catch (e) {
            console.log({place: "postController, deletePost post deletepost", Error: e});
            return res.status(500).end()
        }

        return res.status(200).end();
    }

}

export default new PostClass();