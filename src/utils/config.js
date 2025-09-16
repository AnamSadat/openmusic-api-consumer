import dotenv from 'dotenv';
import EnvironmentValidation from '../validator/env/index.js';

dotenv.config();

const validation = EnvironmentValidation.validateEnv();

const config = {
  nodemailer: {
    smtp_user: validation.SMTP_HOST,
    smtp_host: validation.SMTP_HOST,
    smtp_port: validation.SMTP_PORT,
    smtp_password: validation.SMTP_PASSWORD,
  },
  rabbitMq: {
    server: validation.RABBITMQ_SERVER,
  },
};

export default config;
