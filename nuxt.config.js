import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
import mainService from "./services/main-service"

export default {
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { hid: "title", name: "title", content: "On Collaboration." },
      {
        hid: "description",
        name: "description",
        content:
          "On Collaboration es un proyecto cultural en formato de programa radiofónico en torno a la colaboración."
      },

      // google
      { itemprop: "name", content: "On Collaboration." },
      { itemprop: "image", content: "/rrss/REDES_insta_1.jpg" },
      {
        itemprop: "description",
        content:
          "On Collaboration es un proyecto cultural en formato de programa radiofónico en torno a la colaboración."
      },

      // twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "On Collaboration." },
      {
        name: "twitter:description",
        content:
          "On Collaboration es un proyecto cultural en formato de programa radiofónico en torno a la colaboración."
      },
      { name: "twitter:image:src", content: "/rrss/XXXX.jpg" },

      // graph data
      { property: "og:title", content: "On Collaboration." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://oncollaboration.net/" },
      { property: "og:image", content: "/rrss/XXXX.jpg" },
      {
        property: "og:description",
        content:
          "On Collaboration es un proyecto cultural en formato de programa radiofónico en torno a la colaboración."
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "normalize.css/normalize.css",
    "~assets/fonts/consolas/stylesheet.css",
    "~assets/style/app.styl",
    "~assets/styles/fonts.scss",
    "@/assets/scss/style.scss"
    // '~assets/default/default.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vuetify", "~/plugins/filters.js", "~/plugins/axios"],
  axios: {
    proxy: false // Can be also an object with default options
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-138988521-1"
      }
    ]
  ],

  /*
   ** Build configuration
   */
  mode: "spa",
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    /*   routes: () =>
    {
      let routes = [];
      Promise.all([
        mainService.getPosts_Data(), // 0
        // mainService.getCategories_Data(), // 1
      ])
        .then((res) => {
          console.log(res);
          res[0].data.map((post) => {
            routes.push('/' + post.slug);
          });
          // res[1].data.map((cat) => {
          //   routes.push('/category/' + cat.slug);
          // });
        })
    }*/
    /* routes:[
   '/delfin',
   '/la-espada',
   '/canteria',
   '/52-lados',
 ]*/
  }
};
