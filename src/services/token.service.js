import jwt from 'jsonwebtoken';
import moment from 'moment';
import Token from '../models/Token.js';

import dotenv from 'dotenv';
dotenv.config();

const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const createdToken = await Token.create({
      token,
      userId: userId,
      expires: expires.toDate(),
      type,
      blacklisted
    
  });
  return createdToken;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = Number(payload.sub);
  const tokenData = await Token.findOne({
    where: { token, type, userId, blacklisted: false }
  });
  if (!tokenData) {
    throw new Error('Token not found');
  }
  return tokenData;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, 'ACCESS');

  const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, 'REFRESH');
  await saveToken(refreshToken, user.id, refreshTokenExpires, 'REFRESH');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
