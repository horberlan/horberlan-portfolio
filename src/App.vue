<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/HeaderView.vue";
import Footer from "./views/home/Footer.vue";
</script>
<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
      <main v-if="Component">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </main>
    </transition>
  </router-view>
  <Footer />
</template>

<style scoped lang="scss">
$bg-color: #1e2d3d;
$primary: #607b96;

.slide-fade-enter-active {
  transition: all 200ms ease-out;
}

.slide-fade-leave-active {
  transition: all 200ms cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
