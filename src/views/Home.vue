<template>
  <v-container
    fluid
    class="fill-height justify-center"
    style="max-width: 1785px"
  >
    <v-row
      align="center"
      :dense="$vuetify.breakpoint.mdAndDown"
    >
      <v-col
        cols="12"
        lg="6"
        xl="8"
      >
        <Intro
          class="card-translate-up"
        />
      </v-col>

      <v-col
        cols="12"
        lg="6"
        xl="4"
      >
        <Bulletin
          class="card-translate-up"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <GettingStarted
          class="card-translate-up"
        />
      </v-col>

      <!--      <v-flex-->
      <!--        xs12-->
      <!--        sm6-->
      <!--      >-->
      <!--        <Contact-->
      <!--          -->
      <!--        />-->
      <!--      </v-flex>-->
      <v-col
        cols="12"
        md="6"
        class="align-self-stretch"
      >
        <Contribute
          class="card-translate-up align-self-stretch"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="align-self-stretch"
      >
        <Donate
          class="card-translate-up"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="align-self-stretch"
      >
        <Contact class="card-translate-up align-self-stretch" />
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="align-self-stretch"
      >
        <License class="card-translate-up" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Contribute from "@/views/About/Contribute";
import Donate from "@/views/About/Donate";
import Intro from "@/views/About/Intro";
import Bulletin from "@/views/About/Bulletin";
import Contact from "@/views/About/Contact";
import anime from 'animejs/lib/anime.es.js';
import License from "@/views/About/License";
import Console from "@/utils/Console";
import GettingStarted from "@/views/About/GettingStarted";

export default {
  name: "Home",
  components: {GettingStarted, License, Contribute, Donate, Intro, Bulletin, Contact },
  data: () => ({}),
  mounted () {
    setTimeout(() => {
      try {
        anime({
          targets: '.card-translate-up',
          translateY: [48, 0],
          opacity: [0, 1],
          duration: 775,
          delay: (el, i) => i * 175,
          easing: "easeOutQuint"
        });
        anime({
          targets: ['.card-translate-up h1', '.card-translate-up h2', '.card-translate-up p', '.card-translate-up span:not(.v-btn__content)'],
          translateY: [48, 0],
          opacity: [0, 1],
          duration: 775,
          delay: (el, i) => i * 55,
          easing: "easeOutQuint"
        })
      } catch (e) {
        Console.warn("HomeAnimation", "error when animating home entry animation", e)
      }
    }, 0);

    this.$nextTick(() => {
      setTimeout(() => {
        const el1 = document.querySelector(".card-translate-up");
        const el2 = document.querySelector(".card-translate-up h1");
        if ((el1 && el1.style.opacity === "0") || (el2 && el2.style.opacity === "0")) {
          Console.info("HomeAnimation", "potential blank screen on home detected");

          // try to fix this
          const selectors = [
            ".card-translate-up",
            ".card-translate-up h1",
            ".card-translate-up h2",
            ".card-translate-up p",
            ".card-translate-up span:not(.v-btn__content)",
          ];
          try {
            for (const selector of selectors) {
              for (const element of document.querySelectorAll(selector)) {
                element.style.setProperty("opacity", 1);
              }
            }
          } catch (e) {
            Console.info("HomeAnimation", "blank screen fix trial failed", e)
          }
        }
      }, 5000)

    })
  },
};
</script>

<style scoped>
.home-card {
  height: 100%;
}
</style>