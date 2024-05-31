import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
class Users extends Model { }

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'manager', 'staff'),
        allowNull: false
      }
  },
  {
    sequelize,
    modelName: 'Users',
  },
);
export default Users;
