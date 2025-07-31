<template>
  <div v-if="$route.params.name === 'v-timeline-component'" class="timeline-showcase">
    <div class="npm-package-badge">
      <a :href="ProjectCase.link" target="_blank" rel="noopener noreferrer" class="npm-link">
        <div class="npm-icon">📦</div>
        <div class="npm-content">
          <span class="npm-label">PACKAGE</span>
          <span class="npm-name">{{ ProjectCase.name }}</span>
        </div>
        <div class="npm-arrow">→</div>
      </a>
    </div>
    <section v-for="(config, _) in timelineConfigs" :key="config.layout" class="timeline-section"
      :class="{ 'horizontal-section': config.layout === 'horizontal' }">
      <div class="section-header">
        <h2 class="section-title">{{ config.title }}</h2>
        <div class="section-decoration"></div>
        <p class="section-description">{{ config.description }}</p>
      </div>

      <div class="timeline-container" :class="`${config.layout}-container`">
        <vTimelineComponent :layout="config.layout" :events="timelineEvents" :line-width="config.lineWidth"
          :color="config.color" :marker-size="config.markerSize">
          <template #default="{ event, index }: { event: TimelineEvent, index: number }">
            <transition name="card-hover" mode="out-in">
              <div :class="[ config.cardClass, { 'card-hovered': hoveredCard === `${config.layout}-${index}` } ]"
                :data-index="index + 1" @mouseenter="hoveredCard = `${config.layout}-${index}`"
                @mouseleave="hoveredCard = null">
                <div class="card-corner-cut"></div>
                <div :class="config.cardHeaderClass">
                  <h3 :class="config.titleClass">{{ event.title }}</h3>
                  <span :class="config.dateClass">{{ formatDate(event.date) }}</span>
                </div>
                <p :class="config.descriptionClass">{{ event.description }}</p>

                <vTimelineComponent v-if="event.child?.length" layout="vertical" :events="event.child"
                  :line-width="config.nestedLineWidth" :color="config.nestedColor"
                  :marker-size="config.nestedMarkerSize" :class="config.nestedTimelineClass">
                  <template #default="{ event: childEvent }: { event: TimelineEvent }">
                    <div :class="config.nestedCardClass">
                      <h4 v-if="config.layout === 'vertical'" class="nested-title">{{ childEvent.title }}</h4>
                      <span v-else class="nested-horizontal-content">{{ childEvent.title }}</span>
                      <p v-if="config.layout === 'vertical'" class="nested-description">{{ childEvent.description }}</p>
                      <span v-if="config.layout === 'vertical'" class="nested-date">{{
                        formatDate(childEvent.date) }}</span>
                    </div>
                  </template>
                  <template #marker>
                    <span :class="config.nestedMarkerClass">{{ config.nestedMarkerIcon }}</span>
                  </template>
                </vTimelineComponent>
              </div>
            </transition>
          </template>

          <template #marker="{ event }">
            <transition name="marker-pulse" mode="out-in">
              <div class="custom-marker" :class="`${config.layout}-marker`">
                <span class="marker-icon">{{ event.marker || config.defaultMarker }}</span>
              </div>
            </transition>
          </template>
        </vTimelineComponent>
      </div>
    </section>

    <div class="brutalist-decorations">
      <div v-for="deco in [ 'grid', 'plus', 'lines', 'circle' ]" :key="deco" class="floating-shape"
        :class="`deco-${deco}`">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import vTimelineComponent from "v-timeline-component";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  marker?: string;
  child?: TimelineEvent[];
}

interface TimelineConfig {
  layout: 'vertical' | 'horizontal';
  title: string;
  description: string;
  lineWidth: string;
  color: string;
  markerSize: string;
  defaultMarker: string;
  cardClass: string;
  cardHeaderClass: string;
  titleClass: string;
  dateClass: string;
  descriptionClass: string;
  nestedLineWidth: string;
  nestedColor: string;
  nestedMarkerSize: string;
  nestedTimelineClass: string;
  nestedCardClass: string;
  nestedMarkerClass: string;
  nestedMarkerIcon: string;
}

const hoveredCard = ref<string | null>(null);

const ProjectCase = ref({
  name: "v-timeline-component",
  link: "https://www.npmjs.com/package/v-timeline-component"
});

