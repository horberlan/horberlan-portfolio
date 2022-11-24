<script setup lang="ts">
import { ref, watch } from "vue";
import SvgIcon from "./SvgIcon.vue";

const props = defineProps<{
  open: boolean;
  closed?: boolean;
  clickable?: boolean;
  title?: string;
  mode?: string;
}>();

const emit = defineEmits(["close-all", "selected"]);

const defaultClickable = ref(props.clickable || true);
const defaultOpen = ref(props.open || false);

const opened = ref(defaultOpen.value);

watch(
  () => props.closed,
  () => {
    if (props.closed) {
      opened.value = props.open;
      emit("close-all", false);
    }
  }
);
watch(
  () => props.open,
  () => {
    opened.value = props.open;
  }
);

const toggleAccordeon = () => {
  emit("close-all", true);
  if (defaultClickable.value) {
    opened.value = !opened.value;
    emit("selected", opened.value);
  }
};
</script>
<template>
  <div :class="['box-accordeon noselect']">
    <div class="header" @click="toggleAccordeon()">
      <SvgIcon
        name="chevronIcon"
        :rotate="opened ? '0deg' : '-90deg'"
        size="sm"
      />
      <div class="title">
        <span v-html="props.title" />
      </div>
    </div>
    <Transition>
      <div v-if="opened" class="body">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
:deep(.svg-icon) {
  transition: transform 200ms ease-in-out;
}
.box-accordeon {
  display: grid;
  .header {
    display: flex;
    gap: 1rem;
    font-style: normal;
    font-weight: 400;
    color: #ffffff;
    margin: 0.25rem;
    cursor: pointer;
  }
  .body {
    padding-right: 0;
    padding-inline-start: 0;
    word-break: break-all;
  }
}

@media screen and (min-width: 768px) {
  .box-accordeon {
    .header {
      padding-inline-end: 1rem;
    }

    .body {
      margin-inline: 1.5rem 0;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 100ms ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
