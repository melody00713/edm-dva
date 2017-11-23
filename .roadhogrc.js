export default {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ],
      "proxy": {
        "/api": {
          "target": "http://jsonplaceholder.typicode.com/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
      }
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  },
  "theme": "./theme.js"
  //"disableCSSModules": true
}