<template>
  <v-container :class="$style['about-container']">
    <section class="my-1" :class="$style.referencias" v-if="intro[0]">
      <div v-html="documentToHtmlString(intro[0].fields.referencias)"></div>
    </section>
    <div>
      <section>
        <img class="mx-1" src="~/assets/images/MADRID.png" />
      </section>
      <section>
        <img class="mx-1" src="~/assets/images/ESPACIO_UCRANIA.png" />
      </section>
      <section>
        <img class="mx-1" src="~/assets/images/RACA.png" />
      </section>
    </div>
  </v-container>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

  <style lang="scss" module>
                     .about-container {
                       display: none !important;
                       @include media(ML) {
                         margin: 50px auto 0px auto;
                         display: block !important;
                         /*    position: fixed;
                         bottom: 0;
                         left: 50%;
                         transform: translateX(-50%);*/
                         /*max-width: 960px;*/
                       }
                       & > div {
                         width: 100%;
                         border-top: 2px solid $pr;
                         section {
                           display: flex;
                           justify-content: center;
                           align-items: center;
                           width: 33%;
                           height: 50px;
                           img {
                             max-height: 50%;
                           }
                         }
                         section:first-child {
                           justify-content: flex-start;
                         }
                         section:last-child {
                           justify-content: flex-end;
                         }
                         @include media(ML) {
                           display: flex !important;
                           justify-content: center;
                           align-items: center;
                           img {
                             /*margin-bottom: 20px;*/
                             /*max-height: 100px;*/
                             /*max-width: 50%;*/
                           }
                         }
                       }
                     }
</style>
