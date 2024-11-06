<script lang="ts">
import {
  defineAsyncComponent,
  hydrateOnInteraction,
  h,
  defineComponent,
} from "vue";
import { sizes, defaults } from "./constants";

const MissingIconComponent = () => {
  const style = {
    p: `
  display: flex;
  flex-flow: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  `,
    span: `
  color: #ccc;
  font-size: 12px;
  `,
  };
  return h("p", { style: style.p }, [
    h("p", "Icon not provided"),
    h("span", { style: style.span }, "This is likely a new item"),
  ]);
};

const SkeletonBox = () => {
  return h("div", { class: "skeleton-box" });
};

const LoadingIconComponent = ({ label = "Loading" }: { label: string }) => {
  return h("span", { class: "loading" }, label);
};

export default defineComponent({
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
    skeleton: {
      type: Boolean,
      default: false,
      required: false,
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
      if (!this.name) return MissingIconComponent;

      const componentName =
        this.name.charAt(0).toUpperCase() + this.name.slice(1) + "";

      const importPath = `./icons/${componentName}.vue`;

      try {
        const component = defineAsyncComponent({
          loader: () => import(importPath),
          loadingComponent: this.$props.skeleton
            ? SkeletonBox
            : LoadingIconComponent,
          delay: 200,
          errorComponent: MissingIconComponent,
          timeout: 10500,
          hydrate: hydrateOnInteraction("click"),
          suspensible: true,
        });
        return component;
      } catch (error) {
        globalThis.console.error(`'${importPath}' not found.`, error);
        return MissingIconComponent;
      }
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
      return sizes[this.size as keyof typeof sizes].size;
    },
    strokeWidth() {
      return sizes[this.size as keyof typeof sizes].strokeWidth;
    },
  },

  methods: {
    getVarOrColorValue(str: string) {
      return str.startsWith("var:")
        ? str.replace(/^var:/, `var(--${defaults.varPrefix}`) + ")"
        : str;
    },
  },
  setup() {
    return { MissingIconComponent, LoadingIconComponent };
  },
});
</script>

<template>
  <component
    v-if="name"
    :is="dynamicComponent"
    class="svg-icon"
    :width="svgSize"
    :height="svgSize"
    :stroke-width="strokeWidth"
    :class="{ 'add-hover': !!hoverColorBind }"
  />
</template>

<style lang="scss" scoped>
$skeleton-color: #e0e0e0;
$skeleton-color-secundary: #cfcfcf;

.svg-icon {
  color: v-bind(colorBind);
  transition: color 0.2s ease-in-out;
  transform: v-bind(Rotation);
  margin-block-start: v-bind(Margin);

  &.add-hover:hover {
    color: v-bind(hoverColorBind);
  }
}
.skeleton-box {
  display: block;
  width: auto;
  min-width: 32px;
  height: 1.875rem;
  background-color: $skeleton-color;
  border-radius: 4px;
  background-image: linear-gradient(
    90deg,
    $skeleton-color 8%,
    $skeleton-color-secundary 18%,
    $skeleton-color 33%
  );
  background-size: 1200px 104px;
  animation: skeleton-box-loading 900ms infinite linear;
  opacity: 0.5;
}

@keyframes skeleton-box-loading {
  0% {
    background-position: -1200px 0;
  }
  100% {
    background-position: 1200px 0;
  }
}
</style>
