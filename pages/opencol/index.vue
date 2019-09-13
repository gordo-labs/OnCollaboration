<template>
  <v-container :class="$style.base">

    <v-layout column justify-center >

      <v-row :class="$style['record-row']">
        <div :class="$style.record">
<!--          <a class="d-flex" href="intent://send/+34609073093#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end">
            <img src="~/assets/images/ON-record.svg" />
          </a>-->
          <a class="d-flex" href="whatsapp://send?phone=+34609073093">
            <img src="~/assets/images/ON-record.svg" />
          </a>
        </div>
        <p>Dejanos una <br><span>nota de voz</span></p>
      </v-row>

      <v-row>
        <v-card flat color="transparent" v-if="opencol">
          <v-card-text v-html="documentToHtmlString(opencol.fields.opencol)">
          </v-card-text>
        </v-card>
      </v-row>

    </v-layout>
  </v-container>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import TitleImage from "../../components/titleImage";


export default {
  name: "index",
    components: {TitleImage},
    data: () => ({
    size: "sm",
    tab: null,
    documentToHtmlString: documentToHtmlString,
    items: [
      { text: "Extra small (2px)", value: "xs" },
      { text: "Small (4px)", value: "sm" },
      { text: "Medium (8px)", value: "md" },
      { text: "Large (16px)", value: "lg" },
      { text: "Extra large (24px)", value: "xl" }
    ]
  }),
  computed: {
    opencol() {
      return this.$store.state.opencol[0];
    }
  },
  created() {
    this.$store.dispatch("getEntriesAction", "opencol");
      this.$store.commit("setTitle", "OPEN CALL");
      this.$store.commit("setHeader", true);
  }
};
</script>

<style module lang="scss">
  .base{
    max-width: 700px;
  }

  .record-row{
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
    min-height: 26vh;
    &>p{
      position: absolute;
      bottom: 0;
      left: 5%;
      color: $sc;
      margin-bottom: 20px;
      transform: rotate(28deg);
      font-weight: 600;
      span{
        margin-left: 30px;
      }
    }
  }

  .floating-title {
    position: fixed;
    color: $sc;
    left: 25%;
    top: 14%;
    font-size: 11px;
    font-family: "Consolas", Helvetica;
    transform: rotate(-28deg);
  }
.record {
  border-radius: 100px;
  height: 100px;
  width: 100px;
  background-color: $sc;
  display: flex;
  align-items: center;
  justify-content: center;
  a{

  }
  img {
    height: 50px;
    width: 50px;
  }
}
</style>
