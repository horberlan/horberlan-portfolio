<template>
  <section>
    <div class="panel_content">
      <slot name="panel-1"></slot>
    </div>
    <div class="content">
      <DragCol
        v-if="props.isResizable"
        :sliderWidth="3"
        width="100%"
        height="auto"
        padding="10"
        sliderBgColor="#1e2d3d"
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
      <div v-else>
        <slot name="left"> </slot>
      </div>
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
  color: white;
}
section {
  display: flex;
  width: 100%;
  height: 92vh;
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
}
</style>
