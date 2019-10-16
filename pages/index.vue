<template>
  <v-container :class="$style.base">
    <v-container :class="$style.indexContent">
      <v-content :class="$style['title-image']">
        <img
          src="~/assets/images/ON_INTRO.png"
          class="init-title"
          @click="infoPanel = !infoPanel"
        />
      </v-content>
      <v-content>
        <v-row
          justify="center"
          class="content init"
          :class="$style.contentpiece"
          v-if="show"
        >
          <section
            class="on-element my-3"
            v-if="intro[0]"
            :class="{ 'pa-4': $vuetify.breakpoint.mdAndUp }"
          >
            <div
              v-html="documentToHtmlString(intro[0].fields.introContent)"
            ></div>
          </section>
        </v-row>
        <v-row
          justify="center"
          class="content init"
          v-if="show"
          :class="$style.contentpiece2"
        >
        </v-row>
      </v-content>
    </v-container>
    <v-container :class="$style['about-container']">
      <section class="my-1" :class="$style.referencias" v-if="intro[0]">
        <div v-html="documentToHtmlString(intro[0].fields.referencias)"></div>
      </section>
      <div>
        <section>
          <img class="mx-1" src="~/assets/images/MADRID.png" />
        </section>
        <section>
          <img class="mx-1" src="~/assets/images/ESPACIO_UCRANIA.png" />
        </section>
        <section>
          <img class="mx-1" src="~/assets/images/RACA.png" />
        </section>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import TitleImage from "../components/titleImage";
import navigation from "~/components/navigation";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  components: {
    TitleImage,
    navigation
  },
  data: () => {
    return {
      show: false,
      infoPanel: false,
      documentToHtmlString: documentToHtmlString
    };
  },
  created() {
    this.$store.dispatch("getEntriesAction", "intro");
    this.$store.commit("setTitle", null);
    this.$store.commit("setHeader", false);
  },
  mounted() {
    this.show = true;
  },
  computed: {
    intro() {
      return this.$store.state.intro;
    },
    featuredImage() {
      let featuredImage = this.$store.state.post.featureImage;
      if (featuredImage) {
        return (
          featureImage.media_details.sizes.large ||
          featureImage.media_details.sizes.full ||
          false
        );
      } else {
        return { height: 0, width: 0 };
      }
    }
  }
};
</script>

<style lang="scss" module>
.about-container {
  display: none !important;
  @include media(ML) {
    display: block !important;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    max-width: 960px;
  }
  & > div {
    width: 100%;
    border-top: 2px solid $pr;
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33%;
      height: 50px;
      img {
        max-height: 50%;
      }
    }
    section:first-child {
      justify-content: flex-start;
    }
    section:last-child {
      justify-content: flex-end;
    }
    @include media(ML) {
      display: flex !important;
      justify-content: center;
      align-items: center;
      img {
        /*margin-bottom: 20px;*/
        /*max-height: 100px;*/
        /*max-width: 50%;*/
      }
    }
  }
}

.title-image {
  margin: 20px 0;
  img {
    max-height: 30vh !important;
    max-width: 60vw;
    margin-bottom: 40px;
    @include media(ML) {
      margin-bottom: 0px;
      max-width: 190px;
      min-width: 200px;
    }
  }
  @include media(ML) {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-592.5px);
  }
}

.base {
  @include media(ML) {
    padding-top: 100px;
    min-height: calc(100vh - 100px);
  }
}
.indexContent {
  max-width: 600px;
  @include media(ML) {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.contentpiece > section {
  @include media(ML) {
    background-color: white;
    border: 5px solid var(--pr);
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
}
.referencias {
  * {
    font-size: 13px !important;
    font-family: "Consolas", Helvetica;
    color: var(--pr);
  }
}
</style>

<style lang="scss">
.on-element {
  font-family: "Consolas", Helvetica !important;
  p {
    font-family: "Consolas", Helvetica !important;
    color: #4c4885;
    font-size: 15px;
    margin-bottom: 10px;
    @include media(XS) {
      font-size: $desc-font;
    }
    @include media(SM) {
      font-size: $base-font;
    }
  }
  img {
    width: 80%;
  }
}
</style>
