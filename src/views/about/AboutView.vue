<template>
  <PanelView>
    <template #panel-1>
      <box-accordeon
        v-for="(accordeons, index) in sidebarPersonalInfo"
        :key="index"
        mode="'item'"
        :title="accordeons.titleAccorden"
        :open="true"
        @selected="null"
        @close-all="null"
      >
        <box-accordeon
          v-for="(items, index) in accordeons.content"
          :key="index"
          :title="items.title"
          :open="items.isOpened"
          @selected="null"
          @close-all="null"
        >
          <template #icon-folder>
            <SvgIcon name="FolderIcon" size="md" :fill="items.iconFill" />
          </template>
          <button
            v-for="(education, index) in items.content"
            :key="index"
            @click="componentValue = education.component"
            class="btn"
          >
            <SvgIcon name="AboutMd" size="md" />
            {{ education.title || "" }}
          </button>
        </box-accordeon>
      </box-accordeon>

      <box-accordeon
        v-for="(accordeons, index) in sidebarContacts"
        :key="index"
        mode="'item'"
        :title="accordeons.titleAccorden"
        :open="true"
        @selected="null"
        @close-all="null"
      >
        <h4 v-for="(links, index) in accordeons.content" :key="index">
          <button class="btn">
            <SvgIcon :name="links.icon" size="md" />{{ links.title }}
          </button>
        </h4>
      </box-accordeon>
    </template>
    <template #panel-2>
      <component :is="componentValue" />
    </template>
    <template #panel-3>
      <div class="right-container">
        <p ref="lineCouter" class="test-span">// Code snippet showcase:</p>
        <div
          class="snippet-container"
          v-for="snippet in snippetList"
          :key="snippet.id"
        >
          <div class="header">
            <div class="left">
              <img class="img" :src="snippet.avatar_url" :alt="snippet.name" />
              <p>
                {{ snippet.name }} <br />
                Created
                {{ moment.utc(snippet.updated_date).format("MM/DD/YYYY") }}
              </p>
            </div>
            <div class="right">
              <p @click="show = !show">details</p>
              <p @click="updateSafeSnippet(snippet)">
                {{ snippet.stars }} stars
              </p>
            </div>
          </div>
          <div class="snippet-content">
            <div v-highlight>
              <pre class="language-javascript">
                <code v-html=snippet.snippet />
              </pre>
            </div>
          </div>
          <Transition>
            <p v-if="show">{{ snippet.details }}</p>
          </Transition>
        </div>
      </div>
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import BoxAccordeon from "@/components/BoxAccordeon.vue";
import PanelView from "@/components/PanelView.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { markRaw, onMounted, onUpdated, ref, type Ref } from "vue";
import Skills from "./Skills.vue";
import Web3Interests from "./Web3Interests.vue";
import Values from "./ValuesComp.vue";
import ValuesSec from "./TestTwo.vue";
import AboutMe from "./AboutMe.vue";
import Courses from "./Courses.vue";
import { getSnippet, updateSnippet } from "@/services/entites";
import "vue-code-highlight/themes/duotone-sea.css";
import moment from "moment";

const componentValue = ref(markRaw(AboutMe));
const snippetList = ref([]) as Ref<Snippets[]>;
const show = ref(false);

type Snippets = {
  id: string;
  name: string;
  updated_date: string;
  snippet: string;
  details: string;
  stars: number;
  avatar_url: string;
};
const getSafeSnippet = async () => {
  try {
    const snippets = await getSnippet();
    snippetList.value = snippets;
  } catch {
    console.log("error");
  } finally {
    console.log("ok");
  }
};
const updateSafeSnippet = async (snippet: Snippets) => {
  snippet = { ...snippet, stars: ++snippet.stars, details: "aaa" };
  try {
    await updateSnippet(snippet);
    await getSnippet();
  } catch {
    console.log("error");
  } finally {
    console.log("ok");
  }
};
const educations = ref([
  {
    title: "university",
    component: markRaw(Values),
  },
  {
    title: "high-school",
    component: markRaw(ValuesSec),
  },
  {
    title: "Courses",
    component: markRaw(Courses),
  },
]);
const interests = ref([
  {
    title: "Web3",
    component: markRaw(Web3Interests),
  },
  {
    title: "Skills",
    component: markRaw(Skills),
  },
]);
const bio = ref([
  {
    title: "About me",
    component: markRaw(AboutMe),
  },
]);
const personalInfo = ref([
  {
    title: "bio",
    content: bio.value,
    iconFill: "#E99287",
    isOpened: true,
  },
  {
    title: "interests",
    content: interests.value,
    iconFill: "#43D9AD",
    isOpened: false,
  },
  {
    title: "education",
    content: educations.value,
    iconFill: "#3A49A4",
    isOpened: false,
  },
]);
const contacts = ref([
  { title: "horberlan@gmail.com", icon: "MailIcon", component: null },
  { title: "+55 83 981856267", icon: "CellphoneIcon", component: null },
]);
const sidebarPersonalInfo = [
  { titleAccorden: "personal-info", content: personalInfo.value },
];
const sidebarContacts = [
  { titleAccorden: "contacts", content: contacts.value },
];
onUpdated(async () => await getSnippet());
onMounted(() => getSafeSnippet());
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
</style>
