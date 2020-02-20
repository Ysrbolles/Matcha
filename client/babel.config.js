module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "env": {
    "development": {
      "plugins": ["transform-class-properties"]
    }
  }
}
