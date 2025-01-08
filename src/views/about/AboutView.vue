<template>
  <PanelView>
    <template #panel-1>
      <div class="panel-1-content">
        <box-accordion v-for="(accordion, index) in sidebarAccordions" :key="index" mode="item"
          :title="accordion.titleAccorden" :open="true">
          <template v-if="accordion.content === personalInfo">
            <template v-for="(item, index) in accordion.content" :key="index">
              <button v-if="item.in_root" class="btn is_root" @click="scrollToElement('testing')">
                <SvgIcon skeleton name="AboutMd" size="md" />{{ item.title }}
              </button>
              <box-accordion v-else :title="item.title" @click="scrollToElement(item.key as never)"
                :open="Boolean(item.isOpened)">
                <template #icon-folder>
                  <SvgIcon skeleton name="FolderIcon" size="md" :fill="item.iconFill" />
                </template>
                <button v-for="(education, index) in item.content" :key="index"
                  @click="scrollToElement(education.title)" class="btn">
                  <SvgIcon skeleton name="AboutMd" size="md" />
                  {{ education.title || "" }}
                </button>
              </box-accordion>
            </template>
          </template>
          <template v-else-if="accordion.content === contacts">
            <h4 v-for="(link, index) in accordion.content" :key="index">
              <button class="btn">
                <SvgIcon skeleton :name="link.icon" size="md" />{{ link.title }}
              </button>
            </h4>
            <vue-markdown :source="contacts[ 0 ].markdown" />
          </template>
        </box-accordion>
      </div>
    </template>
    <template #panel-2>
      <RenderMarkdown :route="aboutMeMarkdown" />
      <vue-markdown :source="`## Publications`" />
      <MediumPublications id="publications" />
      <RenderMarkdown :route="interestsMarkdown" id="Web3" />
      <RenderMarkdown :route="skillsMarkdown" id="Skills" />
    </template>
    <template #panel-3>
      <div class="right-container">
        <p class="test-span section-titles">// Code snippet showcase:</p>
        <span v-if="!snippetList.length" class="loading">Loading</span>
        <template v-else v-for="snippet in snippetList" :key="snippet._id">
          <SnippetCard :snippet="snippet" @update:snippets="refetch()" />
        </template>
      </div>
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, watchEffect } from "vue";
import BoxAccordion from "@/components/BoxAccordion.vue";
import PanelView from "@/components/PanelView.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import MediumPublications from "./MediumPublications.vue";
import RenderMarkdown from "./RenderMarkdown.vue";
import { getMarkdown, getSnippet } from "@/services/entites";
import { markRaw } from "vue";
import { type Snippet } from "@/services/entites";
import VueMarkdown from "vue-markdown-render";
import SnippetCard from "./SnippetCard.vue";
import { useQuery } from "@tanstack/vue-query";

type AddIsClicked<T> = T & { isClicked: boolean };

const snippetList = ref<AddIsClicked<Snippet>[]>([]);

const aboutMeMarkdown: Ref<string | null> = ref(null);
const interestsMarkdown: Ref<string | null> = ref(null);
const skillsMarkdown: Ref<string | null> = ref(null);

const getMarkdownData = async (fileName: string): Promise<string> => {
  const data = await getMarkdown(`${fileName}`);
  return data;
};

const personalInfo = ref([
  {
    title: "bio",
    key: "about-me",
    content: [ { title: "about-me" } ],
    iconFill: "#E99287",
    isOpened: true,
  },
  {
    title: "publications",
    key: "publications",
    content: [
      { title: "publications", component: markRaw(MediumPublications) },
    ],
    iconFill: "#008080",
    isOpened: false,
  },
  {
    title: "interests",
    key: "Web3",
    content: [ { title: "Web3" } ],
    iconFill: "#43D9AD",
    isOpened: false,
  },
  {
    title: "Skills",
    in_root: true,
    key: "Skills",
  },
]);

const contacts = ref([
  {
    title: "horberlan@gmail.com",
    icon: "MailIcon",
    markdown: `
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/horberlan/)
  [![Hackerrank](https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white)](https://hackerrank.com/profile/@horberlan)
  [![Medium](https://img.shields.io/badge/-Medium-%23000000?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@horberlan)
  [![GitLab](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white)](https://gitlab.com/horberlan)
  `,
  },
]);

const sidebarAccordions = ref([
  { titleAccorden: "personal-info", content: personalInfo.value },
  { titleAccorden: "find-me-on", content: contacts.value },
]);

const scrollToElement = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};

const { data: snippetsQuery, refetch, isFetched } = useQuery({ queryKey: [ 'snippets' ], queryFn: async () => await getSnippet() })

const getSafeSnippet = async () => {
  try {
    await refetch();
    if (!snippetsQuery.value) return;
    if (isFetched.value)
      snippetList.value = snippetsQuery.value.map((snippet: Snippet) => ({
        ...snippet,
        isClicked: false,
      }));
  } catch (error) {
    console.error("Error fetching snippets:", error);
  }
};

watchEffect(() => {
  if (snippetsQuery.value) {
    snippetList.value = (snippetsQuery as typeof snippetList).value;

  }
});
onMounted(async () => {
  await getSafeSnippet();
  if (!aboutMeMarkdown.value) {
    aboutMeMarkdown.value = await getMarkdownData("about-me");
  }
  if (!interestsMarkdown.value) {
    interestsMarkdown.value = await getMarkdownData("interests");
  }
  if (!skillsMarkdown.value) {
    skillsMarkdown.value = await getMarkdownData("skills");
  }
});

</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  gap: 0.5175rem;
  background: transparent;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.3125rem;
  color: $font-lynch;
  border: none;
  cursor: pointer;
  margin-block-start: 0.5rem;

  &.is_root {
    margin-inline-start: 1rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

:deep(h2),
.section-titles {
  color: $font-lynch;
  margin-block-start: 1rem;
}
</style>
