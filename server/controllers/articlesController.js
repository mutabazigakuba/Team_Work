import ArticleModel from '../models/articlesModel';
import Joi from '@hapi/joi';
import '@babel/polyfill';

const ArticleController = {
    async createArticle(req, res) {
        const schema = {
            title: Joi.string().required(),
            article: Joi.string().min(250).required(),
            username: Joi.string().required()
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
    },

    async updateArticle(req, res) {
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
            const update = ArticleModel.editArticle(parseInt(req.params.articleid), req)
            if (update.status === false) {
                return res.status(400).send({
                    "status": 400,
                    "error": update.message,
                })
            }
            return res.status(200).send({
                "status": 200,
                "message": "article successfully edited",
                "data": update.data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async deletedArticle(req, res) {
        try {
            const deleted = ArticleModel.deleteArticle(parseInt(req.params.articleid))
            if (deleted.status === false) {
                return res.status(400).send({
                    "status": 400,
                    "error": deleted.message,
                })
            }
            return res.status(204).send({
                "status": 204,
                "message": deleted.message
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    async createComment(req, res) {
        const schema = {
            comment: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        try {
            const comment = ArticleModel.commentOnArticle(parseInt(req.params.articleid), req);
            if (comment.status === false) {
                return res.status(400).send({
                    "status": 400,
                    "error": comment.message,
                })
            }
            return res.status(201).send({
                "status": 201,
                "message": "comment successfully created",
                "data": comment.data
            })
        } catch (e) {
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },

    viewAll(req, res) {
        const articles = ArticleModel.findAll()
        return res.status(200).send({
            "status": 200,
            "message": "success",
            "data": articles
        });
    },

    displayOne(req, res) {
        const schema = {
            articleid: Joi.number()
        }
        const result = Joi.validate(req.params, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        try {
            const single_article = ArticleModel.findOneArticle(parseInt(req.params.articleid));
            if (single_article.status === false) {
                return res.status(401).send({
                    "status": 401,
                    "error": single_article.message,
                })
            }
            return res.status(200).send({
                "status": 200,
                "data": single_article.data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                "status": 500,
                "error": "server error"
            })
        }
    },
}

export default ArticleController;