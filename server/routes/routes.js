import express from 'express';
import User from '../controllers/userController.js';
import Article from '../controllers/articlesController';
import userValidator from '../middleware/userValidator.js';
import loginValidator from '../middleware/loginValidator.js';
import ArticleValidator from '../middleware/articlesValidator.js';
import auth from '../middleware/auth.js';


const routes = express.Router();

routes.get('/', function (req, res) {return res.send('Hello TeamWork');});
routes.post('/api/v1/auth/signup', userValidator , User.createNewuser);
routes.post('/api/v1/auth/signin', loginValidator, User.login);
routes.post('/api/v1/articles', auth, ArticleValidator.createArticles, Article.createArticle);
routes.patch('/api/v1/articles/:articleid', auth, ArticleValidator.updateArticle, Article.updateArticle);
routes.delete('/api/v1/articles/:articleid',auth, Article.deletedArticle);
routes.post('/api/v1/articles/:articleid/comments', auth, ArticleValidator.createComment, Article.createComment);
routes.get('/api/v1/feeds',auth, Article.viewAll);
routes.get('/api/v1/articles/:articleid',auth, ArticleValidator.displayOne, Article.displayOne);

export default routes;