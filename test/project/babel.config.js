module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.11'
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['transform-postcss']
}
