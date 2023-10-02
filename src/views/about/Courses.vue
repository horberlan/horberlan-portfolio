<template>
  <ol>
    <li>/**</li>
    <li>* Courses of my interest; ></li>
    <li>
      *
      <a
        href="https://cursos.alura.com.br/loginForm?urlAfterLogin=https://cursos.alura.com.br/user/horberlan-brito/degree-vuejs3-305797/certificate"
        class="link"
        >VUE.JS Training;</a
      >
    </li>
    <li>
      *
      <a
        href="https://university.mongodb.com/course_completion/7fa498e9-23c2-4816-8953-0cfcc5d4a51c"
        class="link"
        >M220JS: MongoDB for JavaScript Developers;</a
      >
    </li>
    <li>
      *
      <a
        href="https://www.linkedin.com/learning/certificates/55dd67fc63bbcc4d66adc325c11f9395123b2aa3a4b7ac470336ce58a85d24e1?trk=share_certificate%20&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bvy6GlUxDRsOa1uAUuUKNdQ%3D%3D#nodejs."
        class="link"
        >Advanced Node.js;</a
      >
    </li>
    <li>**/</li>
    <li>
      *
      <a
        href="https://www.freecodecamp.org/certification/fccc8db2914-75ad-45c3-a339-25d608332138/javascript-algorithms-and-data-structures"
        class="link"
      >
        JavaScript Algorithms and Data Structures
      </a>
    </li>
  </ol>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
ol {
  font-family: monospace;
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
