<template>
  <Transition>
    <div class="container z-[1000]" v-if="showToast">
      <div class="container_pop-up">
        <div class="container_pop-up_icon">
          <SvgIcon skeleton name="WarningIcon" size="md" />
        </div>
        <p class="container_pop-up_message" v-html="message" />
        <template v-if="hasCloseIcon">
          <div
            role="button"
            class="container_pop-up_close"
            @click="emit('update:show-message', false)"
          >
            &#x2715;
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    hasCloseIcon?: boolean;
    message?: string;
    showMessage: boolean;
    timeout?: number;
  }>(),

  {
    hasCloseIcon: false,
    showMessage: false,
    message: "Message sent successfully",
    timeout: 5000,
  }
);

const emit = defineEmits(["update:show-message"]);
const showToast = ref(props.showMessage);

watchEffect(() => {
  showToast.value = props.showMessage;
  if (showToast.value) {
    setTimeout(() => {
      emit("update:show-message", false);
    }, props.timeout);
  }
});
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  inset-inline-end: 1.25rem;
  inset-block-end: 1.5rem;
  background: #1c2b3a;
  padding-block: 1rem;
  color: #fff;
  line-height: 1rem;
  border-radius: 8px;
  z-index: 9;
  max-width: 350px;
  width: fit-content;

  &_pop-up {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-inline: 1rem;
    gap: 0.75rem;

    &_message {
      color: white;
      margin: 0;
    }

    &_close {
      inline-size: 15px;
      aspect-ratio: 1;
      cursor: pointer;
      color: #949da6;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 600ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
