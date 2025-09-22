<template>
  <template v-if="typeof route === 'string'">
    <vue-markdown
      :source="route"
      :plugins="plugins"
      class="markdown-container"
    />
  </template>
  <template v-else>
    <skeleton-box class="skeleton-box-title" />
    <skeleton-box
      v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :key="index"
      class="skeleton-box-content"
    />
  </template>
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import MarkdownItAnchor from "markdown-it-anchor";
import { h } from "vue";

defineProps<{
  route: string | null;
}>();

const plugins = [MarkdownItAnchor];

const SkeletonBox = () => {
  return h("div", { class: `skeleton-box` });
};
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
.skeleton-box {
  &-title {
    height: 3rem;
    margin-block: 1.5rem 1rem;
    opacity: 0.1;
  }
  &-content {
    max-height: 1.5rem;
    opacity: 0.1;
  }
}
</style>
