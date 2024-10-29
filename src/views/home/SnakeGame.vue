<template>
  <div class="snake">
    <div id="app">
      <SnakeCanvas
        :cellSize="cellSize"
        :boardSize="boardSize"
        :speed="speed"
        :isPlaying="isPlaying"
        :stop="stop"
        :lose="lose"
        :addScores="addScores"
        :scores="scores"
      />
      <div v-if="winner" class="winner">
        <span> WELL DONE! </span>
      </div>
      <div v-if="loser" class="winner">
        <span> YOU LOSE! </span>
      </div>
      <div>
        <div class="skane-actions">
          <span>Score: {{ scores }}</span>
          <button
            id="play-btn"
            ref="buttonSnake"
            v-if="!isPlaying"
            @keydown.space="isPlaying ? stop() : start()"
            @click="isPlaying ? stop() : start()"
          >
            {{ isPlaying ? "end-game" : "start-game" }}
          </button>
        </div>
      </div>
    </div>
    <div id="label">
      <div class="snake_keymap">
        <p>// use keyboard</p>
        <p>// arrows to play</p>
        <div class="keymap"></div>
      </div>
      <p>// food left</p>

      <div v-if="scores <= 6" class="foods">
        <SvgIcon
          v-for="foods in foodLoop"
          :key="foods.name"
          :name="foods.name"
          :empty="foods.empty"
          size="xl"
        />
      </div>
      <div v-else>
        {{ textFinish }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watchEffect } from "vue";
import SnakeCanvas from "@/views/home/SnakeCanvas/SnakeCanvas.vue";
import SvgIcon from "@/components/SvgIcon.vue";

const cellSize = ref(50);
const boardSize = ref(25);
const speed = ref(15);
const scores = ref(0);
const isPlaying = ref(false);
const winner = ref(false);
const loser = ref(false);

const textFinish = ref("");
const buttonSnake = ref(null) as Ref<HTMLElement | null>;

const foodLoop = ref([
  { name: "SnakeFood", empty: true },
  { name: "SnakeFood", empty: true },
  { name: "SnakeFood", empty: true },
  { name: "SnakeFood", empty: true },
  { name: "SnakeFood", empty: true },
  { name: "SnakeFood", empty: true },
]);

const start = () => {
  isPlaying.value = true;
  winner.value = false;
  loser.value = false;
  scores.value = 0;
};

const stop = () => {
  isPlaying.value = false;
  scores.value = 0;
};
const lose = () => {
  stop();
  loser.value = true;
};

const addScores = () => {
  scores.value = ++scores.value;

  const nextEmptyItemIndex = foodLoop.value.findIndex(
    (item) => item.empty === true
  );

  if (nextEmptyItemIndex !== -1) {
    foodLoop.value[nextEmptyItemIndex].empty = false;
  }

  if (scores.value === 6) {
    winner.value = true;
    stop();

    foodLoop.value.forEach((item) => (item.empty = true));
  }
};

watchEffect(() => {
  if (buttonSnake.value) buttonSnake.value.focus();
});
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#label {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2%;
}

.snake {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  padding-block: 2.5rem;
  padding-inline: 2rem;
  width: 31.875rem;
  height: 29.6875rem;
  background: url("../../assets/snake_game_bg.svg") no-repeat;
  background-size: cover;
  gap: 2rem;
  margin: 0.25rem;
}

@media screen and (max-width: 768px) {
  .snake {
    width: auto;
  }
}

.snake_keymap {
  margin: 0 auto;
  display: flex;
  flex-flow: column;

  .keymap {
    background: url("../../assets/snake_game_keymap.svg") no-repeat;
    background-size: cover;
    width: 11.3362rem;
    height: 8.875rem;
  }
}

.snake_game {
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
  margin-block-end: 1rem;
}

#play-btn {
  background: #fea55f;
  padding: 0.625rem 0.875rem;
  border-radius: 0.5rem;
  color: black;
  border: none;
  outline: none;
  cursor: pointer;
}

p {
  padding-block: 0.25rem;
  margin: 0 0.5rem;
}

.winner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15rem;
  left: 55%;
  transform: translateX(-49.9%);
  width: 110%;
  place-items: center;
  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
  padding: 0.75rem 1.9375rem;
  font-weight: 450;
  font-size: 1.5rem;
  color: #43d9ad;
}

.skane-actions {
  display: flex;
  justify-content: space-between;

  span {
    line-height: 2.3rem;
  }
}

.foods {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
