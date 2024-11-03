<template>
  <SpintText :label="data" />
</template>

<script setup lang="ts">
import SpintText from "./SpintText.vue";
const data = `
  I am a Full stack developer dedicated to creating innovative solutions
  usingadvanced technologies. With expertise in languages such
  as JavaScript andTypeScript, I specialize in crafting exceptional
  front-end pages utilizingframeworks such as Vue.js or
  React/React Native, resulting in highlysatisfactory
  client experiences and consistently achieving page
  performanceabove 95%. My expertise extends to backend
  development in languages includingRust, Node.js, and Python.
  I am deeply excited about leveragingobject-oriented
  programming to develop innovative solutions for complexchallenges.
  In my career, I have focused on decentralized
  projects within Web3.0, particularly excelling in blockchain
  dApp development using Ethereum,Solidity, and Web3.js.
  My contributions have been recognized through thepublication of
  insightful articles on Medium and Bits and Pieces,
  where Ishare deep insights into blockchain technology.
  My current focus is on pushingthe boundaries of technological
  possibilities, continuously acquiring newskills,
  and embracing challenges. Beyond coding, I am involved in open sourcemaintenance
  and contribution to projects that are integral to my work,
  such asLinux packages, distros, and web frameworks. In my free time,
  I contribute tothe community by publishing articles
  in magazines and engaging ininternationalization through translations
  for some projects on GitHub andGitLab.If you are in search of a
  forward-thinking developer skilled atleveraging advanced
  technologies to drive positive change, I am eager tocollaborate.
  Let's explore the potential for application
  integration and newopportunities together.`;
</script>
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
