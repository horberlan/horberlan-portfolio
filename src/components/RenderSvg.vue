<template>
  <div>
    <component :is="dynamicComponent" v-if="!svg" />
    <svg v-html="svg" v-else-if="svg" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";
import {
  MissingIconComponent,
  LoadingIconComponent,
} from "@/components/RenderIconsStates";

const props = defineProps<{
  name: string;
}>();

const modules = import.meta.glob("/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const svg = computed(() => {
  return modules["/src/assets/" + (props.name ?? "") + ".svg"] ?? null;
});

const dynamicComponent = computed(() => {
  if (svg.value !== null) return null;

  const loadingComponent = defineAsyncComponent({
    loader: () => new Promise(() => {}),
    loadingComponent: LoadingIconComponent,
    delay: 200,
    errorComponent: MissingIconComponent,
    timeout: 3000,
  });

  return loadingComponent;
});
</script>
<style scoped>
svg {
  margin-block: 2px;
  width: 100%;
  height: 100%;
}
</style>
