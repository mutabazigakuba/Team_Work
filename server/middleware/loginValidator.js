import Joi from '@hapi/joi';

export default (req, res, next)=>{
    const schema = {
        email: Joi.string().email().required().trim(),
        password: Joi.string().min(6).required().trim(),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send({
            "status": 400,
            "error": result.error.details[0].message
        });
    }
    next()
}