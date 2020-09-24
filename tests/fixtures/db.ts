import * as mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userServices from "../../src/controller/user/userServices";

// @ts-ignore
const Jwt = process.env.Jwt.toString()!;

const dbDummyId = "5f69ecacc07c952d1cfb4f75";

const dbDummy = {
    _id: dbDummyId,
    userName: "kiarash",
    password: "1234",
    email: "kiarash@gmail.com",
    nickName: "kiarash",
    tokens:[{
        token:  jwt.sign({_id:  dbDummyId}, Jwt, {expiresIn: "2 days"})
    }]
};

const reqDummy = {
    userName: "alireza",
    password: "5678",
    email: "alireza@gmail.com",
    nickName: "alireza",

};

const setUpUserCollection = async () => {
    await userServices.clearCollection();
    await userServices.addUser(dbDummy);
};

export {reqDummy, dbDummy, dbDummyId, setUpUserCollection};