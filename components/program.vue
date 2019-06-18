<template>
  <v-layout>
    <v-flex xs12 sm12>
        <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
          <v-layout row wrap v-if="posts">
            <v-flex
              v-for="pod in posts.length"
              xs6 sm2
            >
              <v-card flat tile v-if="pod">
                <v-card-title>{{pod}}</v-card-title>
                <v-img
                  :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
                  height="150px"
                ></v-img>
                <audio controls>
                  <source src="horse.mp3" type="audio/mpeg">
                  Your browser does not support the audio tag.
                </audio>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "program",
        data: () => ({
          size: 'sm',
          items: [
            { text: 'Extra small (2px)', value: 'xs' },
            { text: 'Small (4px)', value: 'sm' },
            { text: 'Medium (8px)', value: 'md' },
            { text: 'Large (16px)', value: 'lg' },
            { text: 'Extra large (24px)', value: 'xl' }
          ]
        }),
      computed: {
        posts() {
          return this.$store.state.posts;
        },
      }
    }
</script>

<style scoped>

</style>
