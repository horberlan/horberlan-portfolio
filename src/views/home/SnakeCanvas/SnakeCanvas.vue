<template>
  <canvas id="snake-canvas" :width="boardSizePx" :height="boardSizePx"></canvas>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import constants from "./constants";
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
}

const props = withDefaults(defineProps<Props>(), {
  snakeColor: () => ["#43D9AD", "#2b8a7f"],
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
  const middleCell = getMiddleCell();
  const initialDirection = constants[0];
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
    props.lose();
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
  drawSnake();
  setTimeout(move, getMoveDelay());
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

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

const setTargetCell = () => {
  if (!targetCell.value) {
    let targetCell2 = getRandomCell();
    while (amountCellsInSnake(targetCell as never) > 0) {
      targetCell2 = getRandomCell();
    }
    targetCell.value = targetCell2;
  }
  if (!boardContext.value) return;

  boardContext.value.fillStyle = props.foodColor;
  // round food here
  roundRect(
    boardContext.value,
    targetCell.value.x * props.cellSize,
    targetCell.value.y * props.cellSize,
    props.cellSize,
    props.cellSize,
    props.cellSize / 2 // a circle :)
  );
  boardContext.value.fill();

  // color border, the same of bachground
  boardContext.value.strokeStyle = "#052430";
  boardContext.value.lineWidth = 2;
  roundRect(
    boardContext.value,
    targetCell.value.x * props.cellSize,
    targetCell.value.y * props.cellSize,
    props.cellSize,
    props.cellSize,
    props.cellSize / 5
  );
  boardContext.value.stroke();
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

<style scoped>
#snake-canvas {
  padding: 1px;
  width: 110%;
  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
}
</style>
