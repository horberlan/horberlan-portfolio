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

footer {
  display: flex;
  border: 1px solid $bg-color;
  width: 100%;
  background: rgba(255, 255, 255, 0);
  border: 1px solid $bg-color;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  margin-block-start: auto;
  z-index: 2;
  a {
    color: $font-lynch;
    text-decoration: none;
  }
  li {
    list-style: none;
    padding: 1rem 2rem;
    &:first-of-type {
      border-right: 1px solid $bg-color;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
    &:last-of-type {
      border-left: 1px solid $bg-color;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }
    height: 100%;
    color: $font-lynch;
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
