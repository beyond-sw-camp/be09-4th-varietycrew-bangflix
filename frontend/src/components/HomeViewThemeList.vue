<template>
  <section>
    <AppTypography type="title3">{{ props.sectionTitle }}</AppTypography>
    <ul>
      <li v-for="theme in props.themes" :key="theme.themeCode"></li>
    </ul>
  </section>
</template>

<script setup>
import AppTypography from './AppTypography.vue';
import { defineProps } from 'vue';
import EventCard from './cards/ThemeCard.vue';

const props = defineProps({
  sectionTitle: {
    type: String,
    required: true,
  },
  themes: {
    type: Array, // ThemeDTO[]
    required: true,
  },
});
</script>

<style scoped></style>
