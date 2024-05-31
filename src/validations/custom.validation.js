import Joi from 'joi';

const password = Joi.extend((joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.password': 'password must be a string',
      'string.minimum': 'password must be at least 8 characters',
      'string.complexity': 'password must contain at least 1 letter and 1 number',
    },
    rules: {
      password: {
        method() {
          return this.$_addRule({ name: 'password' });
        },
        validate(value, helpers) {
          if (typeof value !== 'string') {
            return helpers.error('string.password');
          }
          if (value.length < 8) {
            return helpers.error('string.minimum');
          }
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return helpers.error('string.complexity');
          }
          return value;
        },
      },
    },
  };
});

export default password;
