import UserModel from "../../model/user";


class UserServices {

    addUser = async (input: {
        userName: string,
        password: string,
        email: string,
        nickName: string
    }) => {
        const user = new UserModel(input);
        const token = await user.generateAuthToken();
        return {user, token};
    }
}

export default new UserServices();