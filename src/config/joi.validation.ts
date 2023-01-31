import * as Joi from 'joi'

// Lo que busca joi es que nuestras variables de entorno esten configuradas

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6)
})