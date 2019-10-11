import Joi from '@hapi/joi';

const ArticleValidator = {
    createArticles(req, res, next){
        const schema = {
            title: Joi.string().required().trim(),
            article: Joi.string().min(150).required().trim(),
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
            title: Joi.string().required().trim(),
            article: Joi.string().min(250).required().trim(),
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
            comment: Joi.string().required().trim(),
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
        next()
    }
}

export default ArticleValidator