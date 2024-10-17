<template>
  <AppTypography type="caption" color="darkgray" class="mb-xs">기준일자 선택</AppTypography>
  <SelectButton v-model="selectedWeek" :options="weekOptions" aria-labelledby="장르" class="mb-l" />
  <div class="flex-col gap-20">
    <ReviewItem v-for="review in reviews" :key="review.id" :review="review" show-theme />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReviewItem from '@/components/review/ReviewItem.vue';

const reviews = ref([
  {
    reviewCode: 1,
    nickname: '홍길동',
    profileImageUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    createdAt: '2024.10.10 22:00',
    userGenres: '범죄, 공포, 스릴러',
    title: '여기 검은 조직은 진짜 미침',
    desc: '인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테리어가 진짜 내가 방탈출하는 사람이 된거같고 어쩌구 저쩌구 몰입도가 어쩌구 저쩌구 총쏘면 진짜 총 맞는게 단점이고 어쩌구 저쩌구인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테',
    images: [
      'https://primefaces.org/cdn/primevue/images/card-vue.jpg',
      'https://primefaces.org/cdn/primevue/images/card-vue.jpg',
    ],
    likeCnt: 100,
    totalScore: 5,
    time: 60,
    people: 2,
    level: 'ONE',
    quizQuality: 'TWO',
    scary: 'TWO',
    activity: 'THREE',
    interior: 'FIVE',
    probability: 'FIVE',
    rank: 1,
    theme: {
      id: 1,
      title: '검은방',
      storeName: '그레이트 이스케이프 신촌점',
    },
  },
  {
    reviewCode: 2,
    nickname: '프로방탈출러',
    profileImageUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    createdAt: '2024.10.10 22:00',
    userGenres: '범죄, 스릴러',
    title: '여기 검은 조직은 진짜 미침',
    desc: '인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테리어가 진짜 내가 방탈출하는 사람이 된거같고 어쩌구 저쩌구 몰입도가 어쩌구 저쩌구 총쏘면 진짜 총 맞는게 단점이고 어쩌구 저쩌구인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테',
    images: [],
    likeCnt: 10,
    totalScore: 4,
    time: 60,
    people: 2,
    level: 'ONE',
    quizQuality: 'TWO',
    scary: 'TWO',
    activity: 'THREE',
    interior: 'FIVE',
    probability: 'FIVE',
    rank: 2,
    theme: {
      id: 1,
      title: '검은방',
      storeName: '그레이트 이스케이프 신촌점',
    },
  },
  {
    reviewCode: 3,
    nickname: '프로방탈출러',
    profileImageUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    createdAt: '2024.10.10 22:00',
    userGenres: '범죄, 스릴러',
    title: '여기 검은 조직은 진짜 미침',
    desc: '인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테리어가 진짜 내가 방탈출하는 사람이 된거같고 어쩌구 저쩌구 몰입도가 어쩌구 저쩌구 총쏘면 진짜 총 맞는게 단점이고 어쩌구 저쩌구인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테',
    images: [],
    likeCnt: 10,
    totalScore: 4,
    time: 60,
    people: 2,
    level: 'ONE',
    quizQuality: 'TWO',
    scary: 'TWO',
    activity: 'THREE',
    interior: 'FIVE',
    probability: 'FIVE',
    rank: 3,
    theme: {
      id: 1,
      title: '검은방',
      storeName: '그레이트 이스케이프 신촌점',
    },
  },
  {
    reviewCode: 4,
    nickname: '프로방탈출러',
    profileImageUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    createdAt: '2024.10.10 22:00',
    userGenres: '범죄, 스릴러',
    title: '여기 검은 조직은 진짜 미침',
    desc: '인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테리어가 진짜 내가 방탈출하는 사람이 된거같고 어쩌구 저쩌구 몰입도가 어쩌구 저쩌구 총쏘면 진짜 총 맞는게 단점이고 어쩌구 저쩌구인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테',
    images: [],
    likeCnt: 10,
    totalScore: 4,
    time: 60,
    people: 2,
    level: 'ONE',
    quizQuality: 'TWO',
    scary: 'TWO',
    activity: 'THREE',
    interior: 'FIVE',
    probability: 'FIVE',
    theme: {
      id: 1,
      title: '검은방',
      storeName: '그레이트 이스케이프 신촌점',
    },
  },
  {
    reviewCode: 5,
    nickname: '프로방탈출러',
    profileImageUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    createdAt: '2024.10.10 22:00',
    userGenres: '범죄, 스릴러',
    title: '여기 검은 조직은 진짜 미침',
    desc: '인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테리어가 진짜 내가 방탈출하는 사람이 된거같고 어쩌구 저쩌구 몰입도가 어쩌구 저쩌구 총쏘면 진짜 총 맞는게 단점이고 어쩌구 저쩌구인생 어쩌구 저쩌구 리뷰 이벤트 해서 엠오유가 어쩌구 저쩌구 인테',
    images: [],
    likeCnt: 10,
    totalScore: 4,
    time: 60,
    people: 2,
    level: 'ONE',
    quizQuality: 'TWO',
    scary: 'TWO',
    activity: 'THREE',
    interior: 'FIVE',
    probability: 'FIVE',
    theme: {
      id: 1,
      title: '검은방',
      storeName: '그레이트 이스케이프 신촌점',
    },
  },
]);
const selectedWeek = ref('');
const weekOptions = ref(['2024-08-10', '2024-08-11', '2024-08-12', '2024-08-13', '2024-08-14']);
</script>

<style scoped></style>
