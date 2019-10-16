<template>
  <div class="base">
    <no-srr>
      <lingallery
        v-if="items.lenght > 0"
        :width="600"
        :height="400"
        :items="items"
        :startImage="index"
      />
    </no-srr>
  </div>
</template>

<script>
import Lingallery from "lingallery";
export default {
  name: "gallery",
  component: {
    Lingallery
  },
  props: {
    items: Array,
    startIndex: Number
  }
};
</script>

<style scoped>
.base {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.21);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
