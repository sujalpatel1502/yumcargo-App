module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins:[
    [
      'module-resolver',
      {
        root:['./src'],
        alias:{
          "@assets":'./src/assets',
          "@features":'features',
          "@service":'service',
          "@navigation":'navigation',
          "@components":'components',
          "@state":'state',
          "@utils":'utils',
        }
      }
    ]
  ]

};
