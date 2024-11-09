<template>
  <div
    v-if="$route.params.name === 'v-timeline-component'"
    class="custom-content"
  >
    <vTimelineComponent
      layout="vertical"
      :events="timelineEvents"
      line-width="3px"
      color="#bf6a53"
    >
      <template #default="{ event }: { event: TimelineEvent, index: number }">
        <p>{{ event.title }}</p>
        <p>{{ event.description }}</p>
        <p>{{ event.date }}</p>
        <vTimelineComponent
          v-if="event.child"
          :events="event.child"
          line-width="1px"
          color="#008080"
          marker-size="0.8rem"
        >
          <template
            #default="{ event }: { event: TimelineEvent, index: number }"
          >
            <div class="flex">
              <span>{{ event }} Lorem, ipsum dolor sit </span>
            </div>
          </template>
        </vTimelineComponent>
      </template>
      <template #marker> <span> 💩</span></template>
    </vTimelineComponent>
    <vTimelineComponent
      layout="horizontal"
      :events="timelineEvents"
      line-width="2px"
      color="#aa8ed6"
      marker-size="1.2rem"
    >
      <template #default="{ event }: { event: TimelineEvent, index: number }">
        <div class="flex">
          <p>{{ event.title }}</p>
          <p>{{ event.description }}</p>
          <p>{{ event.date }}</p>
        </div>
      </template>
      <template #marker="{ event }">
        <span>{{ event.marker }}</span></template
      >
    </vTimelineComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import vTimelineComponent from "v-timeline-component";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  child?: string[];
}

const timelineEvents: Ref<TimelineEvent[]> = ref([
  {
    title: "Lorem ipsum dolor sit amet 0",
    date: "2023-02-15",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    marker: "🥳",
  },
  {
    title: "Lorem ipsum dolor sit amet 1",
    date: "2023-03-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    marker: "🥴",
    child: ["😁", "😆", "😅", "🤣", "😂", "🙂"],
  },
  {
    title: "Lorem ipsum dolor sit amet 2",
    date: "2023-04-20",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    marker: "🐸",
  },
  {
    title: "Lorem ipsum dolor sit amet 3",
    date: "2023-01-20",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    marker: "🤫",
  },
]);
</script>

<style scoped>
* span {
  z-index: 3;
}
.custom-content {
  position: relative;
  background-color: white;
  max-width: 100dvw;
  height: 200vh;
}
</style>
