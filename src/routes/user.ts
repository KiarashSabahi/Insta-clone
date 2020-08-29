import {Router} from "express";
import userController from "../controller/user/userController";

const userRouter = Router();



//user Sign up page
userRouter.get("/signup");

//user Sign up
userRouter.post("/signUp", userController.signUp)

//user Log ino
userRouter.post("/");

//user Profile
userRouter.get("/me");

//edit profile
userRouter.patch("/");

//delete user
userRouter.delete("/");


export default userRouter;
