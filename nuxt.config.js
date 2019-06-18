import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
const contentfulConfig = require('./.contentful.json');

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
    routes () {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          'content_type': ctfConfig.CTF_BLOG_POST_TYPE_ID
        }),
        // get the blog post content type
        cmaClient.getSpace(ctfConfig.CTF_SPACE_ID)
          .then(space => space.getContentType(ctfConfig.CTF_BLOG_POST_TYPE_ID))
      ])
        .then(([entries, postType]) => {
          return [
            // map entries to URLs
            ...entries.items.map(entry => `/blog/${entry.fields.slug}`),
            // map all possible tags to URLs
            ...postType.fields.find(field => field.id === 'tags').items.validations[0].in.map(tag => `/tags/${tag}`)
          ]
        })
    }
  }
};
