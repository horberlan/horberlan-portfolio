<script setup lang="ts">
import SnakeGame from "./SnakeGame.vue";
const hello = [
  {
    pre: "Hi all. I am",
    current: "Horberlan Brito",
    pos: "> Frontend developer",
  },
];
const desc = [
  "// complete the game to continue",
  "// you can also see it on my Github page",
];
const github = ["const ", "githubLink ", "“https://github.com/horberlan”"];
</script>
<template>
  <section class="hero_container">
    <div class="hello">
      <p v-for="(intro, index) in hello" :key="index">
        <span
          v-for="text of intro"
          :key="text"
          v-html="text"
          :class="text === intro.current ? 'current' : null"
        />
      </p>
      <div class="content">
        <p v-for="descriptions in desc" :key="descriptions" class="desc">
          {{ descriptions }}
        </p>
      </div>
      <span v-for="link in github" :key="link" class="github">
        {{ link }}
      </span>
    </div>
    <div class="hero">
      <SnakeGame />
    </div>
  </section>
</template>
<style scoped lang="scss">
$green: #43d9ad;
$blue: #4d5bce;
$orange: #e99287;

.hero_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  color: #e5e9f0;
  display: grid;
  gap: 6rem;
  padding-block-start: 10rem;
  padding-inline: 10rem;
  background: url("../../assets/background_blurs.svg") center no-repeat
    transparent;
  background-position: 100% 0%;
  height: 92vh;
  .hello {
    grid-column: 1/ 2;
    background-color: transparent;
    margin-inline-start: 8rem;
    p {
      display: flex;
      flex-direction: column;
      span {
        font-size: 1.125rem;
        &:last-child {
          color: $indigo;
          font-size: 2rem;
        }
      }
      .current {
        font-size: 3.875rem;
        margin: 0;
      }
    }
    .content {
      margin-block-start: 4rem;
    }
    .desc {
      color: $font-lynch;
    }
    .github {
      &:nth-child(1n) {
        color: $turquoise;
      }
      &:nth-child(2n) {
        color: $blue;
        &::after {
          content: "= ";
          color: $white-full;
        }
      }
      &:nth-child(3n) {
        color: $tonys-pink;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .hero {
    display: none;
  }
  .desc:first-of-type,
  .content:first-child {
    display: none;
  }
  .hero_container {
    padding: 0;
    margin: 0;
    height: 200vw;
    .hello {
      margin-inline-start: 1rem;
    }
  }
}
</style>
