<template>

<!--    <v-tabs-items v-model="active_tab" class="mt-4">-->
      <v-content
        v-if="item"
        class="mt-5"
        :class="{ [$style.isRecorded]: item.fields.recorded }"
      >
        <!--        <div v-if="item.fields.programa" v-html="item.fields.programa.content[1].content"></div>-->

<!--        <v-tab-item :key="item.fields.title" class="mx-1 my-3">-->
          <v-content class="mb-5" :class="$style.programTitle">
            <h1>{{ item.fields.title }}</h1>
            <h2>{{ item.fields.subTitle }}</h2>
          </v-content>

          <v-content v-if="!item.fields.podcastsRef > 0">
            <div :class="$style.upperinfo" class="mb-3">
              <v-card-text :class="$style['subtitle']">
                <p :class="$style.title">Proximamente</p>
              </v-card-text>
            </div>
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
              <a
                v-if="podcast.fields.ivooxUrl"
                class="ivoox-link"
                :href="podcast.fields.ivooxUrl"
                target="_blank"
              >
                <p>Abrir en Ivoox</p>
              </a>
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
<!--        </v-tab-item>-->
      </v-content>
<!--    </v-tabs-items>-->
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
  asyncData ({ params, store }) {
    store.dispatch("getEntry", params.slug)
      .then((res) => {
        console.log('RES',res);
        return {
          title: res.fields.title,
          item: res,
          isItemFilled: true
        };
      })
  },
  head() {
    return {
      title: "Programas",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "Programas",
          content: "Programas"
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
    programa: null,
    playpause: "play",
    podcastsState: []
  }),
  computed: {
    posts() {
      return this.$store.state.programa;
    },
    title() {
      return this.$store.state.title;
    },
    activeTab() {
      return this.$store.state.podcastTab;
    },
    item() {
      return this.$store.state.selectedPrograma;
    }
  },
  beforeCreate() {},
  created() {
    console.log('INDEX PROGRAMA',this.$router.history.current.params.slug);
    console.log('INDEX PROGRAMAS => ',this.posts);
    this.$store.dispatch("getEntry", this.$router.history.current.params.slug);
    // }
    this.$store.commit("setTitle", "PROGRAMAS");
    this.$store.commit("setHeader", true);
    // console.log(this.item);

    if (!this.$router.history.current.params.slug && this.posts.length === 0) {
      this.$store.dispatch("getProgramasInitialAction", "programa");
    }
  },
  mounted() {
    /*            let slider = document.getElementsByClassName("v-tabs__slider-wrapper");
                  slider[0].appendChild(this.$refs.selector);

                  setTimeout(() => {
                      this.isRadioLineShown = true;
                      this.programa = this.posts.find(el => {
                          if ((el.fields.title = this.$router.params.slug)) {
                              return true;
                          }
                      });
                      this.tab = this.programa.id;
                  }, 1000);*/
  },
  methods: {
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
.v-tabs__item--active {
  p {
    font-size: 17px;
    --pr: #d13b54;
    font-weight: 600;
  }
}
.v-tabs__wrapper {
  overflow: inherit !important;
  contain: inherit !important;
}

.collapsed {
  & p {
    display: none;
  }
  & p:first-child {
    display: block;
  }
  & p:nth-child(2) {
    display: block;
  }
}

.ivoox-link {
  position: absolute;
  top: -25px;
  right: 0;
  font-size: 10px;
  color: var(--pr);
  text-decoration: underline;
  cursor: pointer;
}
</style>

<style module lang="scss">
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
  color: var(--pr);
  border-bottom: 1px solid var(--pr);
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
</style>
