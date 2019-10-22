<template>
  <v-container :class="$style.indexContent">
    <v-content>
      <v-row
        justify="center"
        class="content init"
        :class="$style.contentpiece"
        v-if="show"
      >
        <section
          :class="$style['rrss-container']"
          class="pa-3 my-3"
          v-if="about[0]"
        >
          <div
            :class="$style.rrss"
            v-html="documentToHtmlString(about[0].fields.rrss)"
          ></div>
        </section>

      </v-row>
    </v-content>

    <v-content>
      <v-row
        justify="center"
        class="content init"
        :class="$style.contentpiece"
        v-if="show"
      >
        <section class="on-element pa-3 my-3" v-if="about[0]">
          <div
            v-html="documentToHtmlString(about[0].fields.aboutContent)"
          ></div>
        </section>
      </v-row>
    </v-content>
    <v-container :class="$style['colaborators-container']">
      <div>
        <a href="http://www.comunidad.madrid/centros/consejeria-cultura-turismo-deportes">
          <img class="mx-1" src="~/assets/images/MADRID.png" />
        </a>
        <a href="http://raca.aq.upm.es/">
          <img class="mx-1" src="~/assets/images/RACA.png" />
        </a>
        <a href="http://www.espacioucrania.com/">
          <img class="mx-1" src="~/assets/images/ESPACIO_UCRANIA.png" />
        </a>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import TitleImage from "~/components/titleImage";
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
    this.$store.dispatch("getEntriesAction", "about");
    this.$store.commit("setTitle", "About");
    this.$store.commit("setHeader", true);
  },
  mounted() {
    this.show = true;
  },
  computed: {
    about() {
      return this.$store.state.about;
    }
  }
};
</script>

<style lang="scss" module>
.colaborators-container > div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  a {
    text-align: center;
  }
  img {
    margin-bottom: 20px;
    max-height: 100px;
    max-width: 50%;
  }
  img:last-child {
    margin-bottom: 20px;
    max-height: 50px;
    max-width: 50%;
  }
}

.about-container {
  display: none;
  @include media(ML) {
    display: flex;
    height: auto;
    img {
      height: 150px;
      width: 150px;
      background-color: blue;
    }
  }
}
.title-image {
  padding: 15px !important;
  @include media(ML) {
    padding: 0px;
  }
}
.indexContent {
  max-width: 600px;
  @include media(ML) {
    padding-top: 100px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.rrss {
  display: flex;
  justify-content: center;
  p {
    font-size: 10px;
    width: auto;
    text-decoration: none;
    padding: 10px 20px;
    background-color: white;
    border-radius: 4px;
    margin: 0 10px;
  }
  a {
    text-decoration: none;
  }
}
.rrss-container {
  background-color: transparent !important;
  border: none !important;
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
  padding: 10px;
  font-family: "Consolas", Helvetica !important;
  a {
    color: $sc;
  }
  p {
    font-family: "Consolas", Helvetica !important;
    color: $pr;
    font-size: 14px;
    margin-bottom: 10px;
  }
  img {
    width: 80%;
  }
}
</style>
