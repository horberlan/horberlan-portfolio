<template>
  <div class="card">
    <span class="project-title"> {{ name }}</span>
    <div class="flag">
      <SvgIcon :name="iconType[ flag as keyof typeof iconType ]" size="lg" />
    </div>
    <Suspense>
      <SvgIcon class="img" :name="props.bg" margin="0" />
      <template #fallback>
        <span class="loading skeleton">Loading...</span>
      </template>
    </Suspense>
    <div class="card-content">
      <p>{{ props.desc }}</p>
      <a class="primary-btn" role="button" :href="props.href" target="_blank">view-project</a>
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
  width: 20rem;
  background: #011221;
  border-radius: 15px;

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

  .skeleton {
    width: 100%;
    border-radius: 15px;
   
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
    height: 8rem;
    border-top-left-radius: 0.9375rem;
    border-top-right-radius: 0.9375rem;
  }

  .card-content {
    padding-inline: 1.875rem;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-block-end: 1rem;
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
  flex-shrink: 0;
}

.loading {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: white;
}
</style>
