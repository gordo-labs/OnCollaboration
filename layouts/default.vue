<template>
  <v-content :class="$style.base">
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

    <navigation ref="navBar" :class="$style['nav-bar']"></navigation>
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
      isLoading: false
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
      document.documentElement.style.setProperty(
        "--navBarHeight",
        `${height}px`
      );
      return height;
    }
  }
};
</script>

<style lang="scss" module>
.base {
  display: block;
  background-color: $pr-bg;
}
.floating-title {
  color: $sc;
  font-size: 15px;
  font-weight: 600;
  font-family: "Consolas", Helvetica;
  text-align: right;
}
.main-content {
  background-color: $pr-bg;
  display: block;
  z-index: 1;
  height: calc(100vh - var(--navBarHeight));
  height: 100vh;
  /*height: calc(var(--vh, 1vh) * 100 - var(--navBarHeight));*/
}
.nav-bar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: white;
  box-shadow: 0px -2px 1px solid black !important;
  z-index: 10;
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
