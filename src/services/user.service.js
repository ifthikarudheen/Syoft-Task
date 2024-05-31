import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import Users from '../models/User.js'
import { encryptPassword, isPasswordMatch } from '../utils/encryption.js';
// import { userService } from '../services/index.js';


const createUser =async (req, res) => {
  const { username,email,  password, role } = req.body;
  const encryptedPassword = await encryptPassword(password);
  const user = await Users.create({email, password:encryptedPassword, username, role});
  console.log(user)
  return user;
};
const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  });

  // Assuming you've defined your Sequelize User model in a separate file

const getUserByEmail = async (email, keys = [
  'email',
  'password',

]) => {
  
    const user = await Users.findOne({
      where: { email },
      attributes: keys
    });
    return user ? user.toJSON() : null;
  } 

  
export default {
    createUser,
    getUser,
    getUserByEmail
}
