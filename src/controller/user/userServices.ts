import UserModel from "../../model/userModel";
import bcrypt from "bcrypt";
import IUser from "../../interfaces/userInterface";


class UserServices {
    addUser = async (input: {
        userName: string,
        password: string,
        email: string,
        nickName: string,
    }) => {
        const user = new UserModel(input);
        const token = await user.generateAuthToken();
        return {user: await user.abstractUser() , token};
    }

    login = async (input: {
        userInput: string,
        loginMethod: string,
        password: string
    }) => {
        const user = await UserModel.findOne({[input.loginMethod]: input.userInput});

        if (!user) {
            throw ({ error: 'Unable to find the user' });
        }
        const isMatch = await bcrypt.compare(input.password, user.password);


        if(!isMatch) {
            throw ({error: 'Password is incorrect'});
        }


        const token = await user.generateAuthToken();
        return {user: await user.abstractUser() ,token};
    }

    find = async (method: string, input: object) => {
        // @ts-ignore
        const user = await UserModel[method](input);
        if (!user) {
            return ;
        }
        return await user.abstractUser();
    }

    deleteToken = async (id: string, authToken: string) => {
        const user = await UserModel.findById(id);
        if (user == null) {
            return
        }
        // @ts-ignore
        user.tokens = user.tokens.filter(({token}: {token: string}) => authToken !== token);
        await user.save();
        return;
    }

    addPost = async (userId: Object, postId: Object) => {
        const user = await UserModel.findById(userId);
        if (user == null) {
            return
        }
        // @ts-ignore
        user.posts.push(postId);
        await user.save();
    }

    deletePost = async (userId: string, postId: string) => {
        const user = await UserModel.findById(userId);

        if (user == null) {
           throw new Error("User not found");
        }

        const index = user.posts.indexOf(postId);
        if (index > -1) {
            await user.posts.splice(index, 1);
            await user.save();
            console.log("done in userService")
        } else {
            throw new Error("User doesnt have the specified post");
        }
    }

    clearCollection = async () => {
        await UserModel.deleteMany({});
    }

    follow = async (userUserName: string, targetUsername: string) => {
        const user: any = await UserModel.findOne({userName: userUserName});
        const targetUser: any = await UserModel.findOne({userName: targetUsername});

        if (user == null || targetUser == null) {
            throw new Error("Couldnt find the user")
        }

        if (user.followings.includes(targetUser._id) || targetUser.followers.includes(user._id)) {
            return
        }

        user.followings.push(targetUser._id);
        targetUser.followers.push(user._id);


        await user.save();
        await targetUser.save();
    }

    unfollow = async (userUserName: string, targetUsername: string) => {
        const user: any = await UserModel.findOne({userName: userUserName});
        const targetUser: any = await UserModel.findOne({userName: targetUsername});

        if (user == null || targetUser == null) {
            throw new Error("Couldnt find the user")
        }

        if (!user.followings.includes(targetUser._id) || !targetUser.followers.includes(user._id)) {
            return;
        }


        const userIndex = user.followings.indexOf(targetUser._id);
        const targetIndex = targetUser.followers.indexOf(user._id);

        if (userIndex > -1 && targetIndex > -1) {

            user.followings.splice(userIndex, 1);
            targetUser.followers.splice(targetIndex, 1);

            await user.save();
            await targetUser.save();
        } else {
            throw new Error("");
        }
    }
}

export default new UserServices();