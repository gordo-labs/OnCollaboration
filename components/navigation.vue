<template>
  <v-content :class="$style['nav-bar']">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="transparent"
      :class="$style.tabs"
      :centered="true"
    >
      <v-tab
        v-for="i in items"
        :key="i.text"
        :href="`#tab-${i}`"
        :class="$style['base-tab']"
        color="#D13B54"
        :to="i.link"
      >
        {{ i.text }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>
    </v-tabs>

    <!--tabs 2-->
    <!--    <v-tabs
      background-color="transparent"
      color="transparent"
      :class="$style.tabs"
      :centered="true"
    >
      <v-tab :class="$style['base-tab']" color="#D13B54">
        <a
          href="https://www.ivoox.com/escuchar-on-collaboration_nq_578636_1.html"
          target="_blank"
        >
          Redes
          <v-icon v-if="icons">mdi-phone</v-icon>
        </a>
      </v-tab>
      <v-tab :class="$style['base-tab']" color="#D13B54">
        <a
          href="https://www.ivoox.com/escuchar-on-collaboration_nq_578636_1.html"
          target="_blank"
        >
          Ivoox
          <v-icon v-if="icons">mdi-phone</v-icon>
        </a>
      </v-tab>
      <v-tab :class="$style['base-tab']" color="#D13B54">
        <a
          href="https://www.ivoox.com/escuchar-on-collaboration_nq_578636_1.html"
          target="_blank"
        >
          Itunes
          <v-icon v-if="icons">mdi-phone</v-icon>
        </a>
      </v-tab>
      <v-tab :class="$style['base-tab']" color="#D13B54">
        <a
          href="https://www.ivoox.com/escuchar-on-collaboration_nq_578636_1.html"
          target="_blank"
        >
          Spotify
          <v-icon v-if="icons">mdi-phone</v-icon>
        </a>
      </v-tab>
    </v-tabs>-->
  </v-content>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  name: "program",
  data: () => ({
    size: "sm",
    tab: null,
    icons: true,
    documentToHtmlString: documentToHtmlString,
    items: [
      { text: "Programas", link: "programas" },
      { text: "Podcasts", link: "podcasts" },
      { text: "Eventos", link: "eventos" },
      { text: "Open Col", link: "opencol" }
    ]
  })
};
</script>

<style module lang="scss">
.nav-bar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: white;
  box-shadow: 0px -2px 1px solid black !important;
  z-index: 10;
  @include media(ML) {
    position: absolute;
    background-color: $pr-bg;
    height: 50px;
    top: 30px;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    .tabs{
      padding: 0 20px;
    }
  }
}
.tabs {
}
.base-tab {
  font-size: 13px;
  color: $sc !important;
  a {
    color: $sc !important;
    text-decoration: none;
  }
}
</style>
