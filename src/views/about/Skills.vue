<template>
  <ol>
    <li>/**</li>
    <li>* Problem-solving skills;</li>
    <li>* Excellent organisational and time management skills;</li>
    <li>* writing and testing code;</li>
    <li>* collaborating with other developers;</li>
    <li>
      * source control management (eg Git): to enable teams to work together to
      manage changes to source code;
    </li>
    <li>
      * issue management systems (eg Jira): for managing a list of issues or
      improvements;
    </li>
    <li>* Accuracy and attention to detail;</li>
    <li>
      * Self-development skills to keep up to date with fast-changing trends;
    </li>
    <li>* Testing procedures;</li>
    <li>* Cryptography;</li>
    <li>**/</li>
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
