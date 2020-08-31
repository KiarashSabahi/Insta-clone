import {RequestHandler} from "express";
import jwt from "jsonwebtoken";
import UserServices from "../controller/user/userServices";

// @ts-ignore
const Jwt = process.env.Jwt.toString()!;

export const userAuth: RequestHandler = async (req, res, next) => {
    try {
        let token = '';
        try {
            token = req.header("Authorization")!.replace("Bearer ", "");
        } catch (e) {
            token = req.cookies.Authorization.replace("Bearer ", "");
        }
        const decoded = jwt.verify(token, Jwt);

        // @ts-ignore
        const user = await UserServices.find('findOne', { _id: decoded._id, 'tokens.token': token });
        console.log(user);
        console.log("_______________")
        // @ts-ignore
        req.token = token;
        // @ts-ignore
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).send(error);
    }
}