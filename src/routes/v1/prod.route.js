import express from 'express';
import validate from '../../middlewares/validate.js';
import productValidation from '../../validations/product.validation.js';
import controllers from '../../controllers/index.js';
import auth from '../../middlewares/auth.js'
const { productController } = controllers;

const router = express.Router();

router.post('/create',auth('createProducts'), validate(productValidation.create), productController.createProduct);
router.get('/:id',auth('getProducts'), validate(productValidation.getProduct), productController.getProduct);
router.put('/:id/update',auth('updateProducts') ,validate(productValidation.update), productController.updateProduct);
router.delete('/:id/delete',auth('deleteProducts'), validate(productValidation.delete), productController.deleteProduct);

export default router;
