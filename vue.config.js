const { defineConfig } = require("@vue/cli-service");
const BASE_URL = process.env.BASE_URL;

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/solvami/" : "/",
  //publicPath: "/solvami/",
  transpileDependencies: true,

  lintOnSave: false,
});
