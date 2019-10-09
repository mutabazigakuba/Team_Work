import jwt from 'jsonwebtoken';
import '@babel/polyfill';
import db from '../config/savedb';
import Helper from '../helpers/helper'

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
        const queryText = 'SELECT * FROM users WHERE id=$1';
        const user = await db.query(queryText, [data.data]);
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