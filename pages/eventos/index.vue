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
        {{ event.fields.eventDate | moment("MM Do YYYY") }}
      </v-card-text>
      <v-content :class="$style['event-content']">
        <v-card-text flat color="transparent" :class="$style['event-title']">
          {{ event.fields.eventTitle }}
        </v-card-text>
        <v-card-text v-html="documentToHtmlString(event.fields.eventDesc)">
        </v-card-text>
      </v-content>

      <v-content :class="$style.line"></v-content>
    </v-content>
  </v-container>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import TitleImage from "../../components/titleImage";

export default {
  name: "index.vue",
  components: { TitleImage },
    head() {
        return {
            title: 'Eventos',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "Eventos",
                    content: "Eventos | On Collaboration"
                }
            ],
        };
    },
  data: () => ({
    documentToHtmlString: documentToHtmlString
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
  }
};
</script>

<style module lang="scss">
.event-container {
  color: $sc;
  font-family: "Consolas", Helvetica;
  max-width: 600px;
  margin: 0 auto;
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
  border: 10px solid $pr;
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