const timelineEvents: Ref<TimelineEvent[]> = ref([
  {
    title: "PROJECT INCEPTION",
    date: "2023-02-15",
    description: "The beginning of our amazing journey with innovative ideas and ambitious goals that will reshape the digital landscape.",
    marker: "🚀",
    child: [
      {
        title: "INITIAL PLANNING",
        date: "2023-02-16",
        description: "Detailed project planning and requirement gathering phase."
      },
      {
        title: "TEAM ASSEMBLY",
        date: "2023-02-17",
        description: "Bringing together the perfect team for this ambitious project."
      }
    ]
  },
  {
    title: "DEVELOPMENT MILESTONE",
    date: "2023-03-01",
    description: "Major breakthrough in development with successful implementation of core features that exceed expectations.",
    marker: "⭐",
    child: [
      {
        title: "FRONTEND DEVELOPMENT",
        date: "2023-03-02",
        description: "Building beautiful and responsive user interfaces."
      },
      {
        title: "BACKEND INTEGRATION",
        date: "2023-03-05",
        description: "Seamless integration of backend services and APIs."
      },
      {
        title: "TESTING PHASE",
        date: "2023-03-10",
        description: "Comprehensive testing to ensure quality and reliability."
      }
    ]
  },
  {
    title: "BETA RELEASE",
    date: "2023-04-20",
    description: "Successfully launched beta version with positive feedback from early adopters and industry experts.",
    marker: "🎁"
  },
  {
    title: "TEAM FORMATION",
    date: "2023-01-20",
    description: "Assembled a talented team of developers and designers ready to create digital magic and innovation.",
    marker: "👥"
  },
]);

const timelineConfigs: Ref<TimelineConfig[]> = ref([
  {
    layout: 'vertical',
    title: 'VERTICAL TIMELINE',
    description: 'A BOLD CHRONOLOGICAL JOURNEY',
    lineWidth: '4px',
    color: '#4D5BCE',
    markerSize: '2.2rem',
    defaultMarker: '🎯',
    cardClass: 'brutalist-card',
    cardHeaderClass: 'brutalist-header',
    titleClass: 'brutalist-title',
    dateClass: 'brutalist-date',
    descriptionClass: 'brutalist-description',
    nestedLineWidth: '2px',
    nestedColor: '#43D9AD',
    nestedMarkerSize: '1rem',
    nestedTimelineClass: 'nested-brutalist',
    nestedCardClass: 'nested-brutalist-card',
    nestedMarkerClass: 'nested-marker',
    nestedMarkerIcon: '🧙'
  },
  {
    layout: 'horizontal',
    title: 'HORIZONTAL TIMELINE',
    description: 'NAVIGATE THROUGH BOLD DESIGN',
    lineWidth: '3px',
    color: '#E99287',
    markerSize: '1.5rem',
    defaultMarker: '🚀',
    cardClass: 'brutalist-horizontal-card',
    cardHeaderClass: 'brutalist-horizontal-header',
    titleClass: 'brutalist-horizontal-title',
    dateClass: 'brutalist-horizontal-date',
    descriptionClass: 'brutalist-horizontal-description',
    nestedLineWidth: '1px',
    nestedColor: '#4D5BCE',
    nestedMarkerSize: '0.6rem',
    nestedTimelineClass: 'nested-brutalist-horizontal',
    nestedCardClass: 'nested-brutalist-horizontal-card',
    nestedMarkerClass: 'nested-horizontal-marker',
    nestedMarkerIcon: '👽'
  }
]);

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).toUpperCase();
};
</script>

<style lang="scss" scoped>
$neu-black: #212121;
$neu-green: #43D9AD;
$neu-pink: #E99287;
$neu-indigo: #4D5BCE;
$neu-cream: #FFFDDC;
$neu-white: #FFFFFF;
$neu-light-grey: #6D7A88;
$neu-shadow-color: rgba($neu-black, 0.3);

@mixin brutalist-shadow($x-offset: 8px, $y-offset: 8px, $color: $neu-black, $shadow-color: $neu-shadow-color) {
  box-shadow: $x-offset $y-offset 0px $color,
    ($x-offset * 2) ($y-offset * 2) 0px $shadow-color;
}

@mixin brutalist-border($color: $neu-black, $width: 4px) {
  border: $width solid $color;
}

@mixin brutalist-hover($x-offset: 12px, $y-offset: 12px, $color: $neu-black, $shadow-color: $neu-shadow-color) {
  transform: translate(-4px, -4px);
  box-shadow: $x-offset $y-offset 0px $color,
    ($x-offset * 1.5) ($y-offset * 1.5) 0px $shadow-color;
}

@mixin double-border($color1: $neu-black, $width1: 4px, $color2: $neu-pink, $width2: 2px) {
  border: $width1 solid $color1;
  box-shadow: 0 0 0 $width1 $color1, 0 0 0 ($width1 + $width2) $color2;
}

