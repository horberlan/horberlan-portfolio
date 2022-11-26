<template>
  <section>
    <div class="panel_content">
      <slot name="panel-1"></slot>
    </div>
    <DragCol
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
  </section>
</template>

<script setup lang="ts">
import { DragCol } from "vue-resizer";
</script>

<style lang="scss" scoped>
* {
  color: white;
}
section {
  display: flex;
  width: 100%;
  height: 92vh;
}
section .panel_content {
  height: 100%;
  border: 1px solid #1e2d3d;
  //padding: 0.5rem;
  &:nth-child(1n) {
    min-width: 24rem !important;
  }
}
.resized {
  padding: 0.5rem;
}
</style>
