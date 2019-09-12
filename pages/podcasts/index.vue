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
      class="mb-5"
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


    <iframe
      :class="$style.ivooxElement"
      id="audio_38494735"
      frameborder="0"
      allowfullscreen="no"
      scrolling="no"
      style="border:1px solid #EEE; box-sizing:border-box; width:100%;"
      src="https://www.ivoox.com/player_ej_38494735_4_1.html"
    ></iframe>

    <!--
    <wave-audio input="http://podcastcdn-23.ivoox.com/audio/5/3/7/4/on0101historiascolaboracion-oncollaboration-ivoox38494735.mp3?secure=nSFcR_9-hjJbDfTfD54DmQ==,1568313895">
    </wave-audio>
-->
  </v-container>
</template>

<script>
import TitleImage from "../../components/titleImage";
import WaveAudio from "../../components/wave-audio";
export default {
  name: "podcast",
  components: { WaveAudio, TitleImage },
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
    this.$store.commit("setHeader", false);
  }
};
</script>

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

</style>
