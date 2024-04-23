module.exports = {
  presets: ['next/babel', '@babel/preset-react'],

  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        "@": ".",  // adjust this path to match the real path in your project
      }
    }]
  ]
};