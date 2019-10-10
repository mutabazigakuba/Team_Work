import Joi from '@hapi/joi';

export default (req, res, next)=>{
    const schema = {
        first_name: Joi.string().required().trim(),
        last_name: Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        password: Joi.string().min(6).required().trim(),
        gender: Joi.string().required().trim(),
        job_title: Joi.string().required().trim(),
        department: Joi.string().required().trim(),
        address: Joi.string().required().trim(),
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