import ArticleModel from '../models/articlesModel';
import Joi from '@hapi/joi';
import '@babel/polyfill';

const ArticleController = {
    async createArticle (req,res) {
        const schema = {
            title: Joi.string().required(),
            article: Joi.string().required(),
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        try {
            const article = ArticleModel.addNewArticle(req);
            return res.status(200).send({
                "status": 200,
                "message": "article successfully created",
                "data": article
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    }
}

export default ArticleController;