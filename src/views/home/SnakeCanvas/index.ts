const defaultKeysAndMoveDirection = [
  {
    direction: "left",
    keyCode: 37,
    move: {
      x: -1,
      y: 0,
    },
  },
  {
    direction: "top",
    keyCode: 38,
    move: {
      x: 0,
      y: -1,
    },
  },
  {
    direction: "right",
    keyCode: 39,
    move: {
      x: 1,
      y: 0,
    },
  },
  {
    direction: "bottom",
    keyCode: 40,
    move: {
      x: 0,
      y: 1,
    },
  },
] as {
  direction: string;
  keyCode: number;
  move: {
    x: number;
    y: number;
  };
}[];

export { default } from "./SnakeCanvas.vue";
export { defaultKeysAndMoveDirection };
