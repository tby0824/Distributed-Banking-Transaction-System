const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://localhost:4001',
            changeOrigin: true,
            pathRewrite: { '^/auth': '' }
        })
    )
    app.use(
        '/accounts',
        createProxyMiddleware({
            target: 'http://localhost:4002',
            changeOrigin: true,
            pathRewrite: { '^/accounts': '' }
        })
    )
    app.use(
        '/transactions',
        createProxyMiddleware({
            target: 'http://localhost:4003',
            changeOrigin: true,
            pathRewrite: { '^/transactions': '' }
        })
    )
    app.use(
        '/notifications',
        createProxyMiddleware({
            target: 'http://localhost:4004',
            changeOrigin: true,
            pathRewrite: { '^/notifications': '' }
        })
    )
    app.use(
        '/files',
        createProxyMiddleware({
            target: 'http://localhost:4005',
            changeOrigin: true,
            pathRewrite: { '^/files': '' }
        })
    )
}
