import {RequestHandler} from "express";
import PostService from "./postServices";



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



}

export default new PostClass();