<script setup lang="ts">
import SnakeGame from "./SnakeGame.vue"
const hello = [
  { pre: "Hi all. I am", current: "Horberlan Brito", pos:"> Frontend developer", } ];
  const desc = [
    "// complete the game to continue",
    "// you can also see it on my Github page",
  ];
  const github = [
    "const ",
    "githubLink ",
    "“https://github.com/horberlan”",
]
</script>
<template>
  <section class="hero_container">
    <div class="hello">
      <p v-for="(intro, index) in hello" :key="index">
        <span>
          {{intro.pre}}
        </span>
        <h1>
          {{intro.current}}
        </h1>
        <span>
          {{intro.pos}}
        </span>
      </p>
      <div class="content">
      <p v-for="descriptions in desc" :key="descriptions" class="desc">
      {{descriptions}}
      </p>
    </div>
      <span v-for="link in github" :key="link" class="github">
        {{link}}
      </span>
    </div>
    <div class="hero">
      <SnakeGame/>
    </div>
  </section>
</template>
<style scoped lang="scss">

$green :#43D9AD;
$blue: #4D5BCE;
$orange: #E99287;

.hero_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  color: #E5E9F0;
  display: grid;
  gap: 6rem;
  padding-block-start: 10rem;
  padding-inline: 5rem;
  margin-inline: 5rem;
  background: url("../../assets/background_blurs.svg") center no-repeat transparent;
  background-position: 100% 0%;
  height: 92vh;
  .hello {
    grid-column: 1/ 2;
    background-color: transparent;
    margin-inline-start: 8rem;
    p {
      span {
        font-size: 1.125rem;
        &:last-child {
         color:#4D5BCE;
         font-size: 2rem;
        }
      }
      h1 {
        font-size: 3.875rem;
        margin: 0;
    }
    }
    .content {
      margin-block-start: 4rem;
    }
    .desc {
      color: #607B96;
    }
    .github {
      &:nth-child(1n) {
        color: $green;
      }
      &:nth-child(2n) {
        color: $blue;
        &::after {
          content: "= ";
          color: white;
        }
      }
      &:nth-child(3n) {
        color: $orange;
      }
    }
  }
}
</style>
