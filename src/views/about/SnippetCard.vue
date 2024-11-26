<template>
  <div class="snippet-container" @vue:mounted="nextTick(), setBoxShadow()">
    <div class="header">
      <div class="left">
        <img class="avatar" :src="snippet.avatar_url" :alt="snippet.name" />
        <TitleContent :name="snippet.name" :updated="snippet.updated_date" />
      </div>
      <div class="right">
        <p
          @click="updateSafeSnippet(snippet), (isClicked = true)"
          :class="{ clicked: isClicked }"
        >
          {{ snippet.stars }} stars
        </p>
      </div>
    </div>
    <div class="snippet-content">
      <highlightjs ref="highlightjsRef" autodetect :code="snippet.snippet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateSnippetStars, type Snippet } from "@/services/entites";
import moment from "moment";
import { h, nextTick, ref, type Ref } from "vue";

defineProps<{
  snippet: Snippet;
}>();

const emit = defineEmits(["update:snippets"]);
const isClicked = ref(false);
const highlightjsRef: Ref<HTMLElement | null> = ref(null);

const TitleContent = ({ name, updated }: { name: string; updated: string }) => {
  return h("p", { style: { display: "flex", gap: "0.5rem" } }, [
    h("span", name),
    h("span", "Created"),
    h("span", moment.utc(updated).format("MM/DD/YYYY")),
  ]);
};

const setBoxShadow = () => {
  if (!highlightjsRef.value) return;
  console.log(highlightjsRef.value)
  const block = highlightjsRef.value.$el?.children[0] as HTMLElement;

  const checkScrollPosition = () => {
    if (!block) return;
    const { scrollLeft, clientWidth, scrollWidth } = block;
    if (!scrollLeft || !clientWidth || !scrollWidth) return;

    if (scrollWidth > clientWidth) {
      if (scrollLeft >= scrollWidth - clientWidth) {
        block.classList.remove("scroll-right");
        block.classList.add("scroll-left");
      } else {
        block.classList.add("scroll-right");
        block.classList.remove("scroll-left");
      }
    } else {
      block.classList.remove("scroll-left", "scroll-right");
    }
  };

  checkScrollPosition();
  block.addEventListener("scroll", checkScrollPosition);
};

const updateSafeSnippet = async (
  snippet: Required<Pick<Snippet, "_id" | "stars">>
) => {
  if (isClicked.value || !snippet.stars) return;
  try {
    await updateSnippetStars({
      _id: snippet._id,
      stars: ++snippet.stars,
    });

    await emit("update:snippets");
  } catch (error) {
    console.error("Error updating snippet:", error);
  }
};
</script>

<style lang="scss" scoped>
.snippet-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-block-end: 1rem;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      display: grid;
      grid-template-columns: 40px 1fr;
      grid-template-rows: min-content;
      place-items: center;
      gap: 1rem;

      .avatar {
        width: 2.625rem;
        height: 2.625rem;
        border-radius: 50%;
      }
    }

    .right {
      cursor: pointer;
      display: flex;
      gap: 2rem;

      .clicked {
        cursor: not-allowed;
      }
    }
  }

  .snippet-content {
    background: #011221;
    border: 1px solid #1e2d3d;
    border-radius: 8px;
  }
  :deep(pre) {
    position: relative;
    padding-block: 0.5rem;
    padding-inline: 0.5rem 0.25rem;
    margin: 0;
    &::-webkit-scrollbar {
      display: none;
    }
    .hljs {
      overflow-x: auto;
      background-color: transparent;
      transition: 400ms;
      border-radius: 5px;
      box-shadow: inset -30px 0px 20px -10px rgba(26, 31, 38, 0.6);
      &::-webkit-scrollbar {
        display: none;
      }
      &.scroll-right {
        box-shadow: inset -30px 0px 20px -10px rgba(26, 31, 38, 0.6);
      }

      &.scroll-left {
        box-shadow: inset 30px 0px 20px -10px rgba(26, 31, 38, 0.6);
      }
    }
  }
}
</style>
