import jwt from 'jsonwebtoken';

const Helper = {
    generateToken (id) {
        const token = jwt.sign({ data: id}, "12346", { expiresIn: '7d' });
        return token;
    }
}

export default Helper;
