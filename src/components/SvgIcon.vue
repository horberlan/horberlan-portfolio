<script lang="ts">
import { defineAsyncComponent } from "vue";
import { sizes, defaults } from "./constants";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: defaults.color,
    },
    size: {
      type: String,
      default: defaults.size,
      validator: (val: string) => Object.keys(sizes).includes(val),
    },
    hoverColor: [Boolean, String],
    rotate: String,
    margin: {
      type: String,
      default: "0",
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.name.charAt(0).toUpperCase() + this.name.slice(1) + "";
      return defineAsyncComponent(() => import(`./icons/${name}.vue`));
    },
    Rotation() {
      return `rotate(${this.rotate || 0})`;
    },
    Margin() {
      return this.margin;
    },
    colorBind() {
      const color = this.color ? this.color : defaults.color;
      return this.getVarOrColorValue(color);
    },
    hoverColorBind() {
      if (this.hoverColor === false) return;
      if (this.hoverColor === true || !this.hoverColor)
        return defaults.hoverColor;
      return this.getVarOrColorValue(this.hoverColor);
    },
    svgSize() {
      return sizes[this.size].size;
    },
    strokeWidth() {
      return sizes[this.size].strokeWidth;
    },
  },

  methods: {
    getVarOrColorValue(str: string) {
      return str.startsWith("var:")
        ? str.replace(/^var:/, `var(--${defaults.varPrefix}`) + ")"
        : str;
    },
  },
};
</script>

<template>
  <component
    :is="dynamicComponent"
    class="svg-icon"
    :width="svgSize"
    :height="svgSize"
    :stroke-width="strokeWidth"
    :class="{ 'add-hover': !!hoverColorBind }"
  />
</template>

<style lang="scss" scoped>
.svg-icon {
  color: v-bind(colorBind);
  transition: color 0.2s ease-in-out;
  transform: v-bind(Rotation);
  margin-block-start: v-bind(Margin);

  &.add-hover:hover {
    color: v-bind(hoverColorBind);
  }
}
</style>
