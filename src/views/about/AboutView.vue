<template>
  <PanelView>
    <template #panel-1>
      <div class="panel-1-content">
        <box-accordion
          v-for="(accordion, index) in sidebarAccordions"
          :key="index"
          mode="item"
          :title="accordion.titleAccorden"
          :open="true"
        >
          <template v-if="accordion.content === personalInfo">
            <template v-for="(item, index) in accordion.content" :key="index">
              <button
                v-if="item.in_root"
                class="btn is_root"
                @click="scrollToElement('skills')"
              >
                <SvgIcon skeleton name="AboutMd" size="md" />{{ item.title }}
              </button>
              <box-accordion
                v-else
                :title="item.title"
                @click="scrollToElement(item.key as never)"
                :open="Boolean(item.isOpened)"
              >
                <template #icon-folder>
                  <SvgIcon
                    skeleton
                    name="FolderIcon"
                    size="md"
                    :fill="item.iconFill"
                  />
                </template>
                <button
                  v-for="(education, index) in item.content"
                  :key="index"
                  @click="scrollToElement(education.title)"
                  class="btn"
                >
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
            <vue-markdown :source="contactSrc" />
          </template>
        </box-accordion>
      </div>
    </template>
    <template #panel-2>
      <RenderMarkdown :route="String(aboutMeMarkdown)" />
      <vue-markdown :source="`## Publications`" />
      <MediumPublications :id="first(publications)?.title" />
      <RenderMarkdown :route="String(interestsMarkdown)" id="Web3" />
      <RenderMarkdown :route="String(skillsMarkdown)" id="Skills" />
    </template>
    <template #panel-3>
      <div class="right-container">
        <p class="test-span section-titles">// Code snippet showcase:</p>
        <span v-if="!snippetList.length" class="loading">Loading</span>

        <div
          v-else
          class="snippet-container"
          v-for="snippet in snippetList"
          :key="snippet._id"
        >
          <div class="header">
            <div class="left">
              <img class="img" :src="snippet.avatar_url" :alt="snippet.name" />
              <p>
                {{ snippet.name }}

                Created
                {{ moment.utc(snippet.updated_date).format("MM/DD/YYYY") }}
              </p>
            </div>
            <div class="right">
              <p
                @click.once="updateSafeSnippet(snippet), (isClicked = true)"
                :class="{ clicked: isClicked }"
              >
                {{ snippet.stars }} stars
              </p>
            </div>
          </div>
          <div class="snippet-content">
            <highlightjs autodetect :code="snippet.snippet" />
          </div>
        </div>
      </div>
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import moment from "moment";
import BoxAccordion from "@/components/BoxAccordion.vue";
import PanelView from "@/components/PanelView.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import MediumPublications from "./MediumPublications.vue";
import RenderMarkdown from "./RenderMarkdown.vue";
import {
  getMarkdown,
  getSnippet,
  updateSnippetStars,
} from "@/services/entites";
import { first } from "lodash";
import { markRaw } from "vue";
import { type Snippet } from "@/services/entites";
import VueMarkdown from "vue-markdown-render";

const snippetList = ref<Snippet[]>([]);
const isClicked = ref(false);

const interests = ref([{ title: "Web3" }]);

const bio = ref([{ title: "about-me" }]);
const aboutMeMarkdown: Ref<string | null> = ref(null);
const interestsMarkdown: Ref<string | null> = ref(null);
const skillsMarkdown: Ref<string | null> = ref(null);

const getMarkdownData = async (fileName: string): Promise<string> => {
  const data = await getMarkdown(`${fileName}`);
  return data;
};
onMounted(async () => {
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

const publications = ref([
  { title: "publications", component: markRaw(MediumPublications) },
]);

const personalInfo = ref([
  {
    title: "bio",
    key: first(bio.value)?.title,
    content: bio.value,
    iconFill: "#E99287",
    isOpened: true,
  },
  {
    title: "publications",
    key: first(publications.value)?.title,
    content: publications.value,
    iconFill: "#008080",
    isOpened: false,
  },
  {
    title: "interests",
    key: first(interests.value)?.title,
    content: interests.value,
    iconFill: "#43D9AD",
    isOpened: false,
  },
  {
    title: "Skills",
    in_root: true,
    key: first(publications.value)?.title,
  },
]);

const contacts = ref([{ title: "horberlan@gmail.com", icon: "MailIcon" }]);

const sidebarAccordions = ref([
  { titleAccorden: "personal-info", content: personalInfo.value },
  { titleAccorden: "find-me-on", content: contacts.value },
]);

const contactSrc = ref(`
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/horberlan/)
  [![Hackerrank](https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white)](https://hackerrank.com/profile/@horberlan)
  [![Medium](https://img.shields.io/badge/-Medium-%23000000?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@horberlan)
  [![GitLab](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white)](https://gitlab.com/horberlan)
  `);

const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
};

const getSafeSnippet = async () => {
  try {
    const snippets = await getSnippet();
    snippetList.value = snippets;
  } catch (error) {
    console.error("Error fetching snippets:", error);
  }
};

const updateSafeSnippet = async (snippet: Partial<Snippet>) => {
  snippet = { _id: snippet._id, stars: ++snippet.stars };
  try {
    await updateSnippetStars(snippet as never);
    await getSafeSnippet();
  } catch (error) {
    console.error("Error updating snippet:", error);
  }
};

onMounted(async () => {
  await getSafeSnippet();
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

.snippet-container {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      display: grid;
      grid-template-columns: 40px 1fr;
      grid-template-rows: min-content;
      place-items: center;
      gap: 1rem;

      .img {
        width: 2.625rem;
        height: 2.625rem;
        border-radius: 50%;
      }
    }

    .right {
      cursor: pointer;
      display: flex;
      gap: 2rem;
    }
  }

  .snippet-content {
    background: #011221;
    border: 1px solid #1e2d3d;
    border-radius: 0.9375rem;
    padding: 1.875rem 1.5rem;
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

.language-javascript {
  background-color: transparent;
  padding: 0;
  margin: 0;
}
.section-titles {
  color: $font-lynch;
}
.clicked {
  cursor: not-allowed;
}
</style>
