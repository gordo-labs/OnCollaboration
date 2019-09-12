<template>
  <v-content>
    <nuxt-link :to="'/'">
      <section class="title-image-container">
        <img
          src="~/assets/images/ON_INTRO.png"
          class="init-title"
          @click="infoPanel = !infoPanel"
        />
      </section>
    </nuxt-link>
  </v-content>
</template>

<script>
export default {
  name: "titleImage"
};
</script>

<style scoped lang="scss">
.title-image-container {
  img {
    width: 35vw;
    max-width: 200px;
  }
}
</style>
