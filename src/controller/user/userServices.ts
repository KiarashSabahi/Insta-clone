import UserModel from "../../model/userModel";
import bcrypt from "bcrypt";


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
        return await user.abstractUser();
    }

    deleteToken = async (id: string, authToken: string) => {
        const user = await UserModel.findById(id);
        if (user == null) {
            return
        }
        // @ts-ignore
        const Token = user.tokens.indexOf(({token}: {token: string}) => authToken === token);
        user.tokens.splice(Token, 1);
        await user.save();
        return;
    }
}

export default new UserServices();