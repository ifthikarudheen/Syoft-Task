import express from 'express';
import authRoute from './auth.route.js';
import prodRoute from './prod.route.js'
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/product',
    route: prodRoute
  }
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;
