<template>
  <v-container :class="$style['base']" class="tabs">
    <transition name="fade">
      <div
        :class="$style['tabs-line_mobile']"
        ref="selector"
        v-show="isRadioLineShown"
      ></div>
    </transition>

    <v-tabs
      v-model="active_tab"
      color="transparent"
      centered
      :center-active="true"
      :class="$style['tabs-style']"
    >
      <v-tabs-slider> </v-tabs-slider>

      <v-tab
        v-for="item in posts"
        :key="item.fields.title"
        :class="$style['tab-style']"
        @click="sendTab(item.fields.title)"
      >
        <div :class="$style['tab-line']"></div>

        <p
          class="animation"
          :class="{ [$style.isRecordedTab]: item.fields.recorded }"
        >
          {{ item.fields.title }}
        </p>
      </v-tab>
    </v-tabs>

    <!--
    <transition name="fade">
      <v-content class="mb-5" :class="$style.programTitle">
        <h1>{{ programTitle }}</h1>
      </v-content>
    </transition>
-->

    <v-tabs-items v-model="active_tab" class="mt-4">
      <v-content
        v-for="item in posts"
        v-if="item"
        :class="{ [$style.isRecorded]: item.fields.recorded }"
      >
        <v-tab-item :key="item.fields.title" class="mx-1 my-3">
          <v-content class="mb-5" :class="$style.programTitle">
            <h1>{{ item.fields.title }}</h1>
            <h2>{{ item.fields.subTitle }}</h2>
          </v-content>
          <v-content :class="[$style['tab-content']]">
            <v-card flat color="transparent">
              <!--              <v-card-text :class="$style['subtitle']">
                {{ item.fields.subTitle }}
              </v-card-text>-->
              <v-card-text
                v-html="documentToHtmlString(item.fields.programa)"
                :class="$style['tab-content-inner']"
              >
              </v-card-text>
            </v-card>

            <!--            <nuxt-link :to="'/' + 'programas'">
              <v-card
                v-if="item.fields.recorded"
                class="ma-3 pa-3"
                :class="$style['tab-cta']"
                flat
                :to="'/podcasts/' + item.fields.title"
              >
                VER PODCASTS
              </v-card>
            </nuxt-link>-->

            <nuxt-link :to="'/' + 'opencol'">
              <v-card
                flat
                v-if="!item.fields.recorded"
                class="ma-3 pa-3"
                :class="$style['tab-cta']"
              >
                OPEN COL
              </v-card>
            </nuxt-link>
          </v-content>

          <!-- PODCASTS -->

          <v-content :class="$style.podcasts" v-if="item.fields.podcastsRef">
            <v-content class="my-5" :class="$style.programTitle">
              <h1>PODCASTS</h1>
            </v-content>

            <v-content v-for="podcast in item.fields.podcastsRef" class="mt-5">
              <div :class="$style.upperinfo" class="mb-3">
                <img
                  v-if="podcast.fields.icono"
                  :src="podcast.fields.icono.fields.file.url"
                />
                <v-card-text :class="$style['subtitle']">
                  <p :class="$style.title">{{ podcast.fields.title }}</p>
                  <p>{{ podcast.fields.subtitle }}</p>
                </v-card-text>
                <audio
                  v-if="podcast.fields.audio"
                  :id="'player' + podcast.fields.id"
                  controls
                >
                  {{ createPlyr(podcast.fields.id) }}
                  <source
                    :src="podcast.fields.audio[0].fields.file.url"
                    type="audio/mp3"
                  />
                </audio>
              </div>

              <v-content
                :class="[$style.podcastContainer, $style['tab-content']]"
                class="mt-4"
              >
                <div :class="$style['links-container']">
                  <a
                    v-if="podcast.fields.itunesUrl"
                    :class="$style['ivoox-link']"
                    :href="podcast.fields.itunesUrl"
                    target="_blank"
                  >
                    <p>Itunes</p>
                  </a>
                  <a
                    v-if="podcast.fields.ivooxUrl"
                    :class="$style['ivoox-link']"
                    :href="podcast.fields.ivooxUrl"
                    target="_blank"
                  >
                    <p>Ivoox</p>
                  </a>
                  <a
                    v-if="podcast.fields.spotifyUrl"
                    :class="$style['ivoox-link']"
                    :href="podcast.fields.spotifyUrl"
                    target="_blank"
                  >
                    <p>Spotify</p>
                  </a>
                </div>
                <v-card flat color="transparent">
                  <v-card-text
                    v-if="podcast.fields.content"
                    v-html="documentToHtmlString(podcast.fields.content)"
                    :class="[$style['tab-content-inner']]"
                  >
                  </v-card-text>
                </v-card>
              </v-content>
            </v-content>
          </v-content>
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
  head() {
    return {
      title: "Programas",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "Programas",
          content: "Programas | On Collaboration"
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
    active_tab: null,
    documentToHtmlString: documentToHtmlString,
    model: 0,
    isRadioLineShown: null,
    programa: null,
    playpause: "play",
    podcastsState: []
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
    },
    programTitle() {
      return this.$store.state.programTitle;
    }
  },
  created() {
    this.$store.dispatch("getEntriesAction", "programa");
    this.$store.commit("setTitle", "PROGRAMAS");
    this.$store.commit("setHeader", true);
    console.log("route", this.$route.name);
  },
  methods: {
    sendTab(title) {
      this.$store.commit("setProgramTitle", title);
    },
    createPlyr(id) {
      this.$nextTick(() => {
        this.plyr = new this.$plyr("#player" + id);
      });
    },
    podcastSetCollapse(podcast) {
      this["podcastState" + podcast.fields.id] = true;
    },
    isCollapsed(podcast) {
      console.log(this["podcastState" + podcast.fields.id]);
      console.log(this);
      this["podcastState" + podcast.fields.id] = !this[
        "podcastState" + podcast.fields.id
      ];
    },
    podcastState(podcast) {
      return this["podcastState" + podcast.fields.id];
    },
    logPodcast(podcast) {
      console.log("PODCASTS = >", podcast);
    }
  },
  mounted() {
    let slider = document.getElementsByClassName("v-tabs__slider-wrapper");
    console.log(slider);
    slider[0].appendChild(this.$refs.selector);
    setTimeout(() => {
      this.isRadioLineShown = true;
      if (this.posts.length > 0) {
        let programTitle = this.$store.state.programa.find(item => {
          item;
        });
      }
      this.$store.commit("setProgramTitle");
    }, 1000);
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

  .v-tabs__item--active {
    p {
      font-size: 17px;
      --pr: #d13b54;
      font-weight: 600;
    }
  }
}
</style>

