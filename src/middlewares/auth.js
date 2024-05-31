// auth.js
import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import  roleRights  from '../config/roles.js';

// Verify callback function
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    console.log(user)
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticatee'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role) || [];
    const hasRequiredRights = requiredRights.every((requiredRight) =>
      userRights.includes(requiredRight)
    );
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

// Auth middleware
const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt', // JWT strategy
      { session: false },
      verifyCallback(req, resolve, reject, requiredRights) // Verification callback
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
