<script setup lang="ts">
import { ref, watch } from "vue";
import SvgIcon from "./SvgIcon.vue";

const props = withDefaults(
  defineProps<{
    open: boolean;
    closed?: boolean;
    clickable?: boolean;
    title?: string;
    mode?: string;
  }>(),
  { mode: "subitem" }
);

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
  <div v-if="mode === 'subitem'" :class="['box-accordeon noselect']">
    <div class="header" @click="toggleAccordeon()">
      <SvgIcon
        name="chevronIcon"
        :rotate="opened ? '0deg' : '-90deg'"
        size="sm"
      />
      <slot name="icon-folder"></slot>
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
  <div v-else :class="['box-accordeon noselect', 'item']">
    <div class="header" @click="toggleAccordeon()">
      <SvgIcon
        name="chevronIcon"
        :rotate="opened ? '0deg' : '-90deg'"
        size="sm"
        type="custom"
        margin="0.3125rem"
      />
      <slot name="icon-folder"></slot>
      <div class="title">
        <span v-html="props.title" />
      </div>
    </div>
    <Transition>
      <div v-show="opened" class="body">
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
  &.item {
    border-bottom: 1px solid #1e2d3d;
    width: 100%;
    margin: 0;
    .header {
      padding: 0.5rem;
    }
    .body {
      margin-block: 0.5rem;
    }
  }
  .header {
    display: flex;
    gap: 1rem;
    font-style: normal;
    font-weight: 400;
    color: #ffffff;
    margin: 0.25rem;
    cursor: pointer;
    margin-block-end: 1.5rem;
    align-items: center;
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