.card-hover-enter-active,
.card-hover-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.card-hover-enter-from,
.card-hover-leave-to {
  opacity: 0.95;
  transform: scale(0.98);
}

.marker-pulse-enter-active,
.marker-pulse-leave-active {
  transition: all 0.3s ease;
}

.marker-pulse-enter-from,
.marker-pulse-leave-to {
  transform: scale(0.9);
  opacity: 0.8;
}

.timeline-showcase {
  min-height: 100vh;
  background: $neu-cream;
  background-image:
    linear-gradient(45deg, $neu-green 25%, transparent 25%),
    linear-gradient(-45deg, $neu-green 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, $neu-green 75%),
    linear-gradient(-45deg, transparent 75%, $neu-green 75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
  background-attachment: fixed;
  position: relative;
  overflow-x: hidden;
  font-family: 'Arial Black', Arial, sans-serif;
}

.npm-package-badge {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: $neu-cream;
  @include double-border($neu-black, 3px, $neu-indigo, 2px);
  box-shadow: 6px 6px 0px $neu-black, 12px 12px 0px rgba($neu-black, 0.4);
  padding: 1rem;
  transition: all 0.25s ease-out;
  cursor: pointer;

  &:hover {
    @include brutalist-hover(10px, 10px, $neu-black, rgba($neu-black, 0.6));

    .npm-link {
      transform: scale(1.02);
    }
  }
}

.npm-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  font-family: 'Arial Black', Arial, sans-serif;
  color: $neu-black;
  text-transform: uppercase;
}

.npm-icon {
  font-size: 2rem;
  line-height: 1;
  color: $neu-indigo;
}

.npm-content {
  display: flex;
  flex-direction: column;
}

.npm-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: $neu-green;
  letter-spacing: 1px;
}

.npm-name {
  font-size: 1.2rem;
  font-weight: 900;
  color: $neu-black;
}

.npm-arrow {
  font-size: 1.5rem;
  font-weight: 900;
  color: $neu-indigo;
  transition: transform 0.25s ease-out;
}

.npm-package-badge:hover .npm-arrow {
  transform: translateX(6px);
  color: $neu-green;
}

.timeline-section {
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;

  &:nth-child(odd) {
    background: rgba($neu-black, 0.03);
  }
}

.horizontal-container {
  scroll-snap-type: x proximity;
  overflow-x: scroll;
  padding-block: 2rem;
  padding-left: 1rem;
  scroll-padding-top: 5vh;

  ::-webkit-scrollbar {
    display: none;
  }

}

.horizontal-section {
  background: $neu-black !important;
  color: $neu-white;


  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: repeating-linear-gradient(90deg,
        $neu-green 0px,
        $neu-green 25px,
        $neu-pink 25px,
        $neu-pink 50px,
        $neu-indigo 50px,
        $neu-indigo 75px);
    @include brutalist-border($neu-black, 0);
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-title {
  font-family: 'Impact', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  color: $neu-black;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: -5px;
  position: relative;
  display: inline-block;
  line-height: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%) skewX(-10deg);
    width: 90%;
    height: 12px;
    background: $neu-pink;
    @include brutalist-border($neu-black, 4px);
  }

  .horizontal-section & {
    color: $neu-white;
    text-shadow: 8px 8px 0px $neu-indigo, 16px 16px 0px rgba($neu-indigo, 0.5);

    &::after {
      background: $neu-green;
    }
  }
}

.section-decoration {
  width: 250px;
  height: 25px;
  background: $neu-indigo;
  @include brutalist-border($neu-black, 4px);
  margin: 1.5rem auto 2rem;
  clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
  transition: all 0.3s ease-out;

  .horizontal-section & {
    background: $neu-green;
  }
}

.section-description {
  font-family: 'Arial', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: $neu-light-grey;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;

  .horizontal-section & {
    color: $neu-light-grey;
  }
}

.timeline-container {
  margin: 0 auto;
  position: relative;
}

