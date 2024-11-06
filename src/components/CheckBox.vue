<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="id"
      @click="$emit('handle-click', $event)"
      @keyup.enter="$emit('on-press-enter', $event)"
      @keydown.up.prevent="$emit('focus-previous', $event)"
      @keydown.down.prevent="$emit('focus-next', $event)"
    />
    <label :for="id">
      <SvgIcon :name="labelIcon" size="md" />
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "./SvgIcon.vue";

defineProps<{
  id: string;
  label: string;
  labelIcon: string;
  fontSize: string;
}>();

defineEmits(["handle-click", "on-press-enter", "focus-next", "focus-previous"]);
</script>

<style scoped lang="scss">
$focous-color: #fea55f;
.checkbox {
  display: flex;
  gap: 1rem;
  margin-block: 1rem;
  align-items: center;

  label {
    cursor: pointer;
    font-size: v-bind(fontSize);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

input[type="checkbox"] {
  position: relative;
  width: 1rem;
  height: 1rem;
  appearance: none;
  background-color: #ccc;
  display: grid;
  place-items: center;
  border-radius: 2px;
  transition: background-color 0.2s, transform 0.2s;
  cursor: pointer;
  outline: none;
  border: 1px solid #999;
}

input[type="checkbox"]:focus {
  outline: 2px solid $focous-color;
  outline-offset: 2px;
}

input[type="checkbox"]:checked {
  background-color: $focous-color;
  border-color: $focous-color;
  transform: scale(1.1);
}

input[type="checkbox"]:checked:after {
  content: "✔️";
  position: absolute;
  color: white;
  font-size: 0.8rem;
  transition: opacity 0.2s;
  opacity: 1;
}
</style>
