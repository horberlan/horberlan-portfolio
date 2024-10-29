<template>
  <svg
    viewBox="0 0 182 143"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="handleClick($event)"
  >
    <rect
      x="0.309082"
      y="0.69104"
      width="181.382"
      height="142"
      rx="8"
      fill="#011423"
      fill-opacity="0.19"
    />
    <rect
      id="topKey"
      x="67.4609"
      y="68.4636"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer"
    />
      
      <path d="M91.5 79.3091L95.75 85.3091H87.25L91.5 79.3091Z" fill="white" />
    <rect
      id="bottomKey"
      x="115.539"
      y="129.655"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      transform="rotate(-180 115.539 129.655)"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer"
    />
    <path
      d="M91.5 118.809L87.25 112.809L95.75 112.809L91.5 118.809Z"
      fill="white"
    />
    <rect
      id="rightKey"
      x="169"
      y="129.655"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      transform="rotate(-180 169 129.655)"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer"
    />
    <path
      d="M147.96 115.809L141.96 120.059L141.96 111.559L147.96 115.809Z"
      fill="white"
    />
    <rect
      id="leftKey"
      x="62.0786"
      y="129.655"
      width="48.0787"
      height="27.6912"
      rx="7.5"
      transform="rotate(-180 62.0786 129.655)"
      fill="#010C15"
      stroke="#1E2D3D"
      class="pointer"
    />
    <path
      d="M35.0391 115.809L41.0391 111.559L41.0391 120.059L35.0391 115.809Z"
      fill="white"
    />
  </svg>
</template>
<script lang="ts" setup>
import { defaultKeysAndMoveDirection } from "@/views/home/SnakeCanvas";

const keyMapping = {
  topKey: "top",
  bottomKey: "bottom",
  rightKey: "right",
  leftKey: "left",
};
const emit = defineEmits(["update-direction"]);

const handleClick = (event) => {
  const direction = getDirectionFromTarget(event.target.id);
  emit("update-direction", direction);
};

const getDirectionFromTarget = (targetId: keyof typeof keyMapping) => {
  const direction = keyMapping[targetId as keyof typeof keyMapping];
  if (direction) {
    return defaultKeysAndMoveDirection.find(
      (item) => item.direction === direction
    );
  }
  return null;
};
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
