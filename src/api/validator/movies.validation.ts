import Joi from 'joi';

const movie = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'any.required': 'Title is required',
  }),
  genre: Joi.string().required().messages({
    'string.base': 'Genre must be a string',
    'any.required': 'Genre is required',
  }),
  rating: Joi.number().required().messages({
    'number.base': 'Rating must be a number',
    'any.required': 'Rating is required',
  }),
  streamingLink: Joi.string().required().messages({
    'string.base': 'Streaming link must be a string',
    'any.required': 'Streaming link is required',
  }),
});

const paginationValidator = Joi.object({
  page: Joi.number().optional().messages({
    'number.base': 'Page must be a number',
    'any.required': 'Page is required',
  }),
  limit: Joi.number().optional().messages({
    'number.base': 'Limit must be a number',
    'any.required': 'Limit is required',
  }),
});

const paginatedSearchValidator = Joi.object({
  q: Joi.string().optional().messages({
    'string.base': 'Search query must be a string',
    'any.required': 'Search query is required',
  }),
  page: Joi.number().optional().messages({
    'number.base': 'Page must be a number',
    'any.required': 'Page is required',
  }),
  limit: Joi.number().optional().messages({
    'number.base': 'Limit must be a number',
    'any.required': 'Limit is required',
  }),
});

const idValidation = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Id must be a string',
    'any.required': 'Id is required',
  }),
});

export { movie, paginationValidator, paginatedSearchValidator, idValidation };
