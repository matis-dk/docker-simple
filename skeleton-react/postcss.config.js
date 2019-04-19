 module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,  // Handles `.css` && '.sss' files dynamically
    plugins: {
      'postcss-cssnext': {},
      'cssnano':  env === 'production'  ? {
          autoprefixer: false,                           // Already in postcss
          reduceIdents: false                            // Disabling bug where keyframes is getting renamed
      } : false
    }
})