.brutalist-card,
.brutalist-horizontal-card {
  background: $neu-cream;
  @include brutalist-border($neu-black, 5px);
  @include brutalist-shadow(10px, 10px, $neu-black, rgba($neu-black, 0.45));
  padding: 2.5rem;
  margin: 3rem 1rem;
  margin-bottom: 5rem;
  margin-left: 1rem;
  position: relative;
  transition: all 0.25s ease-out;
  overflow: visible;
  cursor: pointer;
  z-index: 2;

  &::before {
    content: attr(data-index);
    position: absolute;
    top: -20px;
    right: -20px;
    width: 50px;
    height: 50px;
    background: $neu-green;
    @include brutalist-border($neu-black, 4px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial Black', Arial, sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    color: $neu-black;
    z-index: 3;
    transition: all 0.25s ease-out;
  }

  &.card-hovered,
  &:hover {
    @include brutalist-hover(15px, 15px, $neu-black, rgba($neu-black, 0.6));
    transform: translate(-6px, -6px);

    &::before {
      transform: scale(1.2) rotate(5deg);
      background: $neu-pink;
    }
  }
}

.brutalist-horizontal-card {
  min-width: 400px;
  background: $neu-black;
  border-color: $neu-green;
  color: $neu-white;

  &::before {
    background: $neu-pink;
    color: $neu-black;
  }

  &.card-hovered::before,
  &:hover::before {
    background: $neu-indigo;
    color: $neu-white;
  }
}

.card-corner-cut {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: $neu-pink;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transition: all 0.25s ease-out;
}

.card-hovered .card-corner-cut,
.brutalist-card:hover .card-corner-cut,
.brutalist-horizontal-card:hover .card-corner-cut {
  background: $neu-indigo;
  transform: scale(1.3);
}

.brutalist-header,
.brutalist-horizontal-header {
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 6px;
    background: $neu-indigo;
    transition: width 0.25s ease-out;
  }
}

.brutalist-horizontal-header::after {
  background: $neu-green;
}

.card-hovered .brutalist-header::after,
.card-hovered .brutalist-horizontal-header::after,
.brutalist-card:hover .brutalist-header::after,
.brutalist-horizontal-card:hover .brutalist-horizontal-header::after {
  width: 120px;
  background: $neu-pink;
}

.brutalist-title,
.brutalist-horizontal-title {
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: $neu-black;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: -2px;
  line-height: 1.1;
  transition: all 0.25s ease-out;
}

.brutalist-horizontal-title {
  color: $neu-white;
  font-size: 1.8rem;
}

.card-hovered .brutalist-title,
.brutalist-card:hover .brutalist-title {
  color: $neu-indigo;
  transform: translateX(4px);
}

.card-hovered .brutalist-horizontal-title,
.brutalist-horizontal-card:hover .brutalist-horizontal-title {
  color: $neu-green;
  transform: translateX(4px);
}

.brutalist-date,
.brutalist-horizontal-date {
  background: $neu-black;
  color: $neu-white;
  font-family: 'Arial Black', Arial, sans-serif;
  font-weight: 900;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
  transition: all 0.25s ease-out;
}

.brutalist-horizontal-date {
  background: $neu-pink;
  color: $neu-black;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

.card-hovered .brutalist-date,
.brutalist-card:hover .brutalist-date {
  background: $neu-green;
  transform: translateY(-4px);
}

.card-hovered .brutalist-horizontal-date,
.brutalist-horizontal-card:hover .brutalist-horizontal-date {
  background: $neu-indigo;
  color: $neu-white;
  transform: translateY(-4px);
}

.brutalist-description,
.brutalist-horizontal-description {
  font-family: 'Arial', sans-serif;
  color: $neu-light-grey;
  line-height: 1.8;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.25s ease-out;
}

.brutalist-horizontal-description {
  color: $neu-light-grey;
  font-size: 1rem;
}

.custom-marker {
  background: $neu-white;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @include brutalist-shadow(4px, 4px, $neu-black, rgba($neu-black, 0.2));
  transition: all 0.3s ease-out;
  position: relative;
  overflow: hidden;
  border: 3px solid $neu-black;
  z-index: 10;
  transform: rotate(5deg);
}

.custom-marker::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, $neu-indigo, $neu-green);
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.custom-marker:hover::before {
  opacity: 0.4;
}

.custom-marker:hover {
  transform: scale(1.3) rotate(20deg);
  @include brutalist-shadow(8px, 8px, $neu-black, rgba($neu-black, 0.4));
}

.vertical-marker {
  min-width: 3rem;
  min-height: 3rem;
  aspect-ratio: 1/1;
}

.horizontal-marker {
  min-width: 3rem;
  min-height: 3rem;
  aspect-ratio: 1/1;
  background: $neu-black;
  border-color: $neu-green;
}

.marker-icon {
  font-size: 1.5rem;
  z-index: 1;
  position: relative;
  transition: transform 0.3s ease-out;
  color: $neu-black;
}

.horizontal-marker .marker-icon {
  font-size: 1.2rem;
  color: $neu-green;
}

