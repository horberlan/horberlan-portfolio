<template>
  <canvas
    ref="board"
    id="snake-canvas"
    :width="boardSizePx"
    :height="boardSizePx"
  ></canvas>
</template>
<script src="./SnakeCanvas.ts"></script>

<style scoped src="./SnakeCanvas.css"></style>
