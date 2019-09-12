<template>
    <div>
      <v-toolbar
        color="transparent"
        :flat="true"
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
    </div>
</template>

<script>
    export default {
        name: "layout-toolbar",
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
    }
</script>

<style scoped>

</style>
