<template>
  <div class="articles-container" ref="scrollContainer">
    <div v-for="(article, index) in articles" :key="index" class="article-card">
      <div class="card-header">
        <h2 class="title">{{ article.title }}</h2>
      </div>
      <div class="card-body">
        <p class="categories">
          Categorias:
          <span
            v-for="(category, index) in article.categories"
            :key="`article-${index}`"
            class="category"
          >
            <span v-if="index === article.categories.length - 1">{{
              category
            }}</span>
            <span v-else>{{ category }}, </span>
          </span>
        </p>
        <p class="date">{{ formatDate(article.date) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MediumArticles } from "medium-article-api";
import { onMounted, ref } from "vue";

interface Article {
  title: string;
  categories: string[];
  description: string;
  date: string;
}

const mediumArticles = MediumArticles();
const username: string = "horberlan";
const articles = ref<Article[]>([]);

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};

const handleMouseDown = (e: MouseEvent): void => {
  console.log(e);
  e.preventDefault();
  const startX: number = e.pageX - e?.target?.offsetLeft;
  scrollContainer.value.style.cursor = "grabbing";

  const handleMouseMove = (moveEvent: MouseEvent): void => {
    const x: number = moveEvent.pageX - e.target.offsetLeft;
    const walk: number = (x - startX) * 3;
    scrollContainer.value.scrollLeft -= walk;
  };

  const handleMouseUp = (): void => {
    scrollContainer.value.style.cursor = "grab";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Add event listeners
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

const scrollContainer = ref<HTMLDivElement | null>(null);

onMounted(async (): Promise<void> => {
  try {
    const result: any = await mediumArticles.getData(username);
    articles.value = result.items.map((item: any) => ({
      title: item.title,
      categories: item.categories,
      description: item.description,
      date: item.pubDate,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("mousedown", handleMouseDown);
  }
});
</script>

<style lang="scss" scoped>
.articles-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  cursor: grab;
  width: 100%;
}

.article-card {
  flex-shrink: 0;
  scroll-snap-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  max-width: 32rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.date {
  font-size: 14px;
  color: #777;
}

.card-body {
  line-height: 1.6;
}

.categories {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.category {
  font-weight: bold;
  color: #333;
}

.description {
  font-size: 16px;
  color: #555;
}
</style>
