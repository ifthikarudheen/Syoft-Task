import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
class Products extends Model { }

Products.init(
  {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      inventoryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
  },
  {
    sequelize,
    modelName: 'Products',
  },
);
export default Products;
