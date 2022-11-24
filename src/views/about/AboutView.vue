<template>
  <PanelView>
    <template #panel-1>
      <box-accordeon
        title="test education"
        :open="true"
        @selected="null"
        @close-all="null"
      >
        <button
          v-for="(education, index) in educations"
          :key="index"
          @click="() => (select = !select)"
          class="btn"
        >
          <SvgIcon name="AboutMd" size="md" />
          {{ education.title }}
        </button>
      </box-accordeon>
    </template>
    <template #panel-2>
      <p v-if="select">asdasdas</p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores veniam
      ducimus quis sapiente dolor enim laboriosam voluptatum? Voluptate iure est
      ullam iusto quod optio voluptatum consequuntur similique, omnis unde!
      Et.</template
    >
    <template #panel-3>
      <div>
        <p ref="lineCouter" class="test-span">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit<br />
          Dolores, nobis repellendus, molestias aperiam aspernatur praesentium,
          perferendis inventore unde ducimus ab excepturi<br />
          Sunt illum magni necessitatibus ad similique est tenetur. Facere.
        </p>
      </div>
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import BoxAccordeon from "@/components/BoxAccordeon.vue";
import PanelView from "@/components/PanelView.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { ref } from "vue";
const select = ref(false);
const educations = ref([
  {
    title: "high-school",
    component: null,
  },
  {
    title: "university",
    component: null,
  },
]);
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  gap: 0.5175rem;
  background: transparent;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.3125rem;
  color: #607b96;
  border: none;
  cursor: pointer;
  margin-block-start: 0.5rem;
}
</style>
