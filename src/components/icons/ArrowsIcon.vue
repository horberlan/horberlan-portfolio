<template>
  <svg
    viewBox="0 0 182 143"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="handleClick($event)"
  >
    <rect
      id="topKeyRect"
      x="67.4609"
      y="68.4636"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer key"
      tabindex="0"
    />
    <path
      id="topKeyArrow"
      d="M91.5 79.3091L95.75 85.3091H87.25L91.5 79.3091Z"
      fill="white"
      class="pointer key"
      tabindex="0"
    />

    <rect
      id="bottomKeyRect"
      x="115.539"
      y="129.655"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      transform="rotate(-180 115.539 129.655)"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer key"
      tabindex="0"
    />
    <path
      id="bottomKeyArrow"
      d="M91.5 118.809L87.25 112.809L95.75 112.809L91.5 118.809Z"
      fill="white"
      class="pointer key"
      tabindex="0"
    />

    <rect
      id="rightKeyRect"
      x="169"
      y="129.655"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      transform="rotate(-180 169 129.655)"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer key"
      tabindex="0"
    />
    <path
      id="rightKeyArrow"
      d="M147.96 115.809L141.96 120.059L141.96 111.559L147.96 115.809Z"
      fill="white"
      class="pointer key"
      tabindex="0"
    />

    <rect
      id="leftKeyRect"
      x="62.0786"
      y="129.655"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      transform="rotate(-180 62.0786 129.655)"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer key"
      tabindex="0"
    />
    <path
      id="leftKeyArrow"
      d="M35.0391 115.809L41.0391 111.559L41.0391 120.059L35.0391 115.809Z"
      fill="white"
      class="pointer key"
      tabindex="0"
    />
  </svg>
</template>

<script lang="ts" setup>
import { defaultKeysAndMoveDirection } from "@/views/home/SnakeCanvas";
import { ref } from "vue";

const keyMapping: { [key: string]: string } = {
  topKeyRect: "top",
  topKeyArrow: "top",
  bottomKeyRect: "bottom",
  bottomKeyArrow: "bottom",
  rightKeyRect: "right",
  rightKeyArrow: "right",
  leftKeyRect: "left",
  leftKeyArrow: "left",
};

const emit = defineEmits(["update-direction"]);

const currentDirection = ref<string | null>(null);
const oppositeDirections: { [key: string]: string } = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const handleClick = (event: MouseEvent) => {
  if (event.target && (event.target as HTMLElement).classList.contains("key")) {
    const targetId = (event.target as HTMLElement).id;
    const newDirection = keyMapping[targetId];
    if (newDirection) {
      if (validateDirection(currentDirection.value, newDirection)) {
        const moveDirection = defaultKeysAndMoveDirection.find(
          (item) => item.direction === newDirection
        );
        if (moveDirection) {
          emit("update-direction", moveDirection);
          currentDirection.value = newDirection;
        }
      }
    }
  }
};

const validateDirection = (
  current: string | null,
  newDirection: string
): boolean => {
  if (!current) return true;
  if (current === newDirection) return false;
  if (oppositeDirections[current] === newDirection) return false;
  return true;
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}

.pointer:focus {
  outline: 2px #fea55f;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #fea55f;
  transition: outline-offset 0.2s, box-shadow 0.2s;
}
</style>
