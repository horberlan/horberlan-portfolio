<template>
  <div class="snake">
    <div id="app">
      <SnakeCanvas
        :cellSize="cellSize"
        :boardSize="boardSize"
        :speed="speed"
        :isPlaying="isPlaying"
        :stop="stop"
        :addScores="addScores"
        :scores="scores"
      />
      <div v-if="winner" class="winner">
        <span> WELL DONE! </span>
      </div>
      <button
        id="play-btn"
        v-if="!isPlaying"
        @keyup.space="isPlaying ? stop() : start()"
        @click="isPlaying ? stop() : start()"
      >
        {{ isPlaying ? "end-game" : "start-game" }}
      </button>
      <div>Scores: {{ scores }}</div>
    </div>
    <div>
      <div class="snake_keymap">
        <p>// use keyboard</p>
        <p>// arrows to play</p>
      </div>
      <p>// food left</p>
      <SvgIcon
        v-for="(foods, index) in foodLoop"
        :key="index"
        :name="foods.name"
        :empty="foods.empty"
        size="xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SnakeCanvas from "@/views/home/SnakeCanvas/SnakeCanvas.vue";
import SvgIcon from "@/components/SvgIcon.vue";

const cellSize = ref(50);
const boardSize = ref(40);
const speed = ref(15);
const scores = ref(0);
const isPlaying = ref(false);
const food = ref(true);
const winner = ref(false);

const foodLoop = [
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
  { name: "SnakeFood", empty: food.value },
];
const start = () => {
  isPlaying.value = true;
  foodLoop[0].empty = true;
  winner.value = false;
  scores.value = 0;
};
const stop = () => {
  isPlaying.value = false;
  scores.value = 0;
};
const addScores = () => {
  scores.value = ++scores.value;
  if (scores.value === 10) {
    winner.value = true;
    stop();
  }
  foodLoop[0].empty = false;
};
</script>

<style lang="scss" scoped>
.snake {
  display: flex;
  position: relative;
  padding-block: 2.5rem;
  padding-inline: 2rem;
  width: 31.875rem;
  height: 29.6875rem;
  background: url("../../assets/snake_game_bg.svg") no-repeat;
  gap: 2rem;
  margin: 0.25rem;
}
.snake_keymap {
  background: url("../../assets/snake_game_keymap.svg") no-repeat;
  background-size: cover;
  width: 11.3362rem;
  height: 8.875rem;
  margin: 0 auto;
}
.snake_game {
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
  margin-block-end: 1rem;
}
#play-btn {
  position: absolute;
  left: 5.5rem;
  bottom: 8rem;
  background: #fea55f;
  padding: 0.625rem 0.875rem;
  border-radius: 0.5rem;
  color: black;
  border: none;
}
p {
  padding-block: 0.25rem;
  margin: 0.5rem 0.5rem;
}
.winner {
  display: grid;
  position: absolute;
  bottom: 12rem;
  left: 2.3rem;
  width: 26%;
  place-items: center;
  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
  padding: 0.75rem 1.9375rem;
  font-weight: 450;
  font-size: 1.5rem;
  color: #43d9ad;
}
</style>
