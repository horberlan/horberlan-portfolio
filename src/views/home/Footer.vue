<script setup lang="ts">
import { computed } from "vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const footerData = ["Copyright ©", " @pois.nada "];
const title = ref(footerData[1]);
const letters = ref<HTMLElement[]>([]);
const isMobile = computed(
  () => window?.matchMedia("(max-width: 1024px)").matches
);

function handleMouseMove(event: MouseEvent) {
  if (isMobile.value) return;

  const rect = (
    document.querySelector(".letters") as HTMLElement
  )?.getBoundingClientRect();

  if (!rect) return;

  letters.value.forEach((letter: HTMLElement) => {
    const letterRect = letter.getBoundingClientRect();
    const letterCenterX = letterRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top + letterRect.height / 2;

    const { intensity } = setDistanceIntensity(
      event.clientX,
      event.clientY,
      letterCenterX,
      letterCenterY
    );

    const translateY = -80 * intensity;
    const scale = 1 + 0.4 * intensity;
    letter.style.transform = `translateY(${translateY}px) scale(${scale})`;
  });
}

function handleScroll() {
  if (!isMobile.value) return;

  const scrollPosition = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = Math.min(1, scrollPosition / documentHeight);

  letters.value.forEach((letter: HTMLElement, index) => {
    const delay = (index * 0.1) / 10;
    const wavePosition = Math.min(1, scrollPercentage + delay);

    const translateY = -40 * wavePosition;
    const scale = 1 + 0.1 * wavePosition;

    letter.style.transform = `translateY(${translateY}px) scale(${scale})`;
  });
}

function adjustLettersPosition() {
  const footer = document.querySelector("footer");
  const textWrapper = document.querySelector(".text-wrapper");
  if (footer && textWrapper) {
    const footerHeight = footer.offsetHeight;
    (textWrapper as HTMLElement).style.bottom = `${footerHeight - 20}px`;
  }
}

function setDistanceIntensity(
  clientX: number,
  clientY: number,
  middleX: number,
  middleY: number
) {
  if (!clientX || !middleX)
    return {
      distance: 0,
      intensity: 0,
    };

  const distanceX = clientX - middleX;
  const distanceY = clientY - middleY;
  const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;

  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  const intensity = Math.max(0, 1 - distance / maxDistance);

  return {
    distance,
    intensity,
  };
}

function getRandomColor() {
  //binded in scss
  const colors = ["#607b96", "#4D5BCE", "#43D9AD"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function resetLetters() {
  letters.value.forEach((letter: HTMLElement) => {
    letter.style.transform = "";
  });
}

function triggerInitialScroll() {
  if (isMobile.value) {
    handleScroll();
  }
}

onMounted(() => {
  adjustLettersPosition();

  window.addEventListener("resize", () => {
    const wasMobile = isMobile.value;
    adjustLettersPosition();

    if (wasMobile !== isMobile.value) {
      resetLetters();
      if (isMobile.value) {
        handleScroll();
      }
    }
  });

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", handleScroll);

  setTimeout(triggerInitialScroll, 100);
  console.log(isMobile.value);
});

onUnmounted(() => {
  window.removeEventListener("resize", adjustLettersPosition);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="wrapper sm:h-10 md:h-30 xl:h-60">
    <div class="text-wrapper">
      <article
        class="letters prose sm:text-4xl md:text-6xl lg:text-9xl text-4xl"
        v-if="!route.name"
      >
        <span
          class="letter rubik-bold"
          v-for="(letter, index) of title"
          :key="index"
          :ref="el => { if (el) letters[index] = el as HTMLElement }"
          v-html="letter"
        />
      </article>
    </div>
    <footer>
      <li v-for="(footer, index) in footerData" :key="index">
        <a href="https://github.com/horberlan">{{ footer }}</a>
      </li>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    z-index: 1;
  }
  footer {
    position: relative;
    z-index: 2;
    display: flex;
    border: 1px solid $bg-color;
    width: 100%;
    border: 1px solid $bg-color;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    margin-block-start: auto;

    a {
      color: $font-lynch;
      text-decoration: none;
    }

    li {
      list-style: none;
      padding: 1rem 2rem;
      &:first-of-type {
        border-right: 1px solid $bg-color;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }
      &:last-of-type {
        border-left: 1px solid $bg-color;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }
      height: 100%;
      color: $font-lynch;
      list-style: none;
      &:last-child {
        display: flex;
        margin-inline-start: auto;
        gap: 1rem;
        padding: 1rem 1.5rem;
        &::after {
          filter: grayscale(1);
          cursor: pointer;
          display: block;
          content: "";
          background: url(../../assets/github.svg) no-repeat;
          background-size: cover;
          width: 1.2rem;
          height: 1.2rem;
          transition: 400ms;
        }
        &:hover {
          &::after {
            filter: none;
          }
        }
      }
    }
  }
  .letter {
    color: v-bind(getRandomColor());
    text-shadow: 1px 1px 0px $background-midnight;
    transition: transform 50ms ease;
    &s {
      display: flex;
      justify-content: space-evenly;
      flex-flow: row nowrap;
      width: 100%;
      transform: translateY(90%);
      cursor: default;
    }
  }
}
</style>
