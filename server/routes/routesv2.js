import express from 'express';
import userValidator from '../middleware/userValidator.js';
import ArticleValidator from '../middleware/articlesValidator';
import User from '../controllers/userControllerv2';
import Article from '../controllers/articlesControllerv2';
import loginValidator from '../middleware/loginValidator';
import auth from '../middleware/authv2';

const routesv2 = express.Router();

routesv2.get('/', function (req, res) {return res.send('Hello TeamWork');});
routesv2.post('/api/v2/auth/signup', userValidator , User.createNewuser);
routesv2.post('/api/v2/auth/signin', loginValidator, User.login );
routesv2.post('/api/v2/articles', auth, ArticleValidator.createArticles, Article.createArticle)
routesv2.delete('/api/v2/articles/:articleid',auth, Article.deletedArticle);

export default routesv2;