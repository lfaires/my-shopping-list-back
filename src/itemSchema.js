import joi from 'joi';

const schema = joi.object({
    text: joi.string()
        .min(3)
})

export default schema;