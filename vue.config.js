module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bicing-vue/'
    : '/',
  devServer: {
    https: true
  }
}
