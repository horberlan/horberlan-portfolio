<template>
  <section>
    <div class="panel_content">
      <slot name="panel-1"></slot>
    </div>
    <DragCol
      v-if="props.isResizable"
      :sliderWidth="5"
      width="100%"
      height="auto"
      padding="10"
      sliderBgColor="#1e2d3d"
      :leftPercent="60"
    >
      <template #left>
        <div class="resized">
          <slot name="panel-2"></slot>
        </div>
      </template>
      <template #right>
        <div class="resized">
          <slot name="panel-3"></slot>
        </div>
      </template>
    </DragCol>
    <div v-else class="left-div">
      <slot name="left"> </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DragCol } from "vue-resizer";

const props = withDefaults(
  defineProps<{
    isResizable: boolean;
  }>(),
  { isResizable: true }
);
</script>

<style lang="scss" scoped>
* {
  color: $white-full;
}
section {
  display: flex;
  width: 100%;
  height: 92vh;
  padding-block-end: 2rem;

  .panel_content {
    height: 100%;
    border: 1px solid #1e2d3d;
    width: 20.5rem;
  }

  .content {
    width: 100%;
  }
}
.resized {
  padding: 0.5rem;
  :deep(ol) li .link {
    color: $white-full;
    text-decoration: none;
  }
}
.left-div {
  overflow-y: scroll;
}
* {
  scrollbar-width: thin;
  scrollbar-color: #011221 transparent;
}

*::-webkit-scrollbar {
  width: 10px;
  width: 10px;
}
*::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #091e31;
}
</style>
