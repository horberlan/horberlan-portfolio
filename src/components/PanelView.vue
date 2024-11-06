<template>
  <section class="projects-content">
    <aside :class="['panel_content', containerClass]">
      <slot name="panel-1"></slot>
    </aside>
    <DragCol
      v-if="props.isResizable"
      :sliderWidth="5"
      height="auto"
      padding="10"
      sliderBgColor="#1e2d3d"
      :leftPercent="leftSize"
    >
      <template #left>
        <div class="resized">
          <slot name="panel-2"></slot>
        </div>
      </template>
      <template #right>
        <div class="resized last-panel">
          <slot name="panel-3"></slot>
        </div>
      </template>
    </DragCol>
    <div v-else :class="['left-div', containerClass]">
      <slot name="left"> </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { DragCol } from "vue-resizer";

const props = withDefaults(
  defineProps<{
    isResizable?: boolean;
  }>(),
  { isResizable: true }
);

const leftSize = ref(60);
const containerClass = ref("");
const windowSize = ref();
const updateContainerClass = () => {
  windowSize.value = `${window.outerWidth}px`;
  if (window.innerWidth < 768) {
    containerClass.value = "small-screen";
    leftSize.value = 100;
  } else {
    containerClass.value = "large-screen";
  }
};

watchEffect(() => {
  updateContainerClass();
});

onMounted(() => {
  updateContainerClass();
  window.addEventListener("resize", updateContainerClass);
  if (containerClass.value == "large-screen") {
    leftSize.value = 0;
    setTimeout(() => (leftSize.value = 60), 1400);
  }
});
</script>

<style lang="scss" scoped>
* {
  color: $white-full;
}
.projects-content {
  display: flex;
  width: 100%;

  .panel_content {
    height: 100%;
    position: relative;
    border: 1px solid #1e2d3d;
    width: $nav-size;

    &.small-screen {
      display: none;
    }
    &.large-screen {
      width: 20.1vw;
      border: 1px solid #1e2d3d;
      height: auto;
      min-height: 100%;
      box-sizing: border-box;
      @media screen and (max-width: 868px) {
        width: $nav-size / 1.38;
      }
    }
  }
  :deep(.panel-1-content) {
    position: fixed;
    width: 20vw;
  }

  .content {
    width: 100%;
  }
}
.resized {
  padding: 0.5rem;
  transition: width 0.5s ease-in-out;
  :deep(ol) li .link {
    color: $white-full;
    text-decoration: none;
  }
}
@media screen and (max-width: 768px) {
  .resized {
    height: auto;
  }
}
// .left-div {
//   width: 85%;
// }
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
:deep(.drager_col) {
  min-width: 76vw;
}
</style>
