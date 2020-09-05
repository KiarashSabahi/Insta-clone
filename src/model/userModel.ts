import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import IUser from "../interfaces/userInterface";

// @ts-ignore
const Jwt = process.env.Jwt.toString();


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 32
    },
    nickName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true
    },
    password: {
      type: String,
      required: true
    },
    posts: [{
        type: Object
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre("save", async function (next) {

    const user = this

    if (user.isModified("password")) {
        // @ts-ignore
        user.password = await bcrypt.hash(user.password, 8);
    }

    // @ts-ignore
    if (!validator.isEmail(user.email)) {
        throw new Error("Email is not valid");
    } else {
        next();
    }
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, Jwt, {expiresIn: "2 days"});
    user.tokens.push({ token });

    await user.save();
    return token;
}

userSchema.methods.abstractUser = async function() {

    const user = this.toObject();

    delete user.password;
    delete user.tokens;
    delete user.posts;

    return user;
}

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;