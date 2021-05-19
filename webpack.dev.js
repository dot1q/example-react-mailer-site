const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'debug',
    historyApiFallback: true,
    inline: true,
    contentBase: path.join(__dirname, 'dist', '.'),
    // compress: true,
    port: 9000,
    proxy: {
      '/fakeApi': {
        target: 'https://dev.example.com/public-api/',
        headers: {
          'x-api-key': 'asdfasdfkjsalfkjdsa90fdsaf0sajfksadl',
        },
        pathRewrite: { '^/fakeApi': '' },
        changeOrigin: false,
        secure: false,
      },
    },
    setup(app) {
      app.post('/send-mail', (req, res) => {
        res.json({ result: 'success' });
      });
    },
  },
});
