module.exports = {
  publicPath: "./",
  devServer: {
    port: 8081,
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://localhost:8000/", // 对应自己的接口
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",

        assets: "@/assets",
        views: "@/views",
      },
    },
  },
  productionSourceMap: false,
  assetsDir: "static",
};
