import UserModel from '../models/userModel';
import Joi from '@hapi/joi';
import '@babel/polyfill'

const UserController = {
    async createNewuser(req, res) {
        try {
            const user = UserModel.addNewUser(req);
            return res.status(201).send({
                "status": 201,
                "message": "user created successfully",
                "data": user.data
            })
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async login (req, res){
        try {
            const login_user = UserModel.login(req, req);
            if (login_user.status == false) {
                return res.status(401).send({
                    "status": 401,
                    "error": login_user.message,
                })
            }
            return res.status(200).send({
                "status": 200,
                "message": "user is successfully logged in",
                "data": login_user.data
            })
        }catch(e){
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    }
}

export default UserController;