<!-- MODULE -->

<style module lang="scss">
.base {
  position: relative;
}

.programTitle {
  text-align: center;
  color: var(--pr);
  h1 {
    margin: 2px 0;
  }
  h2 {
    font-size: 15px;
  }
}

.tab-content {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border: 5px solid var(--pr);
  font-family: "Consolas", Helvetica;
  color: var(--pr);
  a {
    text-decoration: underline;
    color: var(--pr);
  }
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
    background-color: var(--pr) !important;
    display: flex;
    justify-content: center;
    color: white;
    a {
      text-decoration: none;
    }
    &::before {
      height: 4px;
      width: 50%;
      background-color: var(--pr);
      margin-bottom: 5px;
    }
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

.floating-title {
  color: $sc;
  font-size: 11px;
  font-family: "Consolas", Helvetica;
}

.isRecorded {
  --pr: #d13b54;
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
    color: var(--pr);
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

.podcastContainer {
  border-bottom: 2px solid $sc;
  margin-bottom: 20px;
  padding-bottom: 20px;
}

// podcast

.podcasts {
  --pr: #4c4885;

  .programTitle {
    /*border-top: 1px solid var(--pr);*/
  }

  .links-container{
    width: 100%;
    position: absolute;
    top: -25px;
    justify-content: flex-end;
    display: flex;
  }

  .ivoox-link {
    font-size: 10px;
    color: var(--pr);
    text-decoration: underline;
    cursor: pointer;
    padding-left: 10px;
  }

  .collapseIcon {
    cursor: pointer;
    background-color: white;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px !important;
    position: absolute;
    bottom: -23px;
    border: 4px solid var(--pr);
    left: 50%;
    width: 40px;
    height: 40px;
    transform: translateX(-50%);
    p {
      font-size: 9px;
      margin: 5px 0px;
      display: none;
    }
    i {
      color: var(--pr) !important;
      margin-top: 3px;
    }
  }
  .upperinfo {
    max-width: 600px;
    margin: 0 auto;
    font-family: "Consolas", Helvetica;
    text-align: center;
    color: $pr;
    font-size: 16px;
    font-weight: 600;
    img {
      height: 50px;
      margin: 0 auto;
      @include media(ML) {
        height: 60px;
      }
    }
  }

  .subtitle {
    color: var(--pr);
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    margin: 0 !important;
  }

  .title {
    margin: 5px 0 !important;
    color: var(--pr);
    font-weight: 200;
    font-size: 12px;
    text-align: center;
  }

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
    @include media(ML) {
      padding-top: 80px;
    }
  }

  .programTitle {
    text-align: center;
    color: var(--pr) !important;
    border-bottom: 1px solid var(--pr) !important;
    padding-bottom: 35px !important;
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
    .v-tabs__item--active {
      p {
        color: var(--pr) !important;
        font-weight: bold;
        margin: 0;
      }
    }
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
      color: var(--pr) !important;
      font-weight: bold;
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

  .line {
    background-color: $sc;
    height: 3px;
  }

  .podcastContainer {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .tab-content {
    background-color: white;
    border: 5px solid var(--pr);
    font-family: "Consolas", Helvetica;
    color: var(--pr);
    .tab-content-inner {
      color: var(--pr);
      a {
        color: var(--pr);
        &:hover {
          color: $sc;
        }
      }
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
}
</style>
