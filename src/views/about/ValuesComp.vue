<template>
  <ol>
    <li>/**</li>
    <li>
      * <a href="https://www.anhanguera.com/"> Anhanguera Educacional</a>,
      Dropout, Technologist, Full Stack Development;
    </li>
    <li>
      *
      <a href="https://descomplica.com.br/faculdade/engenharia">Descomplica</a>,
      Bachelor's Degree, Computer Engineering;
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
