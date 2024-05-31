// passport.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import  User  from '../models/User.js'; 
import dotenv from 'dotenv';
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// JWT strategy
const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findByPk(payload.sub);
    console.log(user)
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new JwtStrategy(jwtOptions, jwtVerify));

export default passport;
