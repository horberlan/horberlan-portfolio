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
            @click="() => (select = !select)"
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
      <p v-if="select">asdasdas</p>
      <ol>
        <li>/**</li>
        <li>* About me</li>
        <li>* About me Working as a Full Stack developer with</li>
        <li>* emphasis on Front-end javaScript frameworks such</li>
        <li>* as React.js and Vue.js 3 (Composition API),</li>
        <li>* Back-end inpython3 (Django) and Node.js. Mobile application</li>
        <li>* development using React Native Framework.</li>
        <li>* Worked on 11 new products in the last 6months for Fermen.to</li>
        <li>* and Flow E.F inc. Aiming at a minimum of 95%</li>
        <li>* performance in collaborative development applications.</li>
        <li>* Passionate about decentralized projects on WEB3.</li>
        <li>* One of my projects created in 2021 got</li>
        <li>* 4600+ downloads and 8.8 rating on Pling Store.</li>
        <li>* In my spare time I</li>
        <li>* contribute as a translation reviewer for GitLab inc.</li>
        <li>**/</li>
      </ol>
    </template>
    <template #panel-3>
      <div>
        <p ref="lineCouter" class="test-span">// Code snippet showcase:</p>
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
const personalInfo = ref([
  {
    title: "bio",
    content: "to do",
    iconFill: "#E99287",
    isOpened: true,
  },
  {
    title: "interests",
    content: "to do",
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
ol {
  font-family: monospace;
  font-weight: 350;
  font-size: 1.125rem;
  line-height: 1.6875rem;
  color: #607b96;
  li {
    padding-inline-start: 1.5rem;
    margin-inline-start: 2rem;
    &::marker {
      display: block;
      font-weight: lighter;
    }
  }
}
</style>
