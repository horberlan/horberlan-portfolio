<template>
  <canvas id="snake-canvas" :width="boardSizePx" :height="boardSizePx"></canvas>
  <audio id="game-over-song" :src="sound.loser" type="audio/mp3"></audio>
  <audio id="eat-food-song" :src="sound.eat" type="audio/mp3"></audio>
  <audio id="win-game-song" :src="sound.winner" type="audio/mp3"></audio>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { defaultKeysAndMoveDirection, sound } from "./index";

import { drawCircle, drawDiamond, drawSquare } from "@/utils/game/shapes";
import { useDebounceFn } from "@vueuse/core";

interface Props {
  cellSize: number;
  boardSize: number;
  speed: number;
  isPlaying: boolean;
  stop: () => void;
  lose: () => void;
  addScores: (score: number) => void;
  scores: number;
  foodColor?: string;
  snakeColor?: string[];
  virtualKeyboardDirection: typeof direction.value;
}

interface TargetCell {
  x: number;
  y: number;
  shape: "circle" | "diamond" | "square";
}

const props = withDefaults(defineProps<Props>(), {
  snakeColor: () => ["#43D9AD", "#2b8a7f"],
  foodColor: "#2b897f",
});

defineEmits(["update:is-playing"]);

const boardContext = ref<CanvasRenderingContext2D | null>(null);
const snake = ref<{ x: number; y: number }[]>([]);
const direction = ref<{
  move: { x: number; y: number };
  keyCode: number;
} | null>(null);

const targetCell = ref<TargetCell | null>(null);
const boardSizePx = computed(() => props.cellSize * props.boardSize);

const getMiddleCell = () => Math.round(props.boardSize / 2);

function updateDirection() {
  direction.value = props.virtualKeyboardDirection;
}

const resetSnake = () => {
  const middleCell = getMiddleCell();
  const initialDirection = defaultKeysAndMoveDirection[0];
  const snakeInitialSkeletCells = [];

  for (let i = 0; i < 9; i++) {
    snakeInitialSkeletCells.push({
      x: middleCell,
      y: middleCell + (initialDirection.move.y === -1 ? -i : i),
    });
  }

  snake.value = snakeInitialSkeletCells;
  direction.value = initialDirection;
  targetCell.value = null;
};

const move = () => {
  if (!props.isPlaying) return;

  clear();
  setTargetCell();
  const newHeadCell = {
    x: direction.value ? snake.value[0].x + direction.value.move.x : 0,
    y: direction.value ? snake.value[0].y + direction.value.move.y : 0,
  };

  if (isCellOutOfBoard(newHeadCell) || amountCellsInSnake(snake.value[0]) > 1) {
    props.stop();
    isBlinking.value = true;
    blinkCount.value = 0;
    blinkThenLose();
  } else {
    if (isTargetNewHead()) {
      if (!targetCell.value) return;
      snake.value.unshift(targetCell.value);
      targetCell.value = null;
      props.addScores(props.speed);
      playGameSound("eat-food-song");
      if (props.scores === 5) playGameSound("win-game-song");
    } else {
      snake.value.unshift(newHeadCell);
      snake.value.pop();
    }
    drawSnake();
    setTimeout(move, getMoveDelay());
  }
};

const clear = () => {
  if (!boardContext.value) return;
  boardContext.value.clearRect(0, 0, boardSizePx.value, boardSizePx.value);
};

const drawSnake = () => {
  if (!boardContext.value) return;
  const gradient = boardContext.value.createLinearGradient(
    snake.value[0].x * props.cellSize,
    snake.value[0].y * props.cellSize,
    snake.value[snake.value.length - 1].x * props.cellSize,
    snake.value[snake.value.length - 1].y * props.cellSize
  );
  gradient.addColorStop(0, props.snakeColor[0]);
  gradient.addColorStop(1, props.snakeColor[1]);
  boardContext.value.fillStyle = gradient;
  snake.value.forEach((cell) => {
    if (!boardContext.value) return;
    boardContext.value.fillRect(
      cell.x * props.cellSize,
      cell.y * props.cellSize,
      props.cellSize,
      props.cellSize
    );
  });
};

