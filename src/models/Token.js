import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from '../models/User.js'
class Token extends Model { }

Token.init(
  {
    token: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM('ACCESS', 'REFRESH')
      },
      expires: {
        type: DataTypes.DATE
      },
      blacklisted: {
        type: DataTypes.BOOLEAN
      },
  },
  {
    sequelize,
    modelName: 'Token',
  },
);
Token.belongsTo(User, { foreignKey: 'userId' });
export default Token;
