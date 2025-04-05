const Joi = require('joi');

const register = Joi.object({
    body:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(7).required(),
    })
})


module.exports = {
    register
}
