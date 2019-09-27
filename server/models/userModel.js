import Helper from '../helpers/helper'

class UserModel {

    constructor() {
        this.users = [];
    }

    addNewUser(data) {
        const id = this.users.length + 1;
        const token = Helper.generateToken(id);

        const newUser = {
            id: id,
            token: token,
            first_name: data.body.first_name,
            last_name: data.body.last_name,
            email: data.body.email,
            password: data.body.password,
            gender: data.body.gender,
            job_title: data.body.job_title,
            department: data.body.department,
            address: data.body.address,
        };
        this.users.push(newUser);
        return newUser;
    }
}

export default new UserModel;