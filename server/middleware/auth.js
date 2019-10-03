import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export default async (req, res, next) =>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(500).send({ 
            "error": '500',
            "message": 'Server error. token missing' 
        })
    }
    const data = jwt.verify(token, process.env.SECRET)
    try {
        const user = await User.findOne(data.data)
        if (!user) {
            return res.status(401).send({ 
                error: 'Not authorized to access' 
            })
        }
        next()
    }catch(e){
        return res.status(401).send({ 
            error: 'Server error' 
        })
    }
}