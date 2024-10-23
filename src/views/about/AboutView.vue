<template>
  <PanelView>
    <template #panel-1>
      <div class="panel-1-content">
        <box-accordeon
          v-for="(accordion, index) in sidebarAccordions"
          :key="index"
          mode="item"
          :title="accordion.titleAccorden"
          :open="true"
        >
          <template v-if="accordion.content === personalInfo">
            <box-accordeon
              v-for="(item, index) in accordion.content"
              :key="index"
              :title="item.title"
              @click="scrollToElement(item.key as never)"
              :open="item.isOpened"
            >
              <template #icon-folder>
                <SvgIcon name="FolderIcon" size="md" :fill="item.iconFill" />
              </template>
              <button
                v-for="(education, index) in item.content"
                :key="index"
                @click="scrollToElement(education.title)"
                class="btn"
              >
                <SvgIcon name="AboutMd" size="md" />
                {{ education.title || "" }}
              </button>
            </box-accordeon>
          </template>
          <template v-else-if="accordion.content === contacts">
            <h4 v-for="(link, index) in accordion.content" :key="index">
              <button class="btn">
                <SvgIcon :name="link.icon" size="md" />{{ link.title }}
              </button>
            </h4>
          </template>
        </box-accordeon>
      </div>
    </template>
    <template #panel-2>
      <p class="section-titles">About me</p>
      <component :is="first(bio)?.component" :id="first(bio)?.title" />
      <p class="section-titles">Publications</p>
      <MediumPublications :id="first(publications)?.title" />
      <p class="section-titles">Interests</p>
      <component
        v-for="component in interests"
        :key="component.title"
        :is="component.component"
        :id="component.title"
      />
      <p class="section-titles">Education</p>
      <component
        v-for="component in educations"
        :key="component.title"
        :is="component.component"
        :id="component.title"
      />
    </template>
    <template #panel-3>
      <div class="right-container">
        <p ref="lineCouter" class="test-span section-titles">
          // Code snippet showcase:
        </p>
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
              <p @click="updateSafeSnippet(snippet)">
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
import { ref, onMounted } from "vue";
import moment from "moment";
import BoxAccordeon from "@/components/BoxAccordeon.vue";
import PanelView from "@/components/PanelView.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import MediumPublications from "./MediumPublications.vue";
import AboutMe from "./AboutMe.vue";
import Web3Interests from "./Web3Interests.vue";
import Values from "./ValuesComp.vue";
import ValuesSec from "./TestTwo.vue";
import Courses from "./Courses.vue";
import Skills from "./Skills.vue";
import { getSnippet, updateSnippetStars } from "@/services/entites";
import { first } from "lodash";
import { markRaw } from "vue";
import { type Snippet } from "@/services/entites";

const snippetList = ref<Snippet[]>([]);

const educations = ref([
  { title: "university", component: markRaw(Values) },
  { title: "high-school", component: markRaw(ValuesSec) },
  { title: "courses", component: markRaw(Courses) },
]);

const interests = ref([
  { title: "Web3", component: markRaw(Web3Interests) },
  { title: "Skills", component: markRaw(Skills) },
]);

const bio = ref([{ title: "about-me", component: markRaw(AboutMe) }]);
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
    title: "education",
    key: first(educations.value)?.title,
    content: educations.value,
    iconFill: "#3A49A4",
    isOpened: false,
  },
]);

const contacts = ref([
  { title: "horberlan@gmail.com", icon: "MailIcon" },
  // everyone realy need know that?
  // { title: "+55 83 981856267", icon: "CellphoneIcon" },
]);

const sidebarAccordions = ref([
  { titleAccorden: "personal-info", content: personalInfo.value },
  { titleAccorden: "contacts", content: contacts.value },
]);

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
    console.log(snippetList.value);
  } catch (error) {
    console.error("Error fetching snippets:", error);
  }
};

const updateSafeSnippet = async (snippet: Partial<Snippet>) => {
  snippet = { _id: snippet._id, stars: ++snippet.stars };
  try {
    console.log(JSON.stringify(snippet));
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
@media only screen and (max-width: 768px) {
  :deep(ol) li {
    margin-inline-start: 0rem;
    padding-inline-start: 0rem;
  }
}
</style>
