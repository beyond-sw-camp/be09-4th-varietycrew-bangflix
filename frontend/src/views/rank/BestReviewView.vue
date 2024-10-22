<template>
  <ReviewList :reviews="reviews" show-ranking show-theme />
</template>

<script setup>
import ReviewList from '@/components/review/ReviewList.vue';
import { $api } from '@/services/api/api';
import { onMounted, ref } from 'vue';

const reviews = ref([]);

onMounted(() => {
  $api.ranking.getReviewRanking().then(foundReviews => {
    reviews.value = foundReviews;
  });
});
</script>

<style scoped></style>
