import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { authService, userService, tokenService } from '../services/index.js';
import exclude from '../utils/exclude.js';

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req, res);
    const userWithoutPassword = exclude(user.get({ plain: true }), ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user:userWithoutPassword, tokens });
  } catch (error) {
    console.error(error)
    res.status(500).send('something went wrong')
  }
  
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    console.log("user",user)
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (error) {
    console.log(error)
    res.status(500).send("something went wrong")
  }
 
};

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  } catch (error) {
    console.log(error)
    res.status(500).send('something went wrong')
  }
 
});

export default { register, login, logout, refreshTokens };
