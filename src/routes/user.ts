import {Router} from "express";
import userController from "../controller/user/userController";

const userRouter = Router();



//user Sign up page
userRouter.get("/");

//user Sign up
userRouter.post("/signUp", userController.signUp);

//user Log in page
userRouter.get("/");

//user Log in
userRouter.post("/login", userController.logIn);

//user Profile
userRouter.get("/me");

//edit profile
userRouter.patch("/");

//delete user
userRouter.delete("/");


export default userRouter;
