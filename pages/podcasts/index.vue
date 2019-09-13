<template>
  <v-container :class="$style['base']">
    <!--    <div :class="$style['tabs-line']">
      <img src="~/assets/images/ON_arrows_tabs_line_left.svg" />
      <img src="~/assets/images/ON_arrows_tabs_line_right.svg" />
    </div>-->

    <div :class="$style['tabs-line_mobile']" ref="selector"></div>

    <v-tabs
      v-model="tab"
      color="transparent"
      centered
      :center-active="true"
      :class="$style['tabs-style']"
      class="mb-5"
    >
      <v-tabs-slider> </v-tabs-slider>

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
          <v-content v-for="podcast in item.fields.podcastsRef">
            <v-card flat color="transparent">
              <v-card-text :class="$style['subtitle']">
                {{ podcast.fields.title }}
              </v-card-text>
              <v-card-text
                v-if="podcast.fields.content"
                v-html="documentToHtmlString(podcast.fields.content)"
                :class="$style['tab-content-inner']"
              >
              </v-card-text>
              <v-card-text
                v-if="podcast.fields.iframeJson"
                v-html="documentToHtmlString(decodeURI(podcast.fields.iframeJson.iframe))"
                :class="$style['tab-content-inner']"
              >
                {{decodeURI(podcast.fields.iframeJson.iframe)}}
              </v-card-text>
            </v-card>
          </v-content>
        </v-tab-item>
      </v-content>
    </v-tabs-items>
<!--

    <iframe
      :class="$style.ivooxElement"
      id="audio_38494735"
      frameborder="0"
      allowfullscreen="no"
      scrolling="no"
      height="200"
      style="border:1px solid #EEE; box-sizing:border-box; width:100%;"
      src="https://www.ivoox.com/player_ej_38494735_4_1.html"
    ></iframe>
-->

    <!--
    <wave-audio input="http://podcastcdn-23.ivoox.com/audio/5/3/7/4/on0101historiascolaboracion-oncollaboration-ivoox38494735.mp3?secure=nSFcR_9-hjJbDfTfD54DmQ==,1568313895">
    </wave-audio>
-->
  </v-container>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import TitleImage from "../../components/titleImage";
import WaveAudio from "../../components/wave-audio";
export default {
  name: "podcast",
  components: { WaveAudio, TitleImage },
  data: () => ({
    tab: null,
    documentToHtmlString: documentToHtmlString
  }),
  computed: {
    posts() {
      let programas = this.$store.state.programa;
      return programas;
    },
    title() {
      return this.$store.state.title;
    }
  },
  created() {
    this.$store.dispatch("getEntriesAction", "programa");
    this.$store.commit("setTitle", "PODCASTS");
    this.$store.commit("setHeader", true);
  },
  mounted() {
    let slider = document.getElementsByClassName("v-tabs__slider-wrapper");
    console.log(slider);
    slider[0].appendChild(this.$refs.selector);
  }
};
</script>

<style lang="scss">
.tabs {
  .v-tabs__div {
    background-image: url("~assets/images/ON_dot.svg");
    background-size: 20px 30px;
    background-repeat: repeat-x;
    background-position-x: center;
  }
  .v-tabs__slider-wrapper {
  }

  .v-tabs__wrapper {
    overflow: visible !important;
    contain: inherit !important;
  }
}
</style>

<style module lang="scss">
.floating-title {
  position: fixed;
  color: $sc;
  left: 15%;
  top: 12%;
  font-size: 11px;
  font-family: "Consolas", Helvetica;
  transform: rotate(-15deg);
}

.ivooxElement {
  .fullscreen-modal {
    display: none !important;
  }
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
  @include media(ML) {
    display: none;
  }
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

.tabs-line_mobile {
  position: absolute;
  left: 50%;
  top: -80px;
  transform: translateX(-50%);
  width: 5px;
  height: 58px;
  background-color: $sc;
  z-index: 10000;
  img {
    height: 10px;
    width: auto;
    position: absolute;
    top: 10px;
  }
  img:first-child {
    left: -33px;
  }
  img:last-child {
    left: 18px;
  }
}

.tab-style {
  min-width: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~assets/images/ON_dot.svg");
  background-repeat: repeat-x;
  background-position-x: center;
  background-size: 15px 20px;
  @include media(ML) {
    background-size: 20px 30px;
    min-width: 150px;
  }
  &:first-child {
    padding-left: 400px;
  }
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
</style>
