<template>
  <vue-markdown
    :source="String(route)"
    :plugins="plugins"
    class="markdown-container"
  />
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import MarkdownItAnchor from "markdown-it-anchor";

defineProps<{
  route: string;
}>();

const plugins = [MarkdownItAnchor];
</script>

<style lang="scss" scoped>
.markdown-container {
  * {
    color: $font-lynch;
  }
  :deep(ol) {
    font-weight: 350;
    font-size: 1.125rem;
    line-height: 1.6875rem;
    color: $font-lynch;
    li {
      padding-inline-start: 1.5rem;
      margin-inline-start: 2rem;
      &::marker {
        display: block;
        font-weight: lighter;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  :deep(ol) li {
    margin-inline-start: 0rem;
    padding-inline-start: 0rem;
  }
}
</style>
