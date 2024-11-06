<template>
  <ol>
    <li>/**</li>
    <li>
      * Technical education, Computer Technician - E.E.M.T. Cristiano Cartaxo;
    </li>
    <li>**/</li>
  </ol>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
ol {
  font-weight: 350;
  font-size: 1.125rem;
  line-height: 1.6875rem;
  color: $font-lynch;
  li {
    padding-inline-start: 1.5rem;
    margin-inline-start: 2rem;
    &::marker {
      display: block;
      font-weight: lighter;
    }
  }
}
</style>
