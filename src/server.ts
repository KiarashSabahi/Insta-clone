import express from "express";
import {json} from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";

import "./db/DBConnection";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import {setCORS} from "./middleware/cors";


const app = express();
const port = process.env.PORT;

// app.set("view engine", "");
// app.set("views", "../views");

app.use(json());
app.use(cookieParser());
app.use(setCORS)
app.use(multer({dest: "../images"}).single("image"));
app.use("/user", userRouter);
app.use("/post", postRouter);




app.listen(port, async () => {
    console.log(`server is up and running on port ${port}`)
})