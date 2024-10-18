<template>
  <PageLayout title="방플릭스!">
    <HomeViewThemeList section-title="이번 주 TOP5 테마를 확인해 보세요" :themes="[]" />
    <HomeViewThemeList :section-title="`${userStore.nickname}님의 취향과 일치하는 테마예요`" :themes="[]" />
    <HomeViewThemeList section-title="미스터리" :themes="[]" />
    <HomeViewThemeList section-title="범죄" :themes="[]" />
  </PageLayout>
</template>

<script setup>
import HomeViewThemeList from '@/components/HomeViewThemeList.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import { $api } from '@/services/api/api';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore();

// 메인 페이지 데이터 조회
onMounted(async () => {
  // 1. 전체 장르 목록 조회
  const genres = await $api.theme.get('genres');
});
</script>

<style scoped></style>
