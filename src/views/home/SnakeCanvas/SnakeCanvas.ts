import constants from "./constants";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SnakeCanvas",
  props: {
    cellSize: {
      type: Number,
      default: 0,
    },
    boardSize: {
      type: Number,
      default: 0,
    },
    speed: Number,
    isPlaying: Boolean,
    stop: Function,
    addScores: Function,
    scores: Number,
  },
  data(): {
    boardContext: CanvasRenderingContext2D | null;
    snake: { x: number; y: number }[];
    direction: { keyCode: number; move: { x: number; y: number } } | null;
    targetCell: { x: number; y: number } | null;
  } {
    return {
      boardContext: null,
      snake: [],
      direction: null,
      targetCell: null,
    };
  },
  computed: {
    boardSizePx(): number | undefined {
      return this.cellSize * this.boardSize;
    },
  },
  mounted(): void {
    this.boardContext = this.$refs.board.getContext("2d");
    this.$refs.board.focus();
    window.addEventListener("keydown", this.onKeyPress);
  },
  created(): void {
    this.resetSnake();
  },
  beforeUnmount(): void {
    window.removeEventListener("keydown", this.onKeyPress);
  },
  watch: {
    isPlaying(value: boolean): void {
      this.clear();
      if (value) {
        this.resetSnake();
        this.move();
      }
    },
  },
  methods: {
    resetSnake(): void {
      this.snake = [
        {
          x: this.getMiddleCell(),
          y: this.getMiddleCell(),
        },
      ];
      const randomDirectionIndex: number = Math.floor(Math.random() * 4);
      this.direction = constants[randomDirectionIndex];
      this.targetCell = null;
    },
    getMiddleCell(): number {
      return Math.round(this.boardSize / 2);
    },
    move(): void {
      if (!this.isPlaying) {
        return;
      }

      this.clear();
      this.setTargetCell();

      const newHeadCell: { x: number; y: number } = {
        x: this.snake[0].x + this.direction.move.x,
        y: this.snake[0].y + this.direction.move.y,
      };

      if (
        this.isCellOutOfBoard(newHeadCell) ||
        this.amountCellsInSnake(this.snake[0]) > 1
      ) {
        this.stop();
        console.log(`Game over! You've scored ${this.scores} points.`);
      }

      if (this.isTargetNewHead()) {
        this.snake.unshift(this.targetCell);
        this.targetCell = null;
        this.addScores(this.speed);
      } else {
        this.snake.unshift(newHeadCell);
        this.snake.pop();
      }

      this.boardContext.beginPath();
      this.snake.forEach((cell: { x: number; y: number }) => this.drawCell(cell));
      this.boardContext.closePath();

      setTimeout(this.move, this.getMoveDelay());
    },
    clear(): void {
      this.boardContext.clearRect(0, 0, this.boardSizePx, this.boardSizePx);
    },
    drawCell({ x, y }: { x: number; y: number }): void {
      this.boardContext.rect(
        x * this.cellSize,
        y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      this.boardContext.fillStyle = "#43D9AD";
      this.boardContext.fill();
    },
    getMoveDelay(): number {
      return (2 / Number(this.speed)) * 1000;
    },
    isCellOutOfBoard({ x, y }: { x: number; y: number }): boolean {
      return x < 0 || y < 0 || x >= this.boardSize || y >= this.boardSize;
    },
    onKeyPress(event: KeyboardEvent): void {
      const newDirection: { keyCode: number; move: { x: number; y: number } } | undefined = constants.find((c) => c.keyCode === event.keyCode);

      if (!newDirection) {
        return;
      }

      if (Math.abs(newDirection.keyCode - this.direction.keyCode) !== 2) {
        this.direction = newDirection;
      }
    },
    setTargetCell(): void {
      if (!this.targetCell) {
        let targetCell: { x: number; y: number } = this.getRandomCell();
        while (this.amountCellsInSnake(targetCell) > 0) {
          targetCell = this.getRandomCell();
        }
        this.targetCell = targetCell;
      }

      this.boardContext.beginPath();
      this.boardContext.rect(
        this.targetCell.x * this.cellSize,
        this.targetCell.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      this.boardContext.fillStyle = "green";
      this.boardContext.fill();
      this.boardContext.closePath();
    },
    getRandomCell(): { x: number; y: number } {
      return {
        x: Math.floor(Math.random() * this.boardSize),
        y: Math.floor(Math.random() * this.boardSize),
      };
    },
    amountCellsInSnake(cell: { x: number; y: number }): number {
      return this.snake.filter(({ x, y }) => x === cell.x && y === cell.y)
        .length;
    },
    isTargetNewHead(): boolean {
      return (
        this.snake[0].x + this.direction.move.x === this.targetCell.x &&
        this.snake[0].y + this.direction.move.y === this.targetCell.y
      );
    },
  },
});