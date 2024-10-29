<template>
  <div ref="container" class="container">
    <span
      v-for="(line, index) in formattedContent"
      :key="index"
      class="line-item"
    >
      {{ index + 1 }}. {{ line }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from "vue";

const props = defineProps<{
  label: string | string[];
}>();

const labelList = computed(() => props.label);

const container = ref<HTMLElement | null>(null);
const formattedContent = ref<string[]>([]);

const calculateFormattedLines = () => {
  if (typeof labelList.value !== "string") return;

  const words = labelList.value.split(" ");
  let currentLine = "";
  const lines: string[] = [];

  if (!container.value) return;

  const containerWidth = container.value.clientWidth - 40;
  const spanTestElement = document.createElement("span");
  spanTestElement.style.cssText = `
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
`;
  document.body.appendChild(spanTestElement);

  for (const word of words) {
    spanTestElement.innerText = currentLine + word + " ";

    if (spanTestElement.clientWidth > containerWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }

  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  document.body.removeChild(spanTestElement);

  formattedContent.value = lines;
};

const handleResize = () => {
  calculateFormattedLines();
};

onMounted(async () => {
  await nextTick();
  calculateFormattedLines();
  window.addEventListener("resize", handleResize);
});

watch(
  () => container.value?.clientWidth,
  () => {
    calculateFormattedLines();
  }
);

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.container {
  font-family: monospace;
  font-weight: 350;
  font-size: 1.125rem;
  line-height: 1.6875rem;
  color: $font-lynch;
}

.line-item {
  display: block;
  margin-bottom: 0.625rem;
  margin-inline-start: 2rem;
}
</style>
