import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export default async (req, res, next) =>{
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.SECRET)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    }catch(e){
        return res.status(401).send({ 
            error: 'Not authorized to access this resource' 
        })
    }
}