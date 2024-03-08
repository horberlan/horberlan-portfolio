<template>
  <PanelView :isResizable="false">
    <template #panel-1>
      <box-accordeon title="projects" :open="true" @selected="null" @close-all="null" icon="ArrowIconSecundary">
        <div class="checkbox" v-for="(project, index) in allProjects" :key="index">
          <input type="checkbox" :id="`scales-${index}`" :ref="`theCheckbox-${index}`" @click="
    cardsGroup(project.type, $event?.currentTarget as EventTarget)
    " />
          <label :for="`scales-${index}`">
            <SvgIcon :name="project.icon" size="md" />
            {{ project.type.toLocaleLowerCase() }}
          </label>
        </div>
      </box-accordeon>
    </template>
    <template #left>
      <template v-if="filtredProjectsList.length">
        <div class="flex-wrapper">
          <TransitionGroup name="list">
            <div v-for="(project, index) in filtredProjectsList" :key="index" class="cards-container">
              <ProjectCard :flag="project.type" :bg="project.background" :desc="project.project_description"
                :href="project.href" :name="project.name" />
            </div>
          </TransitionGroup>
        </div>
      </template>
        <template v-else> Loading... </template>
      </template>
  </PanelView>
</template>

<script setup lang="ts">
import BoxAccordeon from "@/components/BoxAccordeon.vue";
import PanelView from "@/components/PanelView.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { getProjects } from "@/services/entites";
import { PROJECT_TYPE } from "@/utils/enums/project";
import { uniqBy } from "lodash";
import { computed, watchEffect, ref, onMounted, Suspense } from "vue";
import { useMutation } from "@tanstack/vue-query";

interface ProjectType {
  _id: string;
  type: PROJECT_TYPE;
  icon: string;
  background: string;
  project_description: string;
  href: string;
  name: string;
}

const projectsList = ref<ProjectType[]>([]);
const filtredProjectsList = ref<ProjectType[]>([]);
const listFilters = ref<PROJECT_TYPE[]>([]);
const searchParams = ref<{ type: PROJECT_TYPE }>({
  type: PROJECT_TYPE.ALL,
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
    const data = await getProjects(value);
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

watchEffect(() => {
  if (mutatedProjects.value)
    listFilters.value = (mutatedProjects as typeof listFilters).value;
});

onMounted(async () => await getSafeProjects([]));
</script>

<style lang="scss" scoped>
:deep(.box-accordeon) .header {
  border-bottom: 1px solid #1e2d3d;
  width: 16.7rem;
  margin: 0;
  padding-block: 0.625rem;
  padding-inline-start: 1.375rem;
}

.flex-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: 2rem;
  max-height: 100%;
  justify-content: flex-start;

  .cards-container {
    margin-block: map-get($margins, "block-large-screen");
    margin-inline: map-get($margins, "inline-large-screen");
  }

  @media screen and (max-width: 760px) {
    margin-block: map-get($margins, "block-small-screen");
    margin-inline: map-get($margins, "inline-small-screen");
  }
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