const getMoveDelay = () => (2 / Number(props.speed)) * 1000;

const isCellOutOfBoard = ({ x, y }: { x: number; y: number }) => {
  return x < 0 || y < 0 || x >= props.boardSize || y >= props.boardSize;
};

const onKeyPress = useDebounceFn((event: KeyboardEvent) => {
  const newDirection = defaultKeysAndMoveDirection.find(
    (c) => c.keyCode === event.keyCode
  );

  if (!newDirection) return;
  if (!direction.value) return;
  if (Math.abs(newDirection.keyCode - direction.value.keyCode) !== 2) {
    direction.value = newDirection;
  }
}, 25);

const shapeDrawing = {
  circle: drawCircle,
  diamond: drawDiamond,
  square: drawSquare,
};

const getRandomCell = () => {
  const shape =
    Object.keys(shapeDrawing)[
      Math.floor(Math.random() * Object.keys(shapeDrawing).length)
    ];
  return {
    x: Math.floor(Math.random() * props.boardSize),
    y: Math.floor(Math.random() * props.boardSize),
    shape,
  } as TargetCell;
};

const setTargetCell = () => {
  if (!targetCell.value) {
    let localTargetCell = getRandomCell();
    while (amountCellsInSnake(localTargetCell as never) > 0) {
      localTargetCell = getRandomCell();
    }
    targetCell.value = localTargetCell;
  }
  if (!boardContext.value) return;

  const position = {
    x: targetCell.value.x * props.cellSize,
    y: targetCell.value.y * props.cellSize,
  };
  const size = props.cellSize;
  const fillColor = props.foodColor;
  const strokeWidth = 2;
  const strokeColor = "transparent";

  const drawing = shapeDrawing[targetCell.value.shape];
  if (drawing) {
    drawing(
      boardContext.value,
      position.x,
      position.y,
      size,
      fillColor,
      strokeWidth,
      strokeColor
    );
  } else {
    console.info(`Unknown shape type: ${targetCell.value.shape}`);
  }
};

const amountCellsInSnake = (cell: (typeof snake.value)[0]) => {
  return snake.value.filter(
    ({ x, y }: { x: number; y: number }) => x === cell.x && y === cell.y
  ).length;
};

const isTargetNewHead = () => {
  if (!direction.value || !targetCell.value) return;
  return (
    snake.value[0].x + direction.value.move.x === targetCell.value.x &&
    snake.value[0].y + direction.value.move.y === targetCell.value.y
  );
};

const isBlinking = ref(false);
const blinkCount = ref(0);

const playGameSound = (
  id: "game-over-song" | "eat-food-song" | "win-game-song"
) => {
  const audio = document.getElementById(id) as HTMLAudioElement;
  audio.play();
};

const blinkThenLose = () => {
  if (blinkCount.value <= 3) {
    if (isBlinking.value) {
      clear();
    } else {
      drawSnake();
      if (targetCell.value) {
        setTargetCell();
      }
    }
    isBlinking.value = !isBlinking.value;
    blinkCount.value++;
    setTimeout(blinkThenLose, 200);
    playGameSound("game-over-song");
  } else {
    isBlinking.value = false;
    console.info(`Game over! You've scored ${props.scores} points.`);
    props.lose();
  }
};
watch(
  () => props.isPlaying,
  (value) => {
    clear();
    if (value) {
      resetSnake();
      move();
    }
  }
);
watch(
  () => props.virtualKeyboardDirection,
  (value) => {
    if (value) {
      updateDirection();
    }
  },
  { deep: true }
);

onMounted(() => {
  boardContext.value = (
    document.getElementById("snake-canvas") as HTMLCanvasElement
  ).getContext("2d");
  document.getElementById("snake-canvas")?.focus();
  window.addEventListener("keydown", onKeyPress);
  // resetSnake();
  // drawSnake();
  // setTargetCell();
  // ...maybe
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyPress);
});
</script>
<style scoped>
#snake-canvas {
  padding: 1px;
  width: 110%;
  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
}
</style>
