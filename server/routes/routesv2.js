import express from 'express';
import userValidator from '../middleware/userValidator.js';
import User from '../controllers/userControllerv2';
import loginValidator from '../middleware/loginValidator';

const routesv2 = express.Router();

routesv2.get('/', function (req, res) {return res.send('Hello TeamWork');});
routesv2.post('/api/v2/auth/signup', userValidator , User.createNewuser);
routesv2.post('/api/v2/auth/signin', loginValidator, User.login );

export default routesv2;