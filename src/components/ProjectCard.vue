<template>
  <div class="card">
    <div class="flag">
      <SvgIcon :name="props.flag" size="lg" />
    </div>
    <!-- <div class="img skeleton"></div> -->
    <SvgIcon class="img skeleton" :name="props.bg" margin="0" />
    <div class="card-content">
      <p>{{ props.desc }}</p>
      <a class="primary-btn" role="button" :href="props.href" target="_blank"
        >view-project</a
      >
      <slot name="index"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import type { PROJECT_TYPE } from "@/utils/enums/project";

const props = defineProps<{
  flag: PROJECT_TYPE | string;
  bg: string;
  desc: string;
  href: string;
}>();
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 370.35px;
  height: 314.82px;
  background: #011221;
  border-radius: 15px;
  .flag {
    position: absolute;
    width: 30px;
    height: 30px;
    aspect-ratio: 1;
    top: 19px;
    right: 20px;
    z-index: 2;
  }
  .skeleton {
    width: 100%;
    height: 15px;
    display: block;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      lightgray;
    background-repeat: repeat-y;
    background-size: 33.75rem 43.75rem;
    animation: shine 1.6s infinite;
  }
  @keyframes shine {
    to {
      background-position: 100% 0;
    }
  }
  .img {
    width: 100%;
    height: 50%;
    border-top-left-radius: 0.9375rem;
    border-top-right-radius: 0.9375rem;
  }
  .card-content {
    padding-inline: 1.875rem;
  }
}

.primary-btn {
  background: #1c2b3a;
  border-radius: 8px;
  color: white;
  font-weight: 450;
  font-size: 0.875rem;
  line-height: 1.125rem;
  border: none;
  padding: 0.625rem 0.875rem;
  cursor: pointer;
  text-decoration: none;
}
</style>
