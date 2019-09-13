<template>
  <v-content :class="$style.base">
    <v-content :class="$style.main">
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
    </v-content>

    <v-footer padless :class="$style.footer">
      <v-row justify="center" no-gutters class="my-2">
        <v-btn
          v-for="link in links"
          :key="link"
          flat
          class="my-2"
        >
          <a :href="link.link">
            {{ link.text }}
          </a>
        </v-btn>
      </v-row>
      <v-row class="my-2">
        <strong>On Collaboration</strong>
      </v-row>
    </v-footer>
  </v-content>
</template>

<script>
// set virtual height
import TitleImage from "../components/titleImage";
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
        { text: "Redes", link: "programas" },
        { text: "Ivoox", link: "podcasts" },
        { text: "Itunes", link: "opencol" },
        { text: "Spotify", link: "eventos" }
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
  created() {},
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
  height: 100vh;
}

.footer {
  background-color: $pr-bg;
  *{
    color: $pr;
  }
  font-size: 15px;
  font-weight: 600;
  font-family: "Consolas", Helvetica;
  text-align: right;
  justify-content: center;
  display: none;
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
  height: 100vh;
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
}
</style>

<style lang="scss">
:root {
  --vh: 1vh;
  --navbarHeight: 90px;
  --primary: $pr;
  --pr-bg: $pr-bg;
  --sc: $sc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
  transform-style: preserve-3d;
  height: auto;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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

.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s, transform 0.4s;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  opacity: 1;
}
.page-enter,
.page-leave-active {
  opacity: 0.5;
}
</style>
