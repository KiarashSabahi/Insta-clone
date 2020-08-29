import mongoose from "mongoose";


export default interface IUser extends mongoose.Document {
    userNage: string;
    nickName: string;
    email: string;
    password: string;
    tokens: string[];

    generateAuthToken(): string;
}