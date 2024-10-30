<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/HeaderView.vue";
import Footer from "./views/home/Footer.vue";
</script>
<template>
  <article class="main-grid">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <template v-if="Component">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </template>
      </transition>
    </router-view>
    <Footer />
  </article>
</template>

<style scoped lang="scss">
$bg-color: #1e2d3d;
$primary: #607b96;
.main-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100dvh;
}
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
