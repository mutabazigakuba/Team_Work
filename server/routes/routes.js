import express from 'express';
import User from '../controllers/userController.js';
import Article from '../controllers/articlesController';

const routes = express.Router();

routes.get('/', function (req, res) {return res.send('Hello TeamWork');});
routes.post('/api/v1/auth/signup', User.createNewuser);
routes.post('/api/v1/auth/signin', User.login);
routes.post('/api/v1/articles', Article.createArticle);
routes.patch('/api/v1/articles/:articleid', Article.updateArticle);
routes.delete('/api/v1/articles/:articleid', Article.deletedArticle);

export default routes;