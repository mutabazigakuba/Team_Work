import UserModel from '../models/userModel';
import Joi from '@hapi/joi';
import '@babel/polyfill'

const UserController = {
    async createNewuser(req, res) {
        const schema = {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            gender: Joi.string().required(),
            job_title: Joi.string().required(),
            department: Joi.string().required(),
            address: Joi.string().required(),
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        try {
            const user = UserModel.addNewUser(req);
            return res.status(201).send({
                "status": 201,
                "message": "user created successfully",
                "data": user
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    }
}

export default UserController;