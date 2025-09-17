<script setup lang="ts">
import { redirectTo } from "@/utils/strings";
import SnakeGame from "./SnakeGame.vue";

const intl = {
  hello: [
    {
      pre: "Hi all. I am",
      current: "Horberlan Brito",
      pos: "> FullStack developer",
    },
  ],
  desc: ["complete the game for fun", "you can also see it on my Github page"],
  github: ["const ", "githubLink ", "“https://github.com/horberlan”"],
};
</script>
<template>
  <section class="hero">
    <div class="hero-hello">
      <p v-for="(intro, index) in intl.hello" :key="index">
        <span
          v-for="text of intro"
          :key="text"
          v-html="text"
          :class="text === intro.current ? 'current' : null"
        />
      </p>
      <div class="content">
        <p v-for="descriptions in intl.desc" :key="descriptions" class="desc">
          // {{ descriptions }}
        </p>
      </div>
      <span
        v-for="(link, index) in intl.github"
        :key="link"
        class="github"
        :class="
          index === intl.github.length - 1
            ? 'hover:underline decoration-wavy'
            : null
        "
        role="button"
        @click="redirectTo('https://github.com/horberlan/horberlan-portfolio')"
      >
        {{ link }}
      </span>
    </div>
    <div class="hero-snake-game">
      <SnakeGame />
    </div>
  </section>
</template>
<style scoped lang="scss">
$green: #43d9ad;
$blue: #4d5bce;
$orange: #e99287;

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  color: #e5e9f0;
  gap: 6rem;
  padding-block-start: calc(8px + 16vh);
  padding-inline: calc(8px + 1.5625vw);
  background: url("../../assets/background_blurs.svg") center no-repeat
    transparent;
  background-position: 100% 0%;
  height: 110%;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }

  &-hello {
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
      &:hover {
        cursor: pointer;
      }
    }
  }
  &-snake-game {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 768px) {
  .desc:first-of-type,
  .content:first-child {
    display: none;
  }
  .hero {
    margin: 0;
    overflow-y: auto;
    &-hello {
      margin-inline-start: 1rem;
    }
  }
}
</style>
