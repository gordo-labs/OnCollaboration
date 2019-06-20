<template>
  <v-layout>
    <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
      <v-toolbar color="transparent" :flat="true" :align-with-title="true" tabs>
        <template v-slot:extension>
          <v-tabs v-model="tab" color="transparent" grow>
            <v-tabs-slider color="#d13b54"></v-tabs-slider>

            <v-tab v-for="item in posts" :key="item.fields.title">
              {{ item.fields.title }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in posts">
          <v-card flat color="transparent">
            <v-card-text v-for="cont in item.fields.programa.content">
              <p v-if="cont.content[0]">{{ cont.content[0].value }}</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-layout>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  name: "program",
  data: () => ({
    size: "sm",
    tab: null,
    items: [
      { text: "Extra small (2px)", value: "xs" },
      { text: "Small (4px)", value: "sm" },
      { text: "Medium (8px)", value: "md" },
      { text: "Large (16px)", value: "lg" },
      { text: "Extra large (24px)", value: "xl" }
    ]
  }),
  computed: {
    posts() {
      return this.$store.state.programa;
    }
  },
  created() {
    this.$store.dispatch("getEntriesAction", "programa");
  }
};
</script>

<style scoped></style>
