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
        return {
            data: {
                "token": token,
                "first_name": newUser.first_name,
                "last_name": newUser.last_name,
                "email": newUser.email,
                "gender": newUser.gender,
                "job_title": newUser.job_title,
                "department": newUser.department,
                "address": newUser.address
            }
        };
    }

    findOne(id) {
        return this.users.find(user => user.id === id);
    }

    login( email, password){
        const findUser = this.users.find( user => user.email === email.body.email);
        if(!findUser){
            return {
                status: false,
                message: "Unregistered User"
            }
        }
        const newPassword = password.body.password
        if(!(newPassword === findUser.password)){
            return{
                status:false,
                message:"Wrong Password Please"
            }
        }

        const token = Helper.generateToken(findUser.token)
        return{
            status:true,
            data: {
                "token": token,
                "first_name": findUser.first_name,
                "last_name": findUser.last_name,
                "email": findUser.email,
                "gender": findUser.gender,
                "job_title": findUser.job_title,
                "department": findUser.department,
                "address": findUser.address
            }
        }
    }
}

export default new UserModel;