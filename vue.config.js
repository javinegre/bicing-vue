module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bicing/'
    : '/',
  devServer: {
    https: true
  }
}
