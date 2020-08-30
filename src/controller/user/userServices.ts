import UserModel from "../../model/userModel";
import bcrypt from "bcrypt";
import userInterface from "../../interfaces/userInterface";


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
}

export default new UserServices();