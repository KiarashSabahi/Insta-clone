import {RequestHandler, response, urlencoded} from 'express';
import validator from "validator";
import UserServices from "./userServices";
import userServices from "./userServices";
import postServices from "../post/postServices";


class UserClass {

    signUpPage: RequestHandler = async (req, res) => {
        res.status(200).render("./user/signup");
    }

    signUp: RequestHandler = async (req, res) => {
        
        try {
            // @ts-ignore
            const user = req.body.user;

            if (!validator.isEmail(user.email)){
                return res.status(400).send({error: "Invalid Email address"});
            }

            let response;

            try {
                response = await UserServices.addUser(user);
            } catch (e) {
                console.log(e)
                return res.status(400).send({error: "Duplicated Email address"});
            }

            res.cookie('Authorization',
                'Bearer ' + response.token, {
                    expires: new Date(Date.now() + 5 * 24 * 3600000)
                }).status(201).end();
        } catch (e) {
            console.log({place: "userController, signUp", e})
            res.status(500).send({e});
        }
    }

    logInPage: RequestHandler = async (req, res) => {
        res.status(200).render("./user/login");
    }

    logIn: RequestHandler = async (req, res) => {
        try {
            const userInput = req.body.userInput;
            const password = req.body.password;

            let response;

            if (userInput.length < 4 || password.length < 4) {
                return res.status(400).send({error: "Invalid Input"});
            }

            try {
                if (validator.isEmail(userInput)){
                    response = await UserServices.login({userInput, password, loginMethod: "email"});
                } else {
                    response = await UserServices.login({userInput, password, loginMethod: "userName"})
                }
            } catch (e) {
                return res.status(400).send(e);
            }

            res.cookie('Authorization',
            // @ts-ignore
                'Bearer ' + response.token, {
                    expires: new Date(Date.now() + 5 * 24 * 3600000)
                }).status(200).send(response);
        } catch (e) {
            console.log({place: "userController, login", e})
            res.status(500).send(e);
        }
    }

    logOut: RequestHandler = async (req, res) => {
        try {
            // @ts-ignore
            await UserServices.deleteToken(req.user._id, req.token);
            res.status(200).send({});
        } catch (e) {
            console.log({place: "userController, logout", e})
            res.status(500).send({error: e});
        }
    }

    me: RequestHandler = async (req, res) => {
        //@ts-ignore
        res.status(200).send(req.user);
    }

    search: RequestHandler = async (req, res) => {
        try {
            const userName = req.query.username;
            const user = await userServices.find("findOne", {userName});
            res.send({user})
        } catch (e) {
            console.log({place: "userController, search", e})
            res.status(500).send(e);
        }
    }

    viewProfile: RequestHandler = async (req, res, next) => {
        const userName = req.params.username;
        if (!userName) {
            return next();
        }

        try {
            const user = await userServices.find("findOne", {userName});

            if (!user) {
                return res.status(404).render("404", {pageTitle: "User Not Found", requestedURL: userName});
            }

            res.status(200).render("./user/profile", {user})
        } catch (e) {
            console.log({place: "userController, viewProfile", e})
            res.status(500).send(e.message);
        }
    }

    follow: RequestHandler = async (req, res) => {
        try {
            // @ts-ignore
            await UserServices.follow(req.user.userName, req.body.userId);
            res.status(200).end();
        } catch (e) {
            console.log({place: "userController, follow", e})
            res.status(500).send(e);
        }
    }

    unfollow: RequestHandler = async (req, res) => {
        try {
            // @ts-ignore
            await UserServices.unfollow(req.user.userName, req.body.userId);
            res.status(200).end();
        } catch (e) {
            console.log({place: "userController, unfollow", e})
            res.status(500).send(e.message);
        }
    }

    feed: RequestHandler = async (req, res) => {
        const skip: any = req.query.skip || 0;
        const limit: any = req.query.limit || 10;

        try {
            const posts = await userServices.feed( parseInt(skip), parseInt(limit));
            posts.sort((a: any, b: any) => {
                const Atime = new Date(a.createdAt.toString()).getTime(),
                    Btime = new Date(b.createdAt.toString()).getTime();
                return Btime - Atime;
            });
            res.status(200).send(posts.slice(0, 10));

        } catch (e) {
            console.log({place: "userController, feed", e})
            return res.status(500).send(e.message);
        }
        res.end()
    }
}

export default new UserClass();