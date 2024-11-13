<template>
  <span
    v-if="!displayAll && !isScrolled"
    class="toggle"
    :class="{ 'hide-toggle': isScrolled }"
    role="button"
    aria-label="Toggle Navigation"
    @click="displayAll = true"
  >
    <div class="toggle-icon"></div>
  </span>

  <TransitionGroup name="header">
    <nav
      v-if="displayAll"
      ref="containerHeader"
      :class="containerClass"
      @keydown.left.prevent="switchFocous(true)"
      @keydown.right.prevent="switchFocous(false)"
    >
      <ul>
        <router-link
          v-for="(link, index) in header"
          :key="index"
          :to="link.to"
          class="nav-links"
          :class="{ 'home-logo': index === 0 }"
        >
          {{ link.title }}
        </router-link>
      </ul>
    </nav>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();

const header = [
  {
    title: "horberlan-brito",
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
const displayAll = ref(true);
const containerHeader = ref();

const isScrolled = ref(false);
const isFirstLoad = ref(true);

const updateContainerClass = () => {
  if (window.innerWidth <= 798) {
    containerClass.value = "small-screen-nav";
    onClickOutside(containerHeader, () => (displayAll.value = false));
  } else {
    containerClass.value = "large-screen-nav";
    displayAll.value = true;
  }
};

onMounted(() => {
  updateContainerClass();
  window.addEventListener("resize", updateContainerClass);
  window.addEventListener("scroll", handleScroll);
  if (
    isFirstLoad.value &&
    route.path === header[0].to &&
    window.innerWidth <= 780
  ) {
    displayAll.value = false;
  }
  isFirstLoad.value = false;
});

const handleScroll = () => {
  if (window.innerWidth >= 780) return;
  if (isFirstLoad.value) return;
  if (window.scrollY === 0 && window.innerWidth <= 780) {
    if (!displayAll.value) {
      displayAll.value = true;
    }
  } else displayAll.value = false;
};

const focousItem = ref(0);

const switchFocous = (left: boolean) => {
  if (left) {
    focousItem.value = Math.max(0, focousItem.value - 1);
  } else {
    focousItem.value = Math.min(header.length - 1, focousItem.value + 1);
  }
  const navLinks = containerHeader.value.querySelectorAll(".nav-links");
  navLinks[focousItem.value].focus();
};

onUnmounted(() => {
  window.removeEventListener("resize", updateContainerClass);
});
</script>

<style lang="scss" scoped>
$bg-color: #1e2d3d;
$primary: #607b96;
$nav-size: 20vw;

main {
  position: relative;
}

nav {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid $bg-color;

  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
  }

  .nav-links {
    border: 1px solid $bg-color;
    color: $primary;
    text-decoration: none;
    padding: 1rem 2rem;
    transition: 200ms;

    &:last-child {
      margin-left: auto;
    }
  }

  &.small-screen-nav {
    position: fixed;
    flex-direction: column;
    z-index: 3;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0);
    border: 1px solid $bg-color;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
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

.toggle {
  position: fixed;
  background-color: $white-full;
  position: fixed;
  top: 3.13rem;
  right: 7dvw;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  z-index: 3;
  cursor: pointer;

  &-icon {
    width: 2.5rem;
    height: 0.32rem;
    position: relative;
    transition: transform 0.4s ease-in-out;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 5px;
      background-color: white;
      position: absolute;
      left: 0;
      transition: inherit;
      border-radius: 2px;
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }

    &.active {
      transform: rotate(45deg);
      &::before {
        top: 0;
        transform: rotate(90deg);
      }
      &::after {
        bottom: 0;
        transform: rotate(90deg);
      }
    }
  }
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

.home-logo {
  width: $nav-size;
  border-left-color: transparent;
}
@media screen and (max-width: 868px) {
  $nav-size: $nav-size + 4.7vw;
  .home-logo {
    width: $nav-size;
    text-overflow: ellipsis;
    overflow: scroll;
    white-space: pre;
  }
}
@media screen and (max-width: 800px) {
  .nav-links {
    width: 50%;
    transition: 400ms all;
  }
  .home-logo {
    width: 100%;
  }
}
</style>
