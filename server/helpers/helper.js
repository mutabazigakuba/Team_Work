import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const Helper = {
    generateToken (id) {
        const token = jwt.sign({ data: id}, process.env.SECRET , { expiresIn: '7d' });
        return token;
    }
}

export default Helper;
