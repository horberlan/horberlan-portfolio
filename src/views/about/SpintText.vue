<template>
  <div ref="container" class="container">
    <span class="line-item">1. /**</span>
    <span
      v-for="(line, index) in formattedContent"
      :key="index"
      class="line-item"
    >
      {{ index + 2 }}. * {{ line }}
    </span>
    <span class="line-item">{{ formattedContent.length + 2 }} **/</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from "vue";

const props = defineProps<{
  label: string;
}>();

const labelList = computed(() => props.label);

const container = ref<HTMLElement | null>(null);
const formattedContent = ref<string[]>([]);

const calculateFormattedLines = () => {
  if (typeof labelList.value !== "string") return;

  const lines = labelList.value.split("\n");
  const formattedLines: string[] = [];

  if (!container.value) return;

  const containerWidth = container.value.clientWidth - 40;

  const lineLengthByChars = containerWidth / 10;

  for (const line of lines) {
    const words = line.split(" ");
    let currentLine = "";
    let currentLineLengthByChars = 0;

    for (const word of words) {
      if (currentLineLengthByChars + word.length + 1 > lineLengthByChars) {
        formattedLines.push(currentLine.trim());
        currentLine = word + " ";
        currentLineLengthByChars = word.length + 1;
      } else {
        if (currentLine.length > 0) {
          currentLine += " ";
          currentLineLengthByChars += 1;
        }
        currentLine += word;
        currentLineLengthByChars += word.length;
      }
    }

    if (currentLine.trim()) {
      formattedLines.push(currentLine.trim());
    }
  }

  formattedContent.value = formattedLines;
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
