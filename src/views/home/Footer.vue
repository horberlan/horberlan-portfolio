<script setup lang="ts">
const footerData = ["Copyright ©", "@pois.nada"];
</script>

<template>
  <footer>
    <li v-for="(footer, index) in footerData" :key="index">
      <a href="https://github.com/horberlan">{{ footer }}</a>
    </li>
  </footer>
</template>

<style lang="scss" scoped>
$bg-color: #1e2d3d;
$primary: #607b96;

footer {
  display: flex;
  position: fixed;
  bottom: 0;
  border: 1px solid $bg-color;
  width: 100%;
  background-color: #011627;
  z-index: 2;
  a {
    color: $primary;
    text-decoration: none;
  }
  li {
    list-style: none;
    padding: 1rem 2rem;
    border: 1px solid $bg-color;
    height: 100%;
    color: $primary;
    list-style: none;
    &:last-child {
      display: flex;
      margin-inline-start: auto;
      gap: 1rem;
      padding: 1rem 1.5rem;
      &::after {
        filter: grayscale(1);
        cursor: pointer;
        display: block;
        content: "";
        background: url(../../assets/github.svg) no-repeat;
        background-size: cover;
        width: 1.2rem;
        height: 1.2rem;
        transition: 400ms;
      }
      &:hover {
        &::after {
          filter: none;
        }
      }
    }
  }
}
</style>
