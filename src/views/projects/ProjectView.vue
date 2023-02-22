<template>
  <PanelView :isResizable="false">
    <template #panel-1>
      <box-accordeon
        title="projects"
        :open="true"
        @selected="null"
        @close-all="null"
      >
        <div
          class="checkbox"
          v-for="(project, index) in PROJECT_TYPE"
          :key="index"
        >
          <input
            type="checkbox"
            name="scales"
            :id="`scales-${index}`"
            :ref="`theCheckbox-${index}`"
            @click="logData(index, $event.currentTarget)"
          />
          <label :for="`scales-${index}`">
            <SvgIcon name="ReactIconFlag" size="md" />
            {{ project }}</label
          >
        </div>
      </box-accordeon>
    </template>
    <template #left>
      <div class="flex-wrapper">
        <TransitionGroup name="list">
          <div>
            <ProjectCard
              v-for="(project, index) in filtredProjectsList"
              :key="project.id"
              :flag="project.href"
              :bg="project.background"
              :desc="project.project_description"
              :href="project.href"
            >
              <template #index> </template>
            </ProjectCard>

          </div>
        </TransitionGroup>
      </div>
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import BoxAccordeon from "@/components/BoxAccordeon.vue";
import PanelView from "@/components/PanelView.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { getProjects } from "@/services/entites";
import type { ProjectType } from "@/utils/enums/project";
import { PROJECT_TYPE } from "@/utils/enums/project";
import { omit, uniqBy } from "lodash";
import { onMounted, ref } from "vue";

const projectsList = ref<ProjectType[]>([]);
const filtredProjectsList = ref<ProjectType[]>([]);
const listFilters = ref([]);
const searchParams = ref({
  type: PROJECT_TYPE.ALL,
});
const allTypes = ref(PROJECT_TYPE);
const logData = async (data: PROJECT_TYPE, index: HTMLInputElement) => {
  if (index.checked) {
    searchParams.value.type = data;
    filtredProjectsList.value = [...projectsList.value.filter((e) => e.type === data), ...projectsList.value]
    console.log("checked", filtredProjectsList.value.map((e)=> e.type));
    await getSafeProjects(data);
  } else {
    filtredProjectsList.value = projectsList.value.filter(
      (e) => e.type !== data
    );
    console.log("no checked", filtredProjectsList.value);
    await getSafeProjects(null);
  }
};
const getSafeProjects = async (index: PROJECT_TYPE) => {
  const filter = ref<ProjectType[]>([]);
  try {
    const { data } = await getProjects(undefined);
    projectsList.value = data;
    filter.value =
      index !== null
        ? projectsList.value.filter((e) => e.type === index)
        : projectsList.value;
  } catch (error) {
    console.error(error);
  } finally {
    filtredProjectsList.value = filter.value;
  }
};

onMounted(async () => await getSafeProjects(null));
</script>

<style lang="scss" scoped>
:deep(.panel_content) {
  max-width: 10rem;
  padding-inline: 1rem;
}
.flex-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem;
}
.checkbox {
  display: flex;
  gap: 1rem;
  height: 0.875rem;
  margin-block-end: 1.5rem;
}
input[type="checkbox"] {
  width: 0.875rem;
  height: 0.875rem;
  aspect-ratio: 1;
  appearance: none;
  background: #607b96;
  display: grid;
  place-items: center;
  border-radius: 2px;
  padding: 0;
}

input[type="checkbox"]:checked:after {
  content: "✔";
  color: white;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
