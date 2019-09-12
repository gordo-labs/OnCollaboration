<template>
  <div :class="$style.base" v-if="isLoading">
    <img :class="$style['center-image']"
         src="~/assets/images/on-loading.svg">
  </div>
</template>

<script>
    export default {
        name: "onLoader.vue",
        props:{
            isLoading: false
        }
    }
</script>

<style module lang="scss">

  .base{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
    background-color: $pr-bg;
  }

  .center-image{
      height: 100px;
      width: 100px;
  }

</style>
