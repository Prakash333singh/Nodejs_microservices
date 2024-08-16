// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const app = express();

// // Define routes in key-value pairs
// const routes = {
//   "/users": "http://localhost:3000",
//   "/products": "http://localhost:3001",
//   "/orders": "http://localhost:3002",
// };

// // Create a proxy for each route
// for (const route in routes) {
//   const target = routes[route];
//   app.use(route, createProxyMiddleware({ target }));
// }

// const PORT = 8000;

// app.listen(PORT, () => {
//   console.log(`API gateway started on port ${PORT}`);
// });
