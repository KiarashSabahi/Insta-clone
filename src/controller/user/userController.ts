import { RequestHandler } from 'express';
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

            const createdUser = await UserServices.addUser(user);

            res.cookie('Authorization',
                'Bearer ' + createdUser.token, {
                    expires: new Date(Date.now() + 5 * 24 * 3600000)
                }).status(201).redirect("/");

        } catch (e) {
            console.log({place: "userController, signUp", e})
            res.status(500).send(e);
        }
    }
}

export default new UserClass();