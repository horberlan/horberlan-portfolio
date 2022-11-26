<template>
  <svg
    v-if="type === 'simple'"
    viewBox="0 0 13 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.364 5.27715L11.314 0.327148L12.728 1.74115L6.364 8.10515L0 1.74115L1.414 0.327148L6.364 5.27715Z"
      fill="#607B96"
    />
  </svg>
  <svg
    v-else
    width="9"
    height="7"
    viewBox="0 0 9 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z"
      fill="white"
    />
  </svg>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type: string;
  }>(),
  { type: "simple" }
);
</script>
