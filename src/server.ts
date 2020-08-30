import express from "express";
import {json} from "body-parser";
import cookieParser from "cookie-parser";
import path from "path"


import "./db/DBConnection";
import userRouter from "./routes/user";


const app = express();
const port = process.env.PORT;


app.use(json());
app.use(cookieParser());
app.use("/user", userRouter);


app.use("/", (req, res) => {
    console.log("bad place")
    res.sendFile(path.join(__dirname, "../","views", "index.html"))
})





app.listen(port, async () => {
    console.log(`server is up and running on port ${port}`)
})