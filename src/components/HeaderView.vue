<template>
  <span
    v-if="header[0] && !displayAll"
    class="toggle"
    @click="displayAll = !displayAll"
  >
    <div class="toggleIcon"></div>
    <div class="toggleIcon"></div>
    <div class="toggleIcon"></div>
  </span>
  <TransitionGroup name="header">
    <nav :class="containerClass" v-if="displayAll" ref="containerHeader">
      <router-link
        v-for="(link, index) in header"
        :key="index"
        :to="`${link.to}`"
        class="navLinks"
        :class="{ 'home-logo': index === 0 }"
      >
        <span v-if="displayAll"> {{ link.title }}</span>
      </router-link>
    </nav>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const header = [
  {
    title: "Horberlan-Brito",
    to: "/",
  },
  {
    title: "_hello",
    to: "/",
  },
  {
    title: "_about-me",
    to: "/about",
  },
  {
    title: "_projects",
    to: "/projects",
  },
  {
    title: "_contact-me",
    to: "/contact",
  },
];
const containerClass = ref("");
const displayAll = ref(false);
const updateContainerClass = () => {
  if (window.innerWidth < 768) {
    containerClass.value = "small-screen-nav";
    onClickOutside(
      containerHeader,
      (event) => (displayAll.value = !displayAll.value)
    );
  } else {
    containerClass.value = "large-screen-nav";
    displayAll.value = true;
  }
};
const containerHeader = ref();

onMounted(() => {
  updateContainerClass();
  window.addEventListener("resize", updateContainerClass);
});
</script>

<style lang="scss" scoped>
$bg-color: #1e2d3d;
$primary: #607b96;

main {
  position: relative;
}

nav {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid $bg-color;

  .navLinks {
    border: 1px solid $bg-color;
    color: $primary;
    text-decoration: none;
    padding: 1rem 2rem;
    transition: 200ms;

    &:nth-child(1) {
      width: $nav-size;
    }

    &:last-child {
      margin-inline-start: auto;
    }
  }

  &.small-screen-nav {
    flex-direction: column;
  }
}
.router-link-active:not(.home-logo),
.router-link-exact-active:not(.home-logo) {
  position: relative;

  &::before {
    content: "";
    background: #fea55f;
    position: absolute;
    bottom: -0.125rem;
    left: 50%;
    width: 102%;
    height: 3px;
    transform: translateX(-50%);
  }
}

.toggleIcon {
  width: 35px;
  height: 2px;
  background-color: white;
  margin-block: 4px;
}

.toggle {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.header-enter-active,
.header-leave-active {
  transition: all 0.5s ease;
}

.header-enter-from,
.header-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