.custom-marker:hover .marker-icon {
  transform: rotate(25deg) scale(1.2);
}

.nested-brutalist,
.nested-brutalist-horizontal {
  margin-top: 2rem;
}

.nested-brutalist-horizontal {
  border-top-color: rgba($neu-light-grey, 0.4);
}

.nested-brutalist-card,
.nested-brutalist-horizontal-card {
  background: rgba($neu-green, 0.08);
  border-radius: 0;
  padding: 1rem;
  border-left: 4px solid $neu-green;
  margin-bottom: 0.75rem;
  margin-left: 0.75rem;
  transition: all 0.2s ease-out;

  &:hover {
    background: rgba($neu-green, 0.15);
    border-left-color: $neu-indigo;
    transform: translateX(6px);
  }
}

.nested-brutalist-horizontal-card {
  background: rgba($neu-indigo, 0.12);
  border-radius: 0;
  padding: 0.75rem;
  border-left: 3px solid $neu-indigo;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;

  &:hover {
    background: rgba($neu-indigo, 0.2);
    border-left-color: $neu-pink;
  }
}

.nested-title {
  font-size: 1rem;
  font-weight: 700;
  color: $neu-black;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nested-description {
  color: $neu-light-grey;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
}

.nested-date {
  color: $neu-green;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.nested-horizontal-content {
  color: $neu-indigo;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.nested-marker,
.nested-horizontal-marker {
  font-size: 0.9rem;
}

.nested-horizontal-marker {
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 3rem;
  }

  .timeline-section {
    padding: 3rem 1rem;
  }

  .brutalist-card,
  .brutalist-horizontal-card {
    padding: 1.5rem;
    margin: 2rem 0.5rem;
  }

  .floating-shape {
    opacity: 0.3;
    transform: scale(0.7);
  }

  .npm-package-badge {
    top: 10px;
    right: 10px;
    padding: 0.75rem;
  }

  .npm-icon {
    font-size: 1.5rem;
  }

  .npm-name {
    font-size: 1rem;
  }

  .npm-label {
    font-size: 0.7rem;
  }

  .npm-arrow {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2.5rem;
    letter-spacing: -1px;

    &::after {
      bottom: -8px;
      height: 8px;
    }
  }

  .brutalist-title {
    font-size: 1.6rem;
  }

  .brutalist-card,
  .brutalist-horizontal-card {
    padding: 1rem;
  }

  .npm-package-badge {
    top: 5px;
    right: 5px;
    padding: 0.5rem;
  }

  .npm-icon {
    font-size: 1.2rem;
  }

  .npm-name {
    font-size: 0.9rem;
  }

  .npm-label {
    font-size: 0.6rem;
  }

  .npm-arrow {
    font-size: 1rem;
  }

  .custom-marker {
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .marker-icon {
    font-size: 1.2rem;
  }
}

.brutalist-decorations {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  @include brutalist-border($neu-black, 4px);
  will-change: transform;
}

.deco-grid {
  width: 180px;
  height: 180px;
  top: 10%;
  left: -80px;
  background-color: $neu-green;
  background-image:
    linear-gradient(to right, $neu-black 2px, transparent 2px),
    linear-gradient(to bottom, $neu-black 2px, transparent 2px);
  background-size: 30px 30px;
  animation: sway 15s ease-in-out infinite;
}

.deco-plus {
  width: 150px;
  height: 150px;
  top: 20%;
  right: -75px;
  background: $neu-pink;
  clip-path: polygon(35% 0, 65% 0, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%, 0 35%, 35% 35%);
  animation: spin-pulse 12s ease-in-out infinite;
}

.deco-lines {
  width: 250px;
  height: 100px;
  bottom: 10%;
  left: -125px;
  background: repeating-linear-gradient(-45deg, $neu-indigo, $neu-indigo 10px, $neu-cream 10px, $neu-cream 20px);
  animation: drift 18s ease-in-out infinite;
}

.deco-circle {
  width: 200px;
  height: 200px;
  bottom: 15%;
  right: -100px;
  background: $neu-indigo;
  border-radius: 50%;
  animation: pulse 10s ease-in-out infinite;
}

@keyframes sway {

  0%,
  100% {
    transform: translate(0, 0) rotate(0);
  }

  50% {
    transform: translate(40px, 20px) rotate(10deg);
  }
}

@keyframes spin-pulse {

  0%,
  100% {
    transform: scale(1) rotate(0);
  }

  50% {
    transform: scale(1.1) rotate(45deg);
  }
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(60px, -30px);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.15);
  }
}
</style>