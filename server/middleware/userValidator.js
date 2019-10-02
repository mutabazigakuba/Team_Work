import Joi from '@hapi/joi';

export default (req, res, next)=>{
    const schema = {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        gender: Joi.string().required(),
        job_title: Joi.string().required(),
        department: Joi.string().required(),
        address: Joi.string().required(),
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