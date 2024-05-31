
import Product from '../models/Products.js'


const productService = {
  async createProduct(productData) {
    return await Product.create(productData);
  },

  async getProductById(productId) {
    return await Product.findByPk(productId);
  },

  async updateProductById(productId, newData) {
    const product = await Product.findByPk(productId);
    if (!product) return null;
    await product.update(newData);
    return product;
  },

  async deleteProductById(productId) {
    const product = await Product.findByPk(productId);
    if (!product) return null;
    await product.destroy();
    return product;
  }
};

export default productService;
