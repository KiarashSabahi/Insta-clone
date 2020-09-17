import {Router} from "express";
import multer from "../middleware/multer";
import postController from "../controller/post/postController";


const postRouter = Router();


// Upload post Image page
postRouter.get("/createPost", postController.createPostPage);

//Upload post Image
postRouter.post("/createPost", multer, postController.createPost);

//Delete post
postRouter.delete("/deletePost", postController.deletePost);

export default postRouter;