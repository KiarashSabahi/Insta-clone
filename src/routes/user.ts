import {Router} from "express";
import userController from "../controller/user/userController";
import {userAuth} from "../middleware/userAuth";

const userRouter = Router();



//user Sign up page
userRouter.get("/");

//user Sign up
userRouter.post("/signUp", userController.signUp);

//user Log in page
userRouter.get("/");

//user Log in
userRouter.post("/login", userController.logIn);

//Token checker
userRouter.get("/auth", userAuth, userController.viewProfile);

//user Log out
userRouter.delete("/logout", userAuth, userController.logOut);

//user Profile page
userRouter.get("/me")

//user Profile
userRouter.get("/profile", userAuth, userController.viewProfile);

//edit Profile Page
// userRouter.get("/")

//edit profile
// userRouter.patch("/");

//delete user
// userRouter.delete("/");


export default userRouter;
