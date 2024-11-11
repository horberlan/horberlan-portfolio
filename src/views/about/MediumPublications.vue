<template>
  <div class="articles-container" ref="scrollContainer">
    <Suspense>
      <template #fallback>
        <span class="loading">Loading</span>
      </template>
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="article-card"
      >
        <div class="card-header">
          <h2 class="title">
            <a :href="article.link">
              {{ article.title }}
            </a>
          </h2>
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
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { MediumArticles } from "medium-article-api";
import { onMounted, ref, watchEffect } from "vue";

interface Article {
  title: string;
  categories: string[];
  description: string;
  date: string;
  link: string;
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
  e.preventDefault();

  if (e.target === null) {
    console.error("e.target is null, cannot calculate offsetLeft");
    return;
  }

  const startX: number = e.pageX - e.target.offsetLeft;
  scrollContainer.value.style.cursor = "grabbing";

  const handleMouseMove = (moveEvent: MouseEvent): void => {
    if (moveEvent.target === null) {
      console.error("moveEvent.target is null, skipping calculation");
      return;
    }

    const x: number = moveEvent.pageX - e.target.offsetLeft;
    const walk: number = (x - startX) * 3;
    scrollContainer.value.scrollLeft -= walk;
  };

  const handleMouseUp = (): void => {
    scrollContainer.value.style.cursor = "grab";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

const scrollContainer = ref<HTMLDivElement | null>(null);
const syncMediumArticles = async () => {
  try {
    const result: any = await mediumArticles.getData(username);
    articles.value = result.items.map((item: any) => ({
      title: item.title,
      categories: item.categories,
      description: item.description,
      date: item.pubDate,
      link: item.link,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("mousedown", handleMouseDown);
  }
};
onMounted(async (): Promise<void> => {
  await syncMediumArticles();
});
watchEffect(async () => {
  await syncMediumArticles();
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
  background-color: #dddede17;
  color: $font-lynch;
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

.title,
.title a {
  font-size: 20px;
  font-weight: bold;
  color: #b8c6d4;
  margin: 0;
  text-decoration: none;
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
  color: #817f7f;
  margin-bottom: 8px;
}

.category {
  font-weight: bold;
  color: rgb(151, 148, 148);
}

.description {
  font-size: 16px;
  color: #555;
}
@media only screen and (max-width: 768px) {
  .articles-container {
    flex-direction: flex;
    gap: 1rem;
    padding-bottom: 10px;
  }

  .article-card {
    max-width: 78vw;
    margin-bottom: 1rem;
    padding: 12px;
  }

  .card-header {
    margin-bottom: 8px;
  }

  .title,
  .title a {
    font-size: 18px;
  }

  .date,
  .categories {
    font-size: 12px;
  }
}
</style>
