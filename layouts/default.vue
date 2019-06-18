<template>
  <v-layout class="main-content" column justify-center align-center>
    <v-toolbar
      color="transparent"
      :flat="true"
      :prominent="true"
      :scroll-off-screen="true"
      :scroll-threshold="100"
      :fixed="true">
      <v-toolbar-side-icon
       @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
<!--      <v-toolbar-title>On Collaboration</v-toolbar-title>-->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in items">{{item.title}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>On Collaboration</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <nuxt/>
  </v-layout>
</template>

<script>
  export default {
    components: {
    },
    data: () => {
      return {
        drawer: null,
        items: [
          { title: 'Blog', icon: 'dashboard' },
          { title: 'Contacta', icon: 'message' },
          { title: 'Colabora', icon: 'people' }
        ]
      };
    },
  };
</script>

<style lang="scss">
  @import "@/assets/scss/working.scss";

  h1,h2,h3,h4,h5,p,a,span{
    font-family: 'Consolas', Helvetica;
  }

  .v-btn__content, .v-toolbar__title, .v-list__tile__title, .v-list__tile__title{
    font-family: 'Consolas', Helvetica;
  }

  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.4s, transform 0.4s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    opacity: 1;
  }
  .page-enter,
  .page-leave-active {
    opacity: 0.5;
  }

  .main-content{
    background-color:  #E4E5E3;
    /*background-image: url("~assets/images/ON_BG.png");*/
    /*background-repeat: no-repeat;*/
    /*background-attachment: fixed;*/
    /*background-position: center;*/
    background-size: 90%;
    /*height: 100vh;*/
    overflow: scroll;
  }

  html{
    background-color:  #E4E5E3 !important;
  }

</style>
