<template>
  <v-content :class="$style.base">
    <div :class="$style.main" class="pb-5">
      <on-loader :isLoading="isLoading" class="loader"></on-loader>

      <transition name="fade">
        <v-container class="d-flex" v-if="isHeader">
          <title-image></title-image>
          <div class="flex-grow-1"></div>
          <v-content :class="$style['floating-title']">
            <p>{{ title }}</p>
          </v-content>
        </v-container>
      </transition>

      <nuxt :class="$style['main-content']" />

      <navigation ref="navBar"></navigation>
    </div>

    <footer></footer>
  </v-content>
</template>

<script>
// set virtual height
import Footer from "../components/footer";
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
console.log("VIRTUAL HEIGHT UNIT => ", vh);

// resize listener
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  let height = this.$refs.navBar.clientHeight;
  console.log("navbarHeight > ", height);
  document.documentElement.style.setProperty("--navBarHeight", `${height}px`);
});

import TitleImage from "../components/titleImage";
import onLoader from "~/components/onLoader";
import navigation from "~/components/navigation";

const data = () => {
  window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
    L.start({
      baseUrl: "mc.us20.list-manage.com",
      uuid: "b43bf9db8633eada31f656189",
      lid: "8d85b9ca6e",
      uniqueMethods: true
    });
  });
};

export default {
  components: {
    Footer,
    TitleImage,
    onLoader,
    navigation
  },
  head: {
    script: [
      {
      }
    ]
  },

  data: () => {
    return {
      isLoading: false,
      links: [
        { text: "Instagram", link: "" },
        {
          text: "Ivoox",
          link:
            "https://www.ivoox.com/escuchar-on-collaboration_nq_578636_1.html"
        },
        { text: "Itunes", link: "" },
        { text: "Spotify", link: "" }
      ]
    };
  },
  created() {
    let infoArray = [];
    Promise.all(infoArray)
      .then(values => {
        this.$store.commit("setLoading", true);
      })
      .catch(err => {
        this.$store.commit("setError", true);
      });
    this.mailchimp();
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    isHeader() {
      return this.$store.state.isHeader;
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    },
    navBarHeight() {
      this.matchHeight();
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log("tick");
      this.matchHeight();
    });
  },
  methods: {
    matchHeight() {
      let height = this.$refs.navBar.offsetHeight;
      console.log("navbarHeight > ", height);
      document.documentElement.style.setProperty("--navBarHeight", `${50}px`);
      return height;
    },
    mailchimp() {
      window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
        L.start({
          baseUrl: "mc.us20.list-manage.com",
          uuid: "b43bf9db8633eada31f656189",
          lid: "8d85b9ca6e",
          uniqueMethods: true
        });
      });
    }
  }
};
</script>

<style lang="scss" module>
.main {
  min-height: 100vh;
}

.footer {
  * {
    color: $pr;
  }
  background-color: $pr-bg;
  font-size: 15px;
  font-weight: 600;
  font-family: "Consolas", Helvetica;
  text-align: right;
  justify-content: center;
  display: none !important;
  flex-direction: column;
  align-items: center;
  height: 150px !important;
  @include media(ML) {
    display: flex !important;
  }
}

.base {
  display: block;
  background-color: $pr-bg;
  height: auto;
  width: 100vw;
}

.floating-title {
  color: $sc;
  font-size: 15px;
  font-weight: 600;
  font-family: "Consolas", Helvetica;
  text-align: right;
  @include media(ML) {
    font-size: 25px;
    margin-top: 20px;
  }
}
.main-content {
  background-color: $pr-bg;
  display: block;
  z-index: 1;
  max-width: 960px;
}
</style>

<style lang="scss">
@import "@/assets/scss/working.scss";

h1,
h2,
h3,
h4,
h5,
p,
a,
span {
  font-family: "Consolas", Helvetica;
}

.v-btn__content,
.v-toolbar__title,
.v-list__tile__title,
.v-list__tile__title {
  font-family: "Consolas", Helvetica;
}
</style>
