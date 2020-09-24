import {RequestHandler, response} from 'express';
import validator from "validator";
import UserServices from "./userServices";


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
                return res.status(400).send({error: "Duplicated Email address"});
            }

            res.cookie('Authorization',
                'Bearer ' + response.token, {
                    expires: new Date(Date.now() + 5 * 24 * 3600000)
                }).status(201).end();
        } catch (e) {
            console.log(e.errors)
            // console.log({place: "userController, signUp", e})
            res.status(500).send({error: e});
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

    viewProfile: RequestHandler = async (req, res) => {
        //@ts-ignore
        res.status(200).send(req.user);
    }
}

export default new UserClass();