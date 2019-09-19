<template>
  <v-container :class="$style.base">
    <v-layout column justify-center>
      <v-row :class="$style['record-row']">
        <div :class="$style.record" class="animation">
          <a class="d-flex" href="whatsapp://send?phone=+34609073093">
            <img src="~/assets/images/ON-record.svg" />
          </a>
        </div>
        <p>Dejanos una <br /><span>nota de voz</span></p>
      </v-row>

      <v-row>
        <v-card flat color="transparent" v-if="opencol">
          <v-card-text
            :class="$style['open-content']"
            v-html="documentToHtmlString(opencol.fields.opencol)"
          >
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
  components: { TitleImage },
  head() {
    return {
      title: "Open Call",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "Open Call",
          content: documentToHtmlString("Open Call")
        }
      ]
    };
  },
  data: () => ({
    tab: null,
    documentToHtmlString: documentToHtmlString
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

<style lang="scss">
.face:hover {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

<style module lang="scss">
.base {
  max-width: 700px;
}

.open-content {
  * {
    color: var(--pr);
  }
}

.animation {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  will-change: transform;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
}

.record-row {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
  min-height: 26vh;
  & > p {
    position: absolute;
    bottom: 0;
    left: 5%;
    color: $sc;
    margin-bottom: 20px;
    transform: rotate(28deg);
    font-weight: 600;
    span {
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
  background-color: $pr;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: $sc;
  }
  a {
  }
  img {
    height: 50px;
    width: 50px;
  }
}
</style>
