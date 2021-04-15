module.exports = {
  devServer: {
    disableHostCheck: true
  }
  publicPath: process.env.SPA_MODE === 'true'
    ? '/'
    : '',
};
