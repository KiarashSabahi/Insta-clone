import {RequestHandler, response} from 'express';
import validator from "validator";
import UserServices from "./userServices";


class UserClass {

    signUp: RequestHandler = async (req, res) => {
        
        try {
            // @ts-ignore
            const user = req.body.user;

            if (!validator.isEmail(user.email)){
                return res.status(400).send({Error: "Invalid Email address"});
            }

            const response = await UserServices.addUser(user);
            res.cookie('Authorization',
                'Bearer ' + response.token, {
                    expires: new Date(Date.now() + 5 * 24 * 3600000)
                }).status(201).redirect("/");
        } catch (e) {
            console.log({place: "userController, signUp", e})
            res.status(500).send(e);
        }
    }

    logIn: RequestHandler = async (req, res) => {
        try {

            const userInput = req.body.userInput;
            const password = req.body.password;

            let response;

            if (userInput.length < 4 || password.length < 4) {
                return res.status(400).send({error: "Invalid Input"});
            }

            if (validator.isEmail(userInput)){
                response = await UserServices.login({userInput, password, loginMethod: "email"});
            } else {
                response = await UserServices.login({userInput, password, loginMethod: "userName"})
            }

            res.cookie('Authorization',
                'Bearer ' + response.token, {
                    expires: new Date(Date.now() + 5 * 24 * 3600000)
                }).status(200).redirect("/");
        } catch (e) {
            console.log({place: "userController, login", e})
            res.status(400).send(e);
        }
    }
}

export default new UserClass();