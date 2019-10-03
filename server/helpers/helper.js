import jwt from 'jsonwebtoken';

const Helper = {
    generateToken (id) {
        const token = jwt.sign({ data: id}, process.env.SECRET , { expiresIn: '7d' });
        return token;
    }
}

export default Helper;
