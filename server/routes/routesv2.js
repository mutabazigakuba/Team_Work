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
routesv2.patch('/api/v2/articles/:articleid', auth, ArticleValidator.updateArticle, Article.updateArticle);
routesv2.delete('/api/v2/articles/:articleid',auth, Article.deletedArticle);
routesv2.get('/api/v2/feeds',auth, Article.viewAll);
routesv2.post('/api/v2/articles/:articleid/comments', auth, ArticleValidator.createComment, Article.createComment);
routesv2.get('/api/v2/articles/:articleid',auth, ArticleValidator.displayOne, Article.displayOne);

export default routesv2;