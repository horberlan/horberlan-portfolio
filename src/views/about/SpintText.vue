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
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from "vue";

const contentList = `Working as a Full Stack developer with emphasis on Front-end javaScript frameworks such as React.js and Vue.js 3 (Composition API), Back-end in python3 (Django) and Node.js. Mobile application development using React Native Framework. Worked on 11 new products in the last 6 months for Fermen.to and Flow E.F inc. Aiming at a minimum of 95% performance in collaborative development applications. Passionate about decentralized projects on WEB3. One of my projects created in 2021 got 4600+ downloads and 8.8 rating on Pling Store. In my spare time I contribute as a translation reviewer for GitLab inc.`;

const container = ref<HTMLElement | null>(null);
const formattedContent = ref<string[]>([]);

const calculateFormattedLines = () => {
  const words = contentList.split(" ");
  let currentLine = "";
  const lines: string[] = [];

  if (!container.value) return;

  const containerWidth = container.value.clientWidth - 40;
  const testElement = document.createElement("span");
  testElement.style.cssText =
    "position: absolute; visibility: hidden; white-space: nowrap;";
  document.body.appendChild(testElement);

  for (const word of words) {
    testElement.innerText = currentLine + word + " ";

    if (testElement.clientWidth > containerWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }

  // Push the last line if it exists
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  document.body.removeChild(testElement);

  // Update formattedContent with the lines
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
