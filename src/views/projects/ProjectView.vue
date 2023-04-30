<template>
  <PanelView :isResizable="false">
    <template #panel-1>
      <box-accordeon
        title="projects"
        :open="true"
        @selected="null"
        @close-all="null"
        icon="ArrowIconSecundary"
      >
        <div
          class="checkbox"
          v-for="(project, index) in allProjects"
          :key="index"
        >
          <input
            type="checkbox"
            name="scales"
            :id="`scales-${index}`"
            :ref="`theCheckbox-${index}`"
            @click="cardsGroup(project.type, $event?.currentTarget)"
          />
          <label :for="`scales-${index}`">
            <SvgIcon :name="project.icon" size="md" />
            {{ project.type.toLocaleLowerCase() }}</label
          >
        </div>
      </box-accordeon>
    </template>
    <template #left>
      <div class="flex-wrapper">
        <TransitionGroup name="list">
          <div v-for="project in filtredProjectsList" :key="project._id">
            <ProjectCard
              :flag="project.href"
              :bg="project.background"
              :desc="project.project_description"
              :href="project.href"
              :name="project.name"
            >
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
import { PROJECT_TYPE, type ProjectType } from "@/utils/enums/project";
import { computed, onMounted, ref } from "vue";

const projectsList = ref<ProjectType[]>([]);
const filtredProjectsList = ref<ProjectType[]>([]);
const listFilters = ref<string[]>([]);
const searchParams = ref<{ type: PROJECT_TYPE }>({
  type: PROJECT_TYPE.ALL,
});
const allProjects = computed(() => [
  {
    type: PROJECT_TYPE.VUE,
    icon: "VueIcon",
    label: "",
  },
  {
    type: PROJECT_TYPE.REACT,
    icon: "ReactIconFlag",
    label: "",
  },
  {
    type: PROJECT_TYPE.NODE,
    icon: "NodeJs",
    label: "",
  },
  {
    type: PROJECT_TYPE.VANILLA,
    icon: "VanillaIcon",
    label: "",
  },
]);
const allTypes = PROJECT_TYPE;
// https://cryptodrone.gitbook.io/crypto-drone/
const cardsGroup = async (data: PROJECT_TYPE, index: HTMLInputElement) => {
  if (index.checked) {
    listFilters.value.push(data);

    searchParams.value.type = data;
    filtredProjectsList.value = [
      ...projectsList.value.filter((e) => e.type === data),
    ];
  } else {
    listFilters.value = listFilters.value.filter((number) => number !== data);
    filtredProjectsList.value = projectsList.value.filter(
      (e) => e.type !== data
    );
  }
  await getSafeProjects(listFilters.value);
};

const getSafeProjects = async (value: string[]) => {
  try {
    const data = await getProjects(value);
    filtredProjectsList.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => await getSafeProjects([]));
</script>

<style lang="scss" scoped>
:deep(.panel_content) {
  width: $nav-size;
  // padding-inline: 1rem;
}
:deep(.box-accordeon) .header {
  border-bottom: 1px solid #1e2d3d;
  width: 16.7rem;
  margin: 0;
  padding-block: 0.625rem;
  padding-inline-start: 1.375rem;
}
.flex-wrapper {
  display: flex;
  width: 100%;
  gap: 4rem;
  flex-wrap: wrap;
  margin: 2rem;
  max-height: 100%;
}
.checkbox {
  display: flex;
  gap: 1rem;
  margin-block: 1.0625rem;
  align-items: center;
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
input[type="checkbox"] {
  position: relative;
  width: 0.875rem;
  height: 0.875rem;
  aspect-ratio: 1;
  appearance: none;
  background: $font-lynch;
  display: grid;
  place-items: center;
  border-radius: 2px;
  padding: 0;
}

input[type="checkbox"]:checked:after {
  position: absolute;
  content: "✔";
  color: $white-full;
  height: 0.875rem;
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
