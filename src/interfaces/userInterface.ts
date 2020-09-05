import mongoose from "mongoose";


export default interface IUser extends mongoose.Document {
    userName: string;
    nickName: string;
    email: string;
    password: string;
    posts: any;
    tokens: string[];

    generateAuthToken(): string;
    abstractUser(): object;
}