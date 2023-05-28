<template>
  <section class="projects-content">
    <div :class="['panel_content', containerClass]">
      <slot name="panel-1"></slot>
    </div>
    <DragCol
      v-if="props.isResizable"
      :sliderWidth="5"
      width="100%"
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
import { onMounted, ref, watch, watchEffect } from "vue";
import { DragCol } from "vue-resizer";

const props = withDefaults(
  defineProps<{
    isResizable: boolean;
  }>(),
  { isResizable: true }
);
const leftSize = ref(60);
const containerClass = ref('');
const windowSize = ref();
const updateContainerClass = () => {
  windowSize.value = `${window.outerWidth}px`
  if (window.innerWidth < 768) {
    containerClass.value = 'small-screen';
    leftSize.value = 100;
  } else {
    containerClass.value = 'large-screen';
  }
};
watchEffect(()=> {
  updateContainerClass()
})


onMounted(() => {
  updateContainerClass(); 
  window.addEventListener("resize", updateContainerClass);
})
</script>

<style lang="scss" scoped>
* {
  color: $white-full;
}
.projects-content {
  width: v-bind(windowSize);
  height: 100%;
}
section {
  display: flex;
  width: 100%;
  padding-block-end: 2rem;

  .panel_content {
    height: 100%;
    border: 1px solid #1e2d3d;
    width: 20.5rem;
    &.small-screen {
      display: none;
    }
  }
  

  .content {
    width: 100%;
  }
}
.resized {
  padding: 0.5rem;
  height: 100vw;
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
.left-div {
  width: v-bind(windowSize);

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
