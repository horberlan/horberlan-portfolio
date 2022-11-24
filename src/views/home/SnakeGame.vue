<template>
  <div class="snake">
    <canvas
      id="stage"
      class="snake_game"
      ref="canva"
      width="250"
      height="400"
    ></canvas>
    <div>
      <div class="snake_keymap">// lalala</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const canva = ref();

var Game = Game || {};
var Keyboard = Keyboard || {};
var Component = Component || {};

/**
 * Keyboard Map
 */
Keyboard.Keymap = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

/**
 * Keyboard Events
 */
Keyboard.ControllerEvents = function () {
  // Setts
  var self = this;
  this.pressKey = null;
  this.keymap = Keyboard.Keymap;

  // Keydown Event
  document.onkeydown = function (event) {
    self.pressKey = event.which;
  };

  // Get Key
  this.getKey = function () {
    return this.keymap[this.pressKey];
  };
};

/**
 * Game Component Stage
 */
Component.Stage = function (canvas, conf) {
  // Sets
  this.keyEvent = new Keyboard.ControllerEvents();
  this.width = canvas.width;
  this.height = canvas.height;
  this.length = [];
  this.food = {};
  this.score = 0;
  this.direction = "right";
  this.conf = {
    cw: 5,
    size: 10,
    fps: 1000,
  };

  // Merge Conf
  if (typeof conf == "object") {
    for (var key in conf) {
      if (conf.hasOwnProperty(key)) {
        this.conf[key] = conf[key];
      }
    }
  }
};

/**
 * Game Component Snake
 */
Component.Snake = function (canvas, conf) {
  // Game Stage
  this.stage = new Component.Stage(canvas, conf);

  // Init Snake
  this.initSnake = function () {
    // Itaration in Snake Conf Size
    for (var i = 0; i < this.stage.conf.size; i++) {
      // Add Snake Cells
      this.stage.length.push({ x: i, y: 0 });
    }
  };

  // Call init Snake
  this.initSnake();

  // Init Food
  this.initFood = function () {
    // Add food on stage
    this.stage.food = {
      x: Math.round(
        (Math.random() * (this.stage.width - this.stage.conf.cw)) /
          this.stage.conf.cw
      ),
      y: Math.round(
        (Math.random() * (this.stage.height - this.stage.conf.cw)) /
          this.stage.conf.cw
      ),
    };
  };

  // Init Food
  this.initFood();

  // Restart Stage
  this.restart = function () {
    this.stage.length = [];
    this.stage.food = {};
    this.stage.score = 0;
    this.stage.direction = null;
    this.stage.keyEvent.pressKey = null;
    this.initSnake();
    this.initFood();
  };
};

/**
 * Game Draw
 */
Game.Draw = function (context, snake) {
  // Draw Stage
  this.drawStage = function () {
    // Check Keypress And Set Stage direction
    var keyPress = snake.stage.keyEvent.getKey();
    if (typeof keyPress != "undefined") {
      snake.stage.direction = keyPress;
    }

    // Draw White Stage

    context.fillStyle = "rgba(1, 22, 39, 0.84)";
    context.fillRect(0, 0, snake.stage.width, snake.stage.height);

    // Snake Position
    var nx = snake.stage.length[0].x;
    var ny = snake.stage.length[0].y;

    // Add position by stage direction
    switch (snake.stage.direction) {
      case "right":
        nx++;
        break;
      case "left":
        nx--;
        break;
      case "up":
        ny--;
        break;
      case "down":
        ny++;
        break;
    }

    // Check Collision
    if (this.collision(nx, ny) == true) {
      snake.restart();
      return;
    }

    // Logic of Snake food
    if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
      var tail = { x: nx, y: ny };
      snake.stage.score++;
      snake.initFood();
    } else {
      var tail = snake.stage.length.pop();
      tail.x = nx;
      tail.y = ny;
    }
    snake.stage.length.unshift(tail);

    // Draw Snake
    for (var i = 0; i < snake.stage.length.length; i++) {
      var cell = snake.stage.length[i];
      this.drawCell(cell.x, cell.y);
    }

    // Draw Food
    this.drawCell(snake.stage.food.x, snake.stage.food.y);

    // Draw Score
    // context.fillText("Score: " + snake.stage.score, 5, snake.stage.height - 5);
    // if (snake.stage.score === 2){
    console.log(snake.stage.score);
    // }
  };

  // Draw Cell
  this.drawCell = function (x, y) {
    context.shadowColor = "rgba(255, 255, 255, 0.3)";
    context.shadowBlur = 5;
    context.fillStyle = "#43D9AD";
    context.borderRadios = "0";
    context.beginPath();
    context.arc(
      x * snake.stage.conf.cw + 0,
      y * snake.stage.conf.cw + 0,
      8,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
  };

  // Check Collision with walls
  this.collision = function (nx, ny) {
    if (
      nx == -1 ||
      nx == snake.stage.width / snake.stage.conf.cw ||
      ny == -1 ||
      ny == snake.stage.height / snake.stage.conf.cw
    ) {
      return true;
    }
    return false;
  };
};

/**
 * Game Snake
 */
Game.Snake = function (elementId, conf) {
  // Sets
  var canvas = document.getElementById(elementId);
  var context = canvas.getContext("2d");
  var snake = new Component.Snake(canvas, conf);
  var gameDraw = new Game.Draw(context, snake);

  // Game Interval
  setInterval(function () {
    gameDraw.drawStage();
  }, snake.stage.conf.fps);
};

/**
 * Window Load
 */
window.onload = function () {
  var snake = new Game.Snake("stage", { fps: 100, size: 22 });
};
</script>

<style lang="scss" scoped>
.snake {
  display: flex;
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
}
.snake_game {
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
  margin-block-end: 1rem;
}
</style>
