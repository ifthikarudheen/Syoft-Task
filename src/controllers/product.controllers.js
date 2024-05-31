import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { productService } from '../services/index.js';


const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
 
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Product not found' });
  }
  res.send(product);
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
  
};

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.id, req.body);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Product not found' });
  }
  res.send(product);
});

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProductById(req.params.id);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Product not found' });
  }
  res.status(httpStatus.NO_CONTENT).send("deleted successfully");
  } catch (error) {
    console.error(error)
    res.status(500).send('wrongg')
  }
  
};

export default { createProduct, getProduct, updateProduct, deleteProduct };
