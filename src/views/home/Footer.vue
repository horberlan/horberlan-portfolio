<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const footerData = ["Copyright ©", "@pois.nada"];
const title = ref(footerData[1]);
const letters = ref<HTMLElement[]>([]);

function handleMouseMove(event: MouseEvent) {
  const rect = (
    document.querySelector(".letters") as HTMLElement
  ).getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  letters.value.forEach((letter: HTMLElement, index) => {
    const letterRect = letter.getBoundingClientRect();
    const letterCenterX = letterRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top + letterRect.height / 2;

    const distanceX = event.clientX - letterCenterX;
    const distanceY = event.clientY - letterCenterY;

    const { distance, intensity } = setDistanceIntensity(
      event.clientX,
      event.clientY,
      letterCenterX,
      letterCenterY
    );

    const translateY = -70 * intensity;
    const scale = 1 + 0.1 * intensity;
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
function setDistanceIntensity(clientX, clientY, middleX, middleY) {
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

onMounted(() => {
  adjustLettersPosition();
  window.addEventListener("resize", adjustLettersPosition);
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("resize", adjustLettersPosition);
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div class="wrapper">
    <div class="text-wrapper">
      <div class="letters rubik-bold">
        <span
          class="letter rubik-bold"
          v-for="(letter, index) of title"
          :key="index"
          :ref="el => { if (el) letters[index] = el as HTMLElement }"
          v-html="letter"
        />
      </div>
    </div>
    <footer>
      <li v-for="(footer, index) in footerData" :key="index">
        <a href="https://github.com/horberlan">{{ footer }}</a>
      </li>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
$size: 16rem;

.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  height: $size;
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
    font-size: $size;
    line-height: 1;
    color: $mirage-secundary;
    text-shadow: 1px 1px 0px $background-midnight;
    transition: transform 50ms ease;
    &s {
      display: flex;
      justify-content: space-evenly;
      flex-flow: row nowrap;
      width: 100%;
      transform: translateY(70%);
      cursor: default;
    }
  }
}
</style>
