import express from "express";
import {json} from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";

import "./db/DBConnection";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import {setCORS} from "./middleware/cors";
import {userAuth} from "./middleware/userAuth";
import {pageNotFound} from "./middleware/404";


const app = express();



app.set("view engine", "ejs");
app.set("views", "./views");


app.use(json());
app.use(cookieParser());
app.use(setCORS);
app.use(helmet());
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use("/user", userRouter);
app.use("/post", userAuth, postRouter);


app.get("/", userAuth, (req, res) => {
    res.status(200).render("home.ejs");
});

app.use(pageNotFound);

export default app;