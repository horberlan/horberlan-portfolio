<template>
  <div class="card" :key="name">
    <span class="project-title">{{ name }}</span>
    <div class="flag">
      <SvgIcon
        v-if="iconType[flag as keyof typeof iconType]"
        :name="iconType[flag as keyof typeof iconType]"
        size="lg"
        skeleton
      />
    </div>
    <SvgIcon class="img" :name="bg" margin="0" />
    <div class="card-content">
      <p v-if="desc">{{ truncateText(desc, 80) }}</p>
      <a class="primary-btn" role="button" :href="href" target="_blank"
        >view-project</a
      >
      <slot name="index"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import type { PROJECT_TYPE } from "@/utils/enums/project";
import { truncateText } from "@/utils/strings/index";
defineProps<{
  flag: PROJECT_TYPE | string;
  bg: string;
  desc: string;
  href: string;
  name: string;
}>();

enum iconType {
  VUE = "VueIcon",
  REACT = "ReactIconFlag",
  NODE = "NodeJs",
  VANILLA = "VanillaIcon",
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #011221;
  border-radius: 15px;
  max-width: 21.2rem;
  padding: 5px;

  .project-title {
    text-align: center;
    display: block;
    padding-block-start: 1rem;
  }

  .flag {
    position: absolute;
    width: 30px;
    height: 30px;
    aspect-ratio: 1;
    top: 19px;
    right: 20px;
    z-index: 2;
  }

  .img {
    width: 100%;
    height: 8rem;
    border-top-left-radius: 0.9375rem;
    border-top-right-radius: 0.9375rem;
    border-bottom-right-radius: 0.9375rem;
    border-bottom-left-radius: 0.9375rem;
  }

  .card-content {
    padding-block-end: 1.5rem;
    padding-inline: 1.875rem;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}

.primary-btn {
  background: #1c2b3a;
  border-radius: 8px;
  color: $white-full;
  font-weight: 450;
  font-size: 0.875rem;
  line-height: 1.125rem;
  border: none;
  padding: 0.625rem 0.875rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  margin-block-start: auto;
}
</style>
