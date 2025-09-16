import envSchema from './schema.js';

const EnvironmentValidation = {
  validateEnv: () => {
    const validationResult = envSchema.validate(process.env);

    if (validationResult.error) throw new Error(validationResult.error.message);
    return validationResult.value;
  },
};

export default EnvironmentValidation;
