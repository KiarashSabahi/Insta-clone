import {Router} from "express";
import userController from "../controller/user/userController";
import {userAuth} from "../middleware/userAuth";

const userRouter = Router();



// user Sign up page
userRouter.get("/signUp", userController.signUpPage);

//user Sign up
userRouter.post("/signUp", userController.signUp);

// user Log in page
userRouter.get("/login", userController.logInPage);

//user Log in
userRouter.post("/login", userController.logIn);

//Token checker
userRouter.get("/auth", userAuth, userController.me);

//user Log out
userRouter.delete("/logout", userAuth, userController.logOut);

//user Profile page
// userRouter.get("/me")

//edit Profile Page
// userRouter.get("/")

//edit profile
// userRouter.patch("/");

//delete user
// userRouter.delete("/");

//search for user
userRouter.get("/search", userController.search);

//follow
userRouter.post("/follow", userAuth, userController.follow);

//unfollow
userRouter.post("/unfollow", userAuth, userController.unfollow);






//view user profile
userRouter.get("/:username", userController.viewProfile);


export default userRouter;
