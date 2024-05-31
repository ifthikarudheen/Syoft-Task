import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    inventoryCount: Joi.number().required().min(0),
  })
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().required()
  })
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
  body:Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    inventoryCount: Joi.number().min(0)
  }).or('title', 'description', 'inventoryCount')
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().required()
  })
};

export default {
  create,
  getProduct,
  update,
  deleteProduct
};
