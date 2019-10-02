import Joi from '@hapi/joi';

const ArticleValidator = {
    createArticles(req, res, next){
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
        next()
    },

    updateArticle(req,res, next){
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
        next()
    },

    createComment(req,res, next){
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
        next()
    },

    displayOne(req, res, next){
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
    }
}

export default ArticleValidator