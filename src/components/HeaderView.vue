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
    <nav :class="containerClass" v-if="displayAll" ref="containerHeader">
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
  if (window.innerWidth < 768) {
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
    background-color: #011627;
    z-index: 3;
    left: 0;
    top: 0;
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

.toggle-icon {
  position: fixed;
  width: 40px;
  height: 5px;
  background-color: white;
  margin-block: 10px;
  position: relative;
  transition: transform 0.4s ease-in-out;
  border-radius: 2px;

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

.toggle-icon {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.toggle {
  position: fixed;
  top: 2dvh;
  left: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  z-index: 3;
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
@media screen and (max-width: 768px) {
  .nav-links {
    width: 50%;
  }
  .home-logo {
    width: 100%;
  }
}
</style>
