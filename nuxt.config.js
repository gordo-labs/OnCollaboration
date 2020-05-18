import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
import pkg from "./package";
import mainService from "./services/main-service";
const contentfulConfig = require("./.contentful.json");

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

      { hid: "title", name: "title", content: "On Collaboration" },
      {
        hid: "description",
        name: "description",
        content:
          "On Collaboration es un proyecto cultural en formato de programa radiofónico en torno a la colaboración."
      },

      // google
      { itemprop: "name", content: "On Collaboration." },
      { itemprop: "image", content: "/rrss/ON_base.png.jpg" },
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
      { name: "twitter:image:src", content: "/rrss/ON_ICON_MAIN.svg" },

      // graph data
      { property: "og:site_name", content: "On Collaboration" },
      { property: "og:title", content: "On Collaboration" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "http://oncollaboration.net/" },
      { property: "og:image", itemprop:"image", content: "/rrss/ON_base.png" },
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
      },
    ],
    script: [
      {
        type: "text/javascript",
        src:
          "//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js",
        ["data-dojo-config"]: "usePlainJson: true, isDebug: false"
      }
    ]
  },
  // middleware: ['auth', 'stats']

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#D13B54" },

  /*
   ** Global CSS
   */
  css: [
    "normalize.css/normalize.css",
    "~assets/fonts/consolas/stylesheet.css",
    "~assets/styles/root.scss",
    "~assets/style/app.styl"
  ],

  styleResources: {
    scss: [
      "assets/scss/base/_variables.scss",
      "assets/scss/base/_medias.scss",
      "assets/scss/helpers/_mixins.scss",
      "assets/scss/helpers/_m-fonts.scss",
      "assets/scss/helpers/_animations.scss"
    ]
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "~/plugins/filters.js",
    "~/plugins/moment.js",
    "~/plugins/vue-audio-visual.js",
    "~/plugins/axios",
    "~/plugins/mailchimp",
    "~/plugins/mixins",
  ],
  axios: {
    proxy: false // Can be also an object with default options
  },

  /*
  Environment export Contenful
   */
  env: {
    CTF_SPACE_ID: contentfulConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: contentfulConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_CDA_PREVIEW_ACCESS_TOKEN: contentfulConfig.CTF_CDA_PREVIEW_ACCESS_TOKEN,
    CTF_PERSON_ID: contentfulConfig.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: contentfulConfig.CTF_BLOG_POST_TYPE_ID
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-148177375-1",
        autoTracking: {
          screenview: true
        }
      }
    ],
    "@nuxtjs/style-resources",
    "@nuxtjs/moment"
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
    // routes() {
    //   return Promise.all([
    //     // get all blog posts
    //     client.getEntries({
    //       content_type: env.CTF_BLOG_POST_TYPE_ID
    //     }),
    //     // get the blog post content type
    //     client
    //       .getSpace(env.CTF_SPACE_ID)
    //       .then(space => space.getContentType(env.CTF_BLOG_POST_TYPE_ID))
    //   ]).then(([entries, postType]) => {
    //     return [
    //       // map entries to URLs
    //       ...entries.items.map(entry => `/blog/${entry.fields.slug}`),
    //       // map all possible tags to URLs
    //       ...postType.fields
    //         .find(field => field.id === "tags")
    //         .items.validations[0].in.map(tag => `/tags/${tag}`)
    //     ];
    //   });
    // }
    routes: async () => {
      let routes = [];
      const programas = await mainService.getEntriesByType('programa');
      const podcasts = await mainService.getEntriesByType('programa');
      console.log(programas,podcasts);
      programas.items.map(el=>{
        routes.push('/programas/' + el.sys.id);
      });
      podcasts.items.map(el=>{
        routes.push('/podcast/' + el.sys.id);
      });
      return routes;
    }
  }
};
