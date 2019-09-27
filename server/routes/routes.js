import express from 'express';
import User from '../controllers/userModel.js';

const routes = express.Router();

routes.post('/api/v1/auth/signup', User.createNewuser);
routes.get('/', function (req, res) {
    return res.send('Hello TeamWork');
});

export default routes;