import jwt from 'jsonwebtoken';
import '@babel/polyfill';
import db from '../config/savedb';
import Helper from '../helpers/helper'

export default async (req, res, next) =>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({ 
            "error": 401,
            "message": ' token missing' 
        })
    }
    
    try {
        const data = jwt.verify(token, process.env.SECRET)
        const queryText = 'SELECT * FROM users WHERE id=$1';
        const user = await db.query(queryText, [data.data]);
        if (!user) {
            return res.status(401).send({ 
                error: 'not authorized to access resource' 
            })
        }
        req.user = user;
        next()
    }catch(e){
        return res.status(400).send({ 
            error: 400,
            "message": e.message
        })
    }
}