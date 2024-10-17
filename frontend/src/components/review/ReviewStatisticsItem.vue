<template>
  <div>
    <Chip v-if="props.label" :label="props.label" class="mb-xs" />
    <ReviewStatisticsBar v-for="item in props.data" :key="item.label" :label="item.label" :percent="item.percent" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Chip from 'primevue/chip';
import ReviewStatisticsBar from './ReviewStatisticsBar.vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  data: {
    type: Array, // [{ label: string, value: 'ONE', percent: 10 }, ...]
    required: true,
  },
});
</script>

<style scoped></style>
