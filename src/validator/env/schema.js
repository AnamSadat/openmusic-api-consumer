import Joi from 'joi';

const envSchema = Joi.object({
  // nodemailer
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),

  //  rabbitmq
  RABBITMQ_SERVER: Joi.string().required(),
}).unknown();

export default envSchema;
