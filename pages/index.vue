<template>
  <div class="bg-main">
    <!--INTRO-->
    <v-content class="base-container">
      <v-content class="content pa-3 init">
        <section class="image-container">
          <img
            src="~/assets/images/ON_INTRO.png"
            class="init_title"
            @click="infoPanel = !infoPanel"
          />
        </section>
        <section class="on-element" v-show="infoPanel">
          <p>
            “ON COLLABORATION” ES UN PROYECTO CULTURAL EN FORMATO DE PROGRAMA
            RADIOFÓNICO EN TORNO A LA COLABORACIÓN.
          </p>
          <p>
            CINCO ENCUENTROS FÍSICOS, VARIOS TIPOS DE SECCIONES RADIOFÓNICAS,
            CINCO PODCASTS, UNA RED DE AGENTES Y COMUNIDADES PARTICIPANTES, UNA
            MIRADA MULTIPLET DESDE MADRID A OTROS ÁMBITOS Y CONDICIONES DEL
            "HACER JUNTOS", CONFORMAN SUS INGREDIENTES.
          </p>
          <p>
            UN UNIVERSO EXPERIMENTAL DESDE EL QUE APRENDER, ESCUCHANDO Y
            HACIENDO, QUE SIGNIFICA Y COMO SE PRODUCE HOY LO COLABORATIVO.
          </p>
        </section>
      </v-content>

      <programa class="programa"></programa>
      <!--PROGRAMA -->
      <v-content class="content pa-3 programa">
        <section>
          <img
            src="~/assets/images/ON_PROGRAMA_TITLE.svg"
            class="programa-title"
          />
        </section>
      </v-content>
    </v-content>

    <!--
    <v-content v-if="$route.params.slug" class="content pa-3 loaded">
      <NuxtChild :key="$route.params.slug" />
    </v-content>
    -->
  </div>
</template>

<script>
import programa from "~/components/program";
export default {
  components: {
    programa
  },
  data: () => {
    return {
      show: false,
      infoPanel: false
    };
  },
  created() {
    console.log("ROUTE => ", this.$route.params.slug);
    // this should not throw TS errors now
    let post;
    // post = this.$store.state.posts.find(el => {
    //   if (el.slug === this.$route.params.slug) {
    //     this.$store.commit("setPost", el);
    //     return true;
    //   }
    // });
    if (!post) {
      // this.$store.dispatch("getEntries", this.$route.params.slug);
    }
    console.log("POST => ", this.show);
  },
  computed: {
    posts() {
      return this.$store.state.posts;
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

<style lang="scss">
@import "@/assets/scss/working.scss";

$primary: #4c4885;

.programa{
  margin-top: 120px !important;
}
.image-container {
  position: fixed;
  top: 60px;
  left: 20px;
  z-index: 5;
  img {
    width: 150px;
  }
}

.base-container {
  max-width: 1100px;
  margin: 0 auto;
}

.init {
  max-width: 900px;
  margin: 0 auto;
}

.init {
  position: relative;
}

.on-element {
  top: 160px;
  left: 0px;
  margin: 10px;
  z-index: 10;
  position: fixed;
  background-color: white;
  padding: 30px;
  border: 15px solid $primary;
  font-family: "Consolas", Helvetica !important;
  p {
    font-family: "Consolas", Helvetica !important;
    color: #4c4885;
    font-size: 1.5em;
    @include media(S) {
      font-size: 1.2em;
    }
  }
  img {
    width: 80%;
  }
  .init_text {
    position: absolute;
    width: 70%;
    bottom: 0;
    right: 0;
  }
  .init_title {
    position: absolute;
    width: 70%;
    top: 0;
    left: 0;
  }
}

.bg-main {
  height: 100%;
  width: 100%;
}

.programa {
  position: relative;
  margin: 70px 0;
  @include media(S) {
    margin: 10px 0;
  }
  .programa-title {
    height: 180px;
    @include media(S) {
      height: 70px;
    }
    position: absolute;
    top: 0;
    left: 0;
  }
  .programa-content {
    margin-left: 10%;
  }
  .programa-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @include media(S) {
      top: 45%;
      left: 45%;
    }
    img {
      height: 100px;
      @include media(S) {
        height: 60px;
      }
      &:hover {
        -webkit-animation: rotate-center 0.6s ease-in-out reverse both;
        animation: rotate-center 0.6s ease-in-out reverse both;
      }
    }
    p {
      text-align: center;
      font-family: "Consolas", Helvetica !important;
      color: #d13b54;
      font-weight: 600;
      font-size: 2em;
      margin-top: 10px;
      @include media(S) {
        font-size: 1.3em;
      }
    }
  }
}

@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
