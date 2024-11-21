<template>
  <Transition>
    <div class="container" v-if="showPopUp">
      <div class="container_pop-up">
        <div class="container_pop-up_icon">
          <SvgIcon skeleton name="WarningIcon" size="md" />
        </div>
        <p class="container_pop-up_message">Message sent successfully</p>
        <div
          role="button"
          class="container_pop-up_close"
          @click="emit('update:showMessage', false)"
        >
          &#x2715;
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    showMessage: boolean;
  }>(),
  { showMessage: false }
);
const emit = defineEmits(["update:showMessage"]);
const showPopUp = ref(props.showMessage);

watchEffect(() => {
  showPopUp.value = props.showMessage;
  if (showPopUp.value) {
    setTimeout(() => {
      emit("update:showMessage", false);
    }, 5000);
  }
});
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  right: 1.25rem;
  bottom: 4.5rem;
  background: #1c2b3a;
  padding-block: 1rem;
  color: #fff;
  line-height: 1rem;
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
      width: 15px;
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
