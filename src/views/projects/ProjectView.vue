<template>
  <PanelView :isResizable="false">
    <template #panel-1>
      <box-accordion
        title="projects"
        :open="true"
        @selected="null"
        @close-all="null"
        icon="ArrowIconSecundary"
        class="container-left-side"
      >
        <template v-for="(project, index) in allProjects" :key="index">
          <CheckBox
            :label="project.type.toLocaleLowerCase()"
            :label-icon="project.icon"
            :id="`scales-${index}`"
            font-size="1.2rem"
            @handle-click="
              cardsGroup(project.type, $event?.currentTarget as EventTarget)
            "
            @on-press-enter="(event: KeyboardEvent) => handleCheckboxEnter(event, project.type)"
            @focus-previous="focusPrevious(index)"
            @focus-next="focusNext(index)"
          />
        </template>
      </box-accordion>
    </template>
    <template #left>
      <template v-if="filtredProjectsList.length">
        <div class="flex-wrapper">
          <TransitionGroup name="list">
            <ProjectCard
              v-for="(project, index) in filtredProjectsList"
              :key="index"
              :flag="project.type"
              :bg="project.background"
              :desc="project.project_description"
              :href="project.href"
              :name="project.name"
            />
          </TransitionGroup>
        </div>
      </template>
      <template v-else>
        <span
          class="loading"
          :style="{ width: '75dvw', paddingBlockStart: '1rem' }"
        >
          Loading</span
        ></template
      >
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import BoxAccordion from "@/components/BoxAccordion.vue";
import PanelView from "@/components/PanelView.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { projectsByType } from "@/services/entites";
import { PROJECT_TYPE } from "@/utils/enums/project";
import { computed, watchEffect, ref, onBeforeMount } from "vue";
import { useMutation } from "@tanstack/vue-query";
import CheckBox from "@/components/CheckBox.vue";
import { uniqBy } from "@/utils/array";

interface ProjectType {
  _id: string;
  type: PROJECT_TYPE;
  icon?: string;
  background: string;
  project_description: string;
  href: string;
  name: string;
}

const projectsList = ref<ProjectType[]>([]);
const filtredProjectsList = ref<ProjectType[]>([]);
const listFilters = ref<PROJECT_TYPE[]>([]);
const searchParams = ref<{ type: PROJECT_TYPE; search_term: string }>({
  type: PROJECT_TYPE.ALL,
  search_term: "",
});
const allProjects = computed(() => [
  {
    type: PROJECT_TYPE.VUE,
    icon: "VueIcon",
  },
  {
    type: PROJECT_TYPE.REACT,
    icon: "ReactIconFlag",
  },
  {
    type: PROJECT_TYPE.NODE,
    icon: "NodeJs",
  },
  {
    type: PROJECT_TYPE.VANILLA,
    icon: "VanillaIcon",
  },
]);

const cardsGroup = async (data: PROJECT_TYPE, index: EventTarget) => {
  if ((index as HTMLInputElement).checked) {
    listFilters.value.push(data);

    searchParams.value.type = data;
    filtredProjectsList.value = uniqBy(
      projectsList.value.filter((e) => e.type === data),
      "_id"
    );
  } else {
    listFilters.value = listFilters.value.filter((number) => number !== data);
    filtredProjectsList.value = projectsList.value.filter(
      (e) => e.type !== data
    );
  }
  await mutateGetSafeProjects();
};

const getSafeProjects = async (value: PROJECT_TYPE[] | any) => {
  try {
    const { data } = await projectsByType(value);
    filtredProjectsList.value = data;
    filtredProjectsList.value = uniqBy(filtredProjectsList.value, "_id");
  } catch (error) {
    console.error(error);
  }
};

const { data: mutatedProjects, mutateAsync: mutateGetSafeProjects } =
  useMutation({
    mutationFn: () => getSafeProjects(listFilters.value),
  });

const handleCheckboxEnter = (
  event: KeyboardEvent,
  ProjectType: PROJECT_TYPE
) => {
  event.preventDefault();
  (event.currentTarget as HTMLInputElement).checked = !(
    event.currentTarget as HTMLInputElement
  ).checked;
  cardsGroup(ProjectType, event.currentTarget as EventTarget);
};
const focusPrevious = (index: number) => {
  if (index > 0) {
    const previousCheckbox = document.getElementById(`scales-${index - 1}`);
    previousCheckbox?.focus();
  }
};

const focusNext = (index: number) => {
  if (index < allProjects.value.length - 1) {
    const nextCheckbox = document.getElementById(`scales-${index + 1}`);
    nextCheckbox?.focus();
  }
};
watchEffect(() => {
  if (mutatedProjects.value)
    listFilters.value = (mutatedProjects as typeof listFilters).value;
});

onBeforeMount(async () => await getSafeProjects([]));
</script>

<style lang="scss" scoped>
:deep(.box-accordion) .header {
  border-bottom: 1px solid #1e2d3d;
  margin: 0;
  padding-block: 0.625rem;
  padding-inline-start: 1.375rem;
}

.flex-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  flex-shrink: 0;
  margin: 2rem;
  max-height: 100%;
  gap: 2rem;

  .cards-container {
    margin-block: map.get($margins, "block-large-screen");
    margin-inline: map.get($margins, "inline-large-screen");
  }

  @media screen and (max-width: 760px) {
    margin-block: map.get($margins, "block-small-screen");
    margin-inline: map.get($margins, "inline-small-screen");
    justify-content: center;
  }
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
// todo: change wrapper logic
.container-left-side {
  width: 20vw;
}
</style>
