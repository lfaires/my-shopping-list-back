import Joi from 'joi';

const schema = Joi.object({
    text: Joi.string()
        .trim()
        .min(3)
})

export default schema;