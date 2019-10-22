<template>
  <v-card>
    <v-tabs
      background-color="transparent"
      centered
    >

<!--      <v-tab-item
      >
        <v-container fluid>
          <img src="~/assets/images/mapas/MAPA-01.png" alt="mapa">
        </v-container>
      </v-tab-item>
      <v-tab-item
      >
        <v-container fluid>
          <img src="~/assets/images/mapas/MAPA-01.png" alt="mapa">
        </v-container>
      </v-tab-item>
      <v-tab-item
      >
        <v-container fluid>
          <img src="~/assets/images/mapas/MAPA-01.png" alt="mapa">
        </v-container>
      </v-tab-item>
      <v-tab-item
      >
        <v-container fluid>
          <img src="~/assets/images/mapas/MAPA-01.png" alt="mapa">
        </v-container>
      </v-tab-item>-->
    </v-tabs>
  </v-card>
</template>

<script>
    export default {
        name: "mapas",
        data () {
            return {
                tabs: null,
                imgs: [
                    "~/assets/images/mapas/MAPA-01.png",
                    "~/assets/images/mapas/MAPA-01.png",
                    "~/assets/images/mapas/MAPA-01.png",
                    "~/assets/images/mapas/MAPA-01.png",
                ],
            }
        },
    }
</script>

<style scoped>
img{
  width: 100%;
}
</style>
