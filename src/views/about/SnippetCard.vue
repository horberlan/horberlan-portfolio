<template>
  <div class="snippet-container">
    <div class="header">
      <div class="left">
        <img class="avatar" :src="snippet.avatar_url" :alt="snippet.name" />
        <TitleContent :name="snippet.name" :updated="snippet.updated_date" />
      </div>
      <div class="right">
        <p
          @click="updateSafeSnippet(snippet), (isClicked = true)"
          :class="{ clicked: isClicked }"
          v-html="`${snippet.stars} stars`"
        />
      </div>
    </div>
    <div class="snippet-content">
      <highlightjs ref="highlightjsRef" autodetect :code="snippet.snippet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateSnippetStars, type Snippet } from "@/services/entites";
import { useDebounceFn } from "@vueuse/core";
import moment from "moment";
import { h, onMounted, ref, watchEffect, type Ref } from "vue";

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
  const block = highlightjsRef.value.$el?.children[0] as HTMLElement;

  const checkScrollPosition = () => {
    if (!block) return;
    const hasOverflow = block.scrollWidth > block.clientWidth;

    block.classList.toggle("no-shadow", !hasOverflow);
    block.classList.remove("scroll-left", "scroll-right");
    if (!hasOverflow) return;
    const isScrollAtEnd =
      block.scrollLeft >= block.scrollWidth - block.clientWidth;
    block.classList.toggle("scroll-right", !isScrollAtEnd);
    block.classList.toggle("scroll-left", isScrollAtEnd);
  };

  checkScrollPosition();
  window.addEventListener("resize", checkScrollPosition);
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

onMounted(async () => {
  setBoxShadow();
});

const debounceSetBoxShadow = useDebounceFn(async () => {
  setBoxShadow();
}, 50);

watchEffect(async () => {
  await debounceSetBoxShadow();
});
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
      grid-template-columns: 2.5rem 1fr;
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
    border-radius: 0.5rem;
  }
  :deep(pre) {
    position: relative;
    padding-block: 0.5rem;
    padding-inline: 0.5rem 0.25rem;
    margin: 0;
    &::-webkit-scrollbar {
      display: none;
    }
    $shadow-right: inset -30px 0px 20px -10px rgba(26, 31, 38, 0.6);
    $shadow-left: inset 30px 0px 20px -10px rgba(26, 31, 38, 0.6);

    .hljs {
      overflow-x: auto;
      background-color: transparent;
      transition: 400ms;
      border-radius: 5px;
      &::-webkit-scrollbar {
        display: none;
      }
      &.no-shadown {
        box-shadow: none;
      }
      &.scroll-right {
        box-shadow: $shadow-right;
      }

      &.scroll-left {
        box-shadow: $shadow-left;
      }
    }
  }
}
</style>
