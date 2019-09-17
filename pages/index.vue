<template>
  <v-container :class="$style.indexContent">
    <v-row justify="center" class="content init" v-if="show">
      <section class="on-element" v-if="intro[0]">
        <div v-html="documentToHtmlString(intro[0].fields.introContent)"></div>
      </section>
    </v-row>
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
    this.$store.commit("setHeader", true);
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
.indexContent {
  max-width: 600px;
  @include media(ML) {
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
}
</style>

<style lang="scss">
.on-element {
  padding: 10px;
  font-family: "Consolas", Helvetica !important;
  p {
    font-family: "Consolas", Helvetica !important;
    color: #4c4885;
    font-size: $base-font;
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
