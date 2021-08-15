module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/helpers/_variables.scss";
          @import "@/scss/helpers/_mixins.scss";
        `,
      },
    },
  },
}
