const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // hoặc bất kỳ tiền tố điểm cuối API nào của bạn
    createProxyMiddleware({
      target: 'http://localhost:3001', // Thay đổi thành URL backend của bạn
      changeOrigin: true,
    })
  );
};