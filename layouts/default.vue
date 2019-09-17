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

    <v-footer padless :class="$style.footer">
        <div justify="center" no-gutters class="my-2">
          <v-btn v-for="link in links" :key="link.text" flat class="my-2">
            <a :href="link.link">
              {{ link.text }}
            </a>
          </v-btn>
        </div>
        <div class="my-2">
          <strong>On Collaboration dummy text</strong>
        </div>
    </v-footer>
  </v-content>
</template>

<script>
// set virtual height
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

export default {
  components: {
    TitleImage,
    onLoader,
    navigation
  },
  data: () => {
    return {
      isLoading: false,
      links: [
        { text: "Redes", link: "" },
        { text: "Ivoox", link: "https://www.ivoox.com/escuchar-on-collaboration_nq_578636_1.html" },
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
    display: flex;
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
