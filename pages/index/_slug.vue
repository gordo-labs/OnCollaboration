<template>
  <div class="base-container">
    <nuxt-link :to="'/'">
      <v-icon class="close" color="white">close</v-icon>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  components: {},

  layout: "blog",

  head() {
    return {
      // title: "Blog | " + this.$route.params.slug
    };
  },
  data: () => {
    return {
      // show: false
    };
  },
  created() {
    console.log("ROUTE => ", this.$route.params.slug);
    // this should not throw TS errors now
    let post;
    post = this.$store.state.posts.find(el => {
      if (el.slug === this.$route.params.slug) {
        this.$store.commit("setPost", el);
        return true;
      }
    });
    if (!post) {
      this.$store.dispatch("getPostId_A", this.$route.params.slug);
    }
    console.log("POST => ", this.show);
  },

  computed: {
    post() {
      return this.$store.state.post;
    },
    show() {
      return !!this.$store.state.post;
    },
    featuredImage() {
      let featuredImage = this.$store.state.post.featureImage;
      if (featuredImage) {
        return (
          featureImage.media_details.sizes.large ||
          featureImage.media_details.sizes.full ||
          false
        );
      } else {
        return { height: 0, width: 0 };
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/working.scss";

</style>
