import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

// Custom validation pipe using Joi
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      // Throw error if validation fails
      throw new BadRequestException(error.details[0].message);
    }
    return value;  // Return the validated value
  }
}

// Joi validation schemas for sign-up and sign-in

// Schema for user registration (sign-up)
export const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

// Schema for user login (sign-in)
export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
});
