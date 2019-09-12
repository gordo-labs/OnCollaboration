<template>
  <v-container :class="$style['base']">
    <div :class="$style['tabs-line']">
      <img src="~/assets/images/ON_arrows_tabs_line_left.svg" />
      <img src="~/assets/images/ON_arrows_tabs_line_right.svg" />
    </div>

    <v-tabs
      v-model="tab"
      color="transparent"
      center-active
      :class="$style['tabs-style']"
    >
      <v-tab :class="$style['tab-style']"></v-tab>
      <v-tab :class="$style['tab-style']"></v-tab>
      <v-tab
        v-for="item in posts"
        :key="item.fields.title"
        :class="$style['tab-style']"
      >
        <div :class="$style['tab-line']"></div>
        <p>
          {{ item.fields.title }}
        </p>
      </v-tab>
      <v-tab :class="$style['tab-style']"></v-tab>
      <v-tab :class="$style['tab-style']"></v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="mt-4">
      <v-content
        v-for="item in posts"
        v-if="item"
        :class="{ [$style.isRecorded]: item.fields.recorded }"
      >
        <v-tab-item
          :key="item.fields.title"
          :class="[$style['tab-content']]"
          class="mx-1 my-3"
        >
          <v-card flat color="transparent">
            <v-card-text :class="$style['subtitle']">
              {{ item.fields.subTitle }}
            </v-card-text>
            <v-card-text
              v-if="item.fields.recorded"
              v-html="documentToHtmlString(item.fields.programa)"
              :class="$style['tab-content-inner']"
            >
            </v-card-text>
          </v-card>

          <nuxt-link :to="'/opencol'">
            <v-card
              v-if="item.fields.recorded"
              class="ma-3 pa-3"
              :class="$style['tab-cta']"
              :to="'/' + 'podcasts'"
            >
              PLAY PODCASTS
            </v-card>

            <v-card
              v-if="!item.fields.recorded"
              class="ma-3 pa-3"
              :class="$style['tab-cta']"
            >
              OPEN CALL
            </v-card>
          </nuxt-link>
        </v-tab-item>
      </v-content>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import TitleImage from "../../components/titleImage";

export default {
  name: "program",
  components: { TitleImage },
  data: () => ({
    size: "sm",
    tab: null,
    documentToHtmlString: documentToHtmlString,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    model: 0,
    showArrows: true,
    hideDelimiters: true,
    cycle: true
  }),
  computed: {
    posts() {
      let programas = this.$store.state.programa;
      // let add = [{},{},{}];
      // return [...add, programas, ...add];
      return programas;
    },
    title() {
      return this.$store.state.title;
    }
  },
  created() {
    console.log("style", this.$style.isRecorded);
    this.$store.dispatch("getEntriesAction", "programa");
    this.$store.commit("setTitle", "PROGRAMAS");
    this.$store.commit("setHeader", true);
  }
};
</script>

<style scoped lang="scss">
.image-container {
  width: 40vw !important;
  img {
    width: 100%;
  }
}

.v-tabs__div {
  width: 200px;
}
</style>

<style module lang="scss">
:root {
  --pr: #4c4885;
}

.base {
  position: relative;
}

.tabs-line {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  width: 3px;
  height: 75px;
  background-color: $sc;
  z-index: 1000;
  img {
    height: 10px;
    width: auto;
    position: absolute;
    top: 55px;
  }
  img:first-child {
    left: -35px;
  }
  img:last-child {
    left: 18px;
  }
}

.floating-title {
  color: $sc;
  font-size: 11px;
  font-family: "Consolas", Helvetica;
}

.isRecorded {
  --pr: #d13b54;
}

.tab-style {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~assets/images/ON_dot.svg");
  background-size: 20px 30px;
  background-repeat: repeat-x;
  background-position-x: center;
  a {
    flex-direction: column;
    padding-bottom: 2px;
  }
  p {
    color: $pr;
    margin: 0;
  }
  .tab-line {
    margin-top: 2px;
    width: 3px;
    height: 30px;
    margin-bottom: 6px;
    background-color: $pr;
    z-index: 1000;
  }
}

.tabs-style {
  position: relative;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0.8) 26%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.8) 74%,
    rgba(255, 255, 255, 0) 90%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
  .v-tabs__div {
    background-image: url("~assets/images/ON_dot.svg");
    background-size: 20px 30px;
    background-repeat: repeat-x;
    background-position-x: center;
  }
}

.tab-content {
  background-color: white;
  border: 10px solid var(--pr);
  font-family: "Consolas", Helvetica;
  color: var(--pr);
  .tab-content-inner {
    color: var(--pr);
  }
  .subtitle {
    color: var(--pr);
    font-weight: 800;
    font-size: 18px;
    text-align: center;
  }
  .tab-cta {
    background-color: var(--pr);
    display: flex;
    justify-content: center;
    color: white;
    &::before {
      height: 4px;
      width: 50%;
      background-color: var(--pr);
      margin-bottom: 5px;
    }
  }
}
</style>
