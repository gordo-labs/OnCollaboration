<template>
  <v-container>
    <v-content :class="$style.line"></v-content>
    <v-content
      v-for="event in events"
      :key="event.eventId"
      class="my-3"
      v-if="event"
      :class="$style['event-container']"
    >
      <v-card-text :class="$style['event-content-inner']">
        {{ buildDate(event.fields.eventDate) }}
      </v-card-text>
      <v-content :class="$style['event-content']">
        <v-img
          v-if="event.fields.eventMedia"
          :src="event.fields.eventMedia.fields.file.url"
          lazy-src="https://picsum.photos/id/11/10/6"
          class="grey lighten-2 mb-2"
        ></v-img>
        <v-card-text flat color="transparent" :class="$style['event-title']">
          {{ event.fields.eventTitle }}
        </v-card-text>
        <v-card-text v-html="documentToHtmlString(event.fields.eventDesc)">
        </v-card-text>
        <v-container class="d-flex" v-if="event.fields.images">
          <v-img
            v-for="image in event.fields.images"
            :src="image.fields.file.url"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            width="100"
            class="grey lighten-2 mr-4"
          >
          </v-img>
        </v-container>
      </v-content>

      <v-content :class="$style.line"></v-content>
    </v-content>
    <!--    <gallery v-if="showGallery" :items="images" :start-index="0"></gallery>-->
  </v-container>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import TitleImage from "../../components/titleImage";
// import gallery from "../../components/gallery";

export default {
  name: "index.vue",
  components: { TitleImage,
      // gallery
  },
  head() {
    return {
      title: "Eventos",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "Eventos",
          content: "Eventos | On Collaboration"
        }
      ]
    };
  },
  data: () => ({
    documentToHtmlString: documentToHtmlString,
    images: [],
    showGallery: false
  }),
  computed: {
    events() {
      return this.$store.state.evento;
    }
  },
  created() {
    this.$store.dispatch("getEntriesAction", "evento");
    this.$store.commit("setTitle", "EVENTOS");
    this.$store.commit("setHeader", true);
  },
  methods: {
    sendImages(imageUrl) {
      this.images.push({ src: imageUrl });
    },
    openImageGallery(imageUrl) {
      this.images.push({ src: imageUrl });
    },
    buildDate(dateIso) {
      let date = new Date(dateIso);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }

      console.log(year+'-' + month + '-'+dt);
      return (dt + ' - ' + month + ' - ' + year);
    }
  }
};
</script>

<style module lang="scss">
.event-container {
  color: $sc;
  font-family: "Consolas", Helvetica;
  max-width: 600px;
  margin: 0 auto;
  a {
    color: $pr;
  }
}
.line {
  background-color: $sc;
  width: 70%;
  height: 1px;
  margin: 50px auto;
}
.event-title {
  font-weight: 800;
  font-size: 18px;
}

.tab-style {
  position: relative;
  .tab-line {
    position: absolute;
    width: 4px;
    height: 100px;
    color: $sc;
    left: 100px;
    top: 0;
    z-index: 1000;
  }
}

.tabs-style {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0.6) 26%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.6) 74%,
    rgba(255, 255, 255, 0) 90%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
}

.event-content {
  background-color: white;
  border: 5px solid $pr;
  color: $pr;
  font-family: "Consolas", Helvetica;
  .tab-cta {
    background-color: $pr;
    display: flex;
    justify-content: center;
    color: white;
    font-family: "Consolas", Helvetica;
    &::before {
      height: 4px;
      width: 50%;
      background-color: $pr;
      margin-bottom: 5px;
    }
  }
}
</style>
