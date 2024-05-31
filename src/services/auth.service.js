import httpStatus from 'http-status';
import tokenService from './token.service.js';
import userService from './user.service.js';
import ApiError from '../utils/ApiError.js';
import Token from '../models/Token.js';
import { isPasswordMatch } from '../utils/encryption.js';
import exclude from '../utils/exclude.js';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email, [
    'id',
    'email',
    'password',
  ]);
  if (!user || !(await isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return exclude(user, ['password']);
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken) => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: 'REFRESH',
      blacklisted: false
    }
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await model.token.delete({ where: { id: refreshTokenData.id } });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, 'REFRESH');
    const { userId } = refreshTokenData;
    await Token.destroy({ where: { id: refreshTokenData.id } });
    return tokenService.generateAuthTokens({ id: userId });
  } catch (error) {
    console.error(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export default {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
