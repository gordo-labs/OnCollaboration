<template>
  <v-container :class="$style['base']">
    <!--    <div :class="$style['tabs-line']">
      <img src="~/assets/images/ON_arrows_tabs_line_left.svg" />
      <img src="~/assets/images/ON_arrows_tabs_line_right.svg" />
    </div>-->

    <div :class="$style['tabs-line_mobile']" ref="selector" v-show="isRadioLineShown"></div>

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
        <!--        <div v-if="item.fields.programa" v-html="item.fields.programa.content[1].content"></div>-->

        <v-tab-item :key="item.fields.title" class="mx-1 my-3">
          <v-content class="mb-5" :class="$style.programTitle">
            <h1>{{ item.fields.title }}</h1>
            <h2>{{ item.fields.subTitle }}</h2>
          </v-content>
          <v-content class="mb-5" :class="$style['tab-content']" v-if="!item.fields.podcastsRef">
            <v-card-text>Ver que queremos aqui</v-card-text>
          </v-content>
          <v-content
            v-for="podcast in item.fields.podcastsRef"
            :class="[$style.podcastContainer, $style['tab-content']]"
          >
            <audio :id="'player' + podcast.fields.id" controls>
              {{ createPlyr(podcast.fields.id) }}
              <source
                src="http://podcastcdn-23.ivoox.com/audio/5/3/7/4/on0101historiascolaboracion-oncollaboration-ivoox38494735.mp3"
                type="audio/mp3"
              />
            </audio>
<!--
            <v-content>
              {{ documentToHtmlString(podcast.fields.iframeContent) }}
              {{ logPodcast(podcast.fields) }}
            </v-content>-->

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


            </v-card>

<!--            LINE-->
<!--          <v-content class="my-5" :class="$style.line">-->

<!--          </v-content>-->

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
import { mixinDetictingMobile } from "../../plugins/mixins";

export default {
  name: "podcast",
  components: { WaveAudio, TitleImage },
  mixins: [mixinDetictingMobile],
  head() {
        return {
            title: 'Podcasts',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "Podcasts",
                    content: "Podcasts | On Collaboration"
                }
            ],
            link: [
                {
                    rel: "stylesheet",
                    href: "https://cdn.plyr.io/3.5.6/plyr.css"
                }
            ]
        };
    },
  data: () => ({
    tab: null,
    documentToHtmlString: documentToHtmlString,
    waves: {},
      isRadioLineShown: null,
    playpause: "play"
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
    slider[0].appendChild(this.$refs.selector);
  },
  methods: {
    createPlyr(id) {
      this.$nextTick(() => {
        this.plyr = new this.$plyr("#player" + id);
      });
    },
    logPodcast(podcast) {
      console.log("PODCASTS = >", podcast);
    },
    createWave(id, url) {
      console.log(id, url);
      this.$nextTick(() => {
        this.waves[id] = this.$wavesurfer.create({
          container: "#" + "wave" + id,
          waveColor: "#D13B54",
          progressColor: "#4c4885"
        });
        this.waves[id].load(url);
      });
    },
    wavePlay(id) {
      this.waves[id].playPause();
      if (this.playpause === "play") {
        this.playpause = "pause";
      } else {
        this.playpause = "play";
      }
    },
    waveStop(id) {
      this.waves[id].stop();
    }
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

}
  .v-tabs__wrapper {
    overflow: inherit !important;
    contain: inherit !important;
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

.programTitle {
  text-align: center;
  color: $sc;
  h1 {
    margin: 2px 0;
  }
  h2 {
    font-size: 15px;
  }
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
  top: -60px;
  transform: translateX(-50%);
  width: 5px;
  height: 38px;
  background-color: $sc;
  z-index: 10000;
  @include media(ML) {
    top: -80px;
    height: 58px;
  }
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

.tab-content {
  max-width: 600px !important;
  margin: 0 auto;
}

.line{
  background-color: $sc;
  height: 3px;
}

.podcastContainer {
  margin-bottom: 20px;
  padding-bottom: 20px;
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
