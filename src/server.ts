import express from "express";
import {json} from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
const path = require('path');

import "./db/DBConnection";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import {setCORS} from "./middleware/cors";
import {userAuth} from "./middleware/userAuth";


const app = express();
const port = process.env.PORT;


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(json());
app.use(cookieParser());
app.use(setCORS)
app.use(express.static(path.join(__dirname, '../public')));
app.use(multer({dest: "../images"}).single("image"));
app.use("/user", userRouter);
app.use("/post", postRouter);


app.get("/", userAuth, (req, res) => {
    res.end();
})


app.use((req, res) => {
    res.status(200).render("404", {pageTitle: "Page Not Found", requestedURL: req.originalUrl});
});



app.listen(port, async () => {
    console.log(`server is up and running on port ${port}`)
})