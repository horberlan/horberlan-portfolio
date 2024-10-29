<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import constants from "./constants";

interface Props {
  cellSize: number;
  boardSize: number;
  speed: number;
  isPlaying: boolean;
  stop: () => void;
  addScores: (score: number) => void;
  scores: number;
  foodColor?: string;
  snakeColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  snakeColor: "#43D9AD",
  foodColor: "#2b897f",
});
defineEmits(["update:isPlaying"]);

const boardContext = ref<CanvasRenderingContext2D | null>(null);
const snake = ref<{ x: number; y: number }[]>([]);
const direction = ref<{
  move: { x: number; y: number };
  keyCode: number;
} | null>(null);

const targetCell = ref<{ x: number; y: number } | null>(null);

const boardSizePx = computed(() => props.cellSize * props.boardSize);

const getMiddleCell = () => Math.round(props.boardSize / 2);

const resetSnake = () => {
  snake.value = [
    {
      x: getMiddleCell(),
      y: getMiddleCell(),
    },
  ];
  const randomDirectionIndex = Math.floor(Math.random() * 4);
  direction.value = constants[randomDirectionIndex];
  targetCell.value = null;
};

const move = () => {
  if (!props.isPlaying) {
    return;
  }

  clear();
  setTargetCell();

  const newHeadCell = {
    x: direction.value ? snake.value[0].x + direction.value.move.x : 0,
    y: direction.value ? snake.value[0].y + direction.value.move.y : 0,
  };

  if (isCellOutOfBoard(newHeadCell) || amountCellsInSnake(snake.value[0]) > 1) {
    props.stop();
    console.info(`Game over! You've scored ${props.scores} points.`);
  }

  if (isTargetNewHead()) {
    if (!targetCell.value) return;
    snake.value.unshift(targetCell.value);
    targetCell.value = null;
    props.addScores(props.speed);
  } else {
    snake.value.unshift(newHeadCell);
    snake.value.pop();
  }
  if (!boardContext.value) return;
  boardContext.value.beginPath();
  snake.value.forEach(drawCell);
  boardContext.value.closePath();

  setTimeout(move, getMoveDelay());
};

const clear = () => {
  if (!boardContext.value) return;
  boardContext.value.clearRect(0, 0, boardSizePx.value, boardSizePx.value);
};

const drawCell = ({ x, y }: { x: number; y: number }) => {
  if (!boardContext.value) return;
  boardContext.value.rect(
    x * props.cellSize,
    y * props.cellSize,
    props.cellSize,
    props.cellSize
  );
  boardContext.value.fillStyle = "#43D9AD";
  boardContext.value.fill();
};

const getMoveDelay = () => (2 / Number(props.speed)) * 1000;

const isCellOutOfBoard = ({ x, y }: { x: number; y: number }) => {
  return x < 0 || y < 0 || x >= props.boardSize || y >= props.boardSize;
};

const onKeyPress = (event: KeyboardEvent) => {
  const newDirection = constants.find((c) => c.keyCode === event.keyCode);

  if (!newDirection) {
    return;
  }
  if (!direction.value) return;
  if (Math.abs(newDirection.keyCode - direction.value.keyCode) !== 2) {
    direction.value = newDirection;
  }
};

const setTargetCell = () => {
  if (!targetCell.value) {
    let targetCell2 = getRandomCell();
    while (amountCellsInSnake(targetCell as never) > 0) {
      targetCell2 = getRandomCell();
    }
    targetCell.value = targetCell2;
  }
  if (!boardContext.value) return;
  boardContext.value.beginPath();
  boardContext.value.rect(
    targetCell.value.x * props.cellSize,
    targetCell.value.y * props.cellSize,
    props.cellSize,
    props.cellSize
  );
  boardContext.value.fillStyle = props.foodColor;
  boardContext.value.fill();
  boardContext.value.closePath();
};

const getRandomCell = () => {
  return {
    x: Math.floor(Math.random() * props.boardSize),
    y: Math.floor(Math.random() * props.boardSize),
  };
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

onMounted(() => {
  boardContext.value = (
    document.getElementById("snake-canvas") as HTMLCanvasElement
  ).getContext("2d");
  document.getElementById("snake-canvas")?.focus();
  window.addEventListener("keydown", onKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyPress);
});

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
</script>

<template>
  <canvas id="snake-canvas" :width="boardSizePx" :height="boardSizePx"></canvas>
</template>

<style scoped>
#snake-canvas {
  width: 100%;
  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
}
</style>
