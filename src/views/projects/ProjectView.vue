<template>
  <PanelView>
    <template #panel-1>
      <box-accordeon
        title="test"
        :open="true"
        @selected="null"
        @close-all="null"
      >
        content
      </box-accordeon>
    </template>
    <template #panel-2> aaa</template>
    <template #panel-3> aaa</template>
  </PanelView>
</template>

<script setup lang="ts">
import BoxAccordeon from "@/components/BoxAccordeon.vue";
import PanelView from "@/components/PanelView.vue";
</script>

<style lang="scss" scoped></style>
