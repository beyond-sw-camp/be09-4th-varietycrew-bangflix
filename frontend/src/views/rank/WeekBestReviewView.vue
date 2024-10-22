<template>
  <AppTypography type="caption" color="darkgray" class="mb-xs">기준일자 선택</AppTypography>
  <SelectButton v-model="selectedDate" :options="dateOptions" aria-labelledby="장르" class="mb-l" />
  <ReviewList :reviews="reviews" show-ranking show-theme />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { $api } from '@/services/api/api';
import ReviewList from '@/components/review/ReviewList.vue';

const reviews = ref([]);
const selectedDate = ref('');
const dateOptions = ref([]);

// 선택된 기준일자가 바뀔 때마다 랭킹 목록 update
watch(selectedDate, newVal => {
  $api.ranking.getReviewRankingByDate(newVal).then(foundReviews => {
    if (!foundReviews) return;
    reviews.value = foundReviews;
  });
});

onMounted(() => {
  // 랭킹 기준일자 목록 가져오기
  $api.ranking.getRakingWeeks().then(result => {
    if (!result) return;

    const foundDates = result.reviewRankingDates;
    // const foundDates = ['2024-08-10', '2024-09-10'];
    dateOptions.value = foundDates;
    if (foundDates.length > 0) {
      // 가장 마지막에 있는 일자를 default 기준일자로 설정
      selectedDate.value = foundDates[foundDates.length - 1];
    }
  });
});
</script>

<style scoped></style>
