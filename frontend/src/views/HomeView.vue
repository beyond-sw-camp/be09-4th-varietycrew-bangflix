<template>
  <div class="home-view">
    <div class="area-title">
      <AppTypography type="title2">방플릭스!</AppTypography>
      <AppTypography type="title3">방탈출 테마를 한 눈에</AppTypography>
    </div>
    <HomeViewThemeList section-title="이번 주 TOP5 테마" :themes="weekThemeList" show-order />
    <section class="section-theme-recommend">
      <AppTypography type="title3">매번 어떤 방탈출을 할지 고민한다면?</AppTypography>
      <AppTypography type="title2">내 취향 방탈출을 알아보아요</AppTypography>
      <Button
        label="방탈출 테마 추천 받기"
        as="router-link"
        to="/theme/for-you"
        icon="pi pi-arrow-right"
        icon-pos="right"
      />
    </section>
    <HomeViewThemeList
      v-for="genre in genres"
      :key="genre"
      :section-title="`장르: ${genre.name}`"
      :genre-name="genre.name"
    />
  </div>
</template>

<script setup>
import HomeViewThemeList from '@/components/HomeViewThemeList.vue';
import { $api } from '@/services/api/api';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import AppTypography from '@/components/AppTypography.vue';

const userStore = useUserStore();

const weekThemeList = ref([]);
const genres = ref([]);

// 메인 페이지 데이터 조회
onMounted(() => {
  // 이번주 테마 목록
  $api.theme.getWeekThemes().then(weekThemes => {
    weekThemeList.value = weekThemes;
  });

  // 장르 목록 조회
  $api.theme.getGenres().then(foundGenres => {
    // 장르 5개만 랜덤으로 뽑기
    if (foundGenres.length <= 5) {
      genres.value = foundGenres;
      return;
    }

    genres.value = foundGenres.slice(0, 5);
  });
});
</script>

<style scoped>
.home-view {
  padding: 48px 0;

  .area-title {
    padding: 0 20px 20px 20px;
  }

  .section-theme-recommend {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
}
</style>
