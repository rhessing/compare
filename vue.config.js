module.exports = {
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
  publicPath: process.env.SPA_MODE === 'true'
    ? '/'
    : '',
};
