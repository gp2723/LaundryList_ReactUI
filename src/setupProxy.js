const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/login', 
//     createProxyMiddleware({
//       target: 'http://ec2-54-224-53-11.compute-1.amazonaws.com:8000/', 
//       // target: 'http://localhost:5001'
//       changeOrigin: true,
//       secure: false, 
//     })
//   );
// };
