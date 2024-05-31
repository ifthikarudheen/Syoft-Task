import app from './app.js';
import config from './config/database.js';
import db from './config/database.js';
import http from 'http';
const server = http.createServer(app);

db.authenticate()
  .then(() => {
    console.log('Database connected');
    server.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

//   const exitHandler = () => {
//     if (server) {
//       server.close(() => {
//         console.log('Server closed');
//         process.exit(1);
//       });
//     } else {
//       process.exit(1);
//     }
// const unexpectedErrorHandler = (error) => {
//   console.error(error);
//   exitHandler();
// };

// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
