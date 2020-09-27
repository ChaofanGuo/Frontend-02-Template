module.exports = {
  // entry: './main.js',
  entry: './animation.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // Add JSX plugin and set create function to 'createElement'
            plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]]
          }
        }
      }
    ]
  },
  mode: 'development'
}
