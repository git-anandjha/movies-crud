import Joi from 'joi';
import { loginRegisterValidation, requiredStringValidation } from './common';

const role = ['admin', 'user'];
const login = loginRegisterValidation;
const userRegister = loginRegisterValidation.append({
  email: requiredStringValidation('email'),
  firstName: requiredStringValidation('firstName'),
  lastName: requiredStringValidation('lastName'),
  password: requiredStringValidation('password'),
  role: Joi.string()
    .valid(...role)
    .optional(),
});

export { login, userRegister };
