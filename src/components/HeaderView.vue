<template>
  <nav>
    <router-link
      v-for="(link, index) in header"
      :key="index"
      :to="`${link.to}`"
      class="navLinks"
    >
      {{ link.title }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
const header = [
  {
    title: "Horberlan-Brito",
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
</script>

<style lang="scss" scoped>
$bg-color: #1e2d3d;
$primary: #607b96;
main {
  position: relative;
}
nav {
  display: flex;
  flex-direction: row;
  border: 1px solid $bg-color;
  .navLinks {
    border: 1px solid $bg-color;
    color: $primary;
    list-style: none;
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
}
.router-link-active,
.router-link-exact-active {
  position: relative;
  color: $white-full !important;
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
</style>
