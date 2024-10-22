<template>
  <PageLayout title="방탈출 테마 추천" class="theme-for-you">
    <!-- 추천된 테마 목록 -->
    <template v-if="recommendedSuccess">
      <div class="area-recommended">
        <AppTypography type="title3" class="mb-l">회원님이 좋아하실만한 방탈출 테마를 골라봤어요!</AppTypography>
        <div class="list-theme">
          <div v-for="theme in recommendedThemes" :key="theme.themeCode">
            <ThemeCard :theme="theme" :show-footer="false" class="mb-s" />
            <Button label="방탈출 구경하기" fluid as="router-link" :to="`/theme/detail/${theme.themeCode}`" />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <AppTypography type="title3">회원님에게 딱 맞는 방탈출 테마 추천해드려요!</AppTypography>
      <AppTypography color="darkgray" class="mb-xl">마음에 드는 포스터를 골라주세요</AppTypography>
      <div class="list-theme">
        <div v-for="theme in themes" :key="theme.themeCode">
          <ThemeCard :theme="theme" :show-footer="false" class="mb-s" />
          <Button
            :label="selectedThemeCodes.includes(theme.themeCode) ? '선택 완료' : '선택'"
            fluid
            :icon="selectedThemeCodes.includes(theme.themeCode) ? 'pi pi-check' : 'pi'"
            :severity="selectedThemeCodes.includes(theme.themeCode) ? 'success' : 'secondary'"
            @click="clickTheme(theme.themeCode)"
          />
        </div>
      </div>

      <div class="area-btn">
        <Button
          label="새로고침"
          severity="secondary"
          icon="pi pi-refresh"
          :loading="isReloading"
          @click="reloadThemes"
        />
        <div class="flex-col items-center">
          <Button
            label="내 취향 방탈출 추천 받기"
            :disabled="selectedThemeCodes.length === 0"
            @click="clickRecommend"
          />
          <AppTypography type="caption" color="darkgray" class="mt-xs">(최대 {{ maxCnt }}개 선택 가능)</AppTypography>
          <AppTypography type="caption" color="darkgray" class="mt-xs"
            >많이 고를 수록 더 정확히 추천받을 수 있어요!</AppTypography
          >
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import AppTypography from '@/components/AppTypography.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import { $api } from '@/services/api/api';
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import ThemeCard from '@/components/cards/ThemeCard.vue';
import useToastMessage from '@/hooks/useToastMessage';

const { showError } = useToastMessage();

const themes = ref([]);
const selectedThemeCodes = ref([]);
const isReloading = ref(false);
const recommendedThemes = ref([]);
const recommendedSuccess = ref(false);

const maxCnt = 3;
let currentPage = 0;
let genres = [];

const clickTheme = themeCode => {
  if (selectedThemeCodes.value.includes(themeCode)) {
    // 이미 들어있으면 삭제하기
    selectedThemeCodes.value = selectedThemeCodes.value.filter(e => e !== themeCode);
    return;
  }

  if (selectedThemeCodes.value.length === 3) {
    // 이미 가득 차있다면 마지막 선택한 거 제외하고 추가하기
    selectedThemeCodes.value.pop();
  }

  selectedThemeCodes.value.push(themeCode);
};

const clickRecommend = () => {
  $api.theme.getRecommend(selectedThemeCodes.value).then(foundThemes => {
    recommendedThemes.value = foundThemes;
    recommendedSuccess.value = true;
  });
};

const getThemes = genres => {
  if (genres.length < 1) {
    showError('더 이상 새로고침 할 수 없어요 ㅠㅠ');
    return;
  }

  isReloading.value = true;
  $api.theme.searchThemes({ genres: genres.map(e => e.name) }).then(themeList => {
    themes.value = themeList;
    isReloading.value = false;
  });
};

const getTargetGenres = () => {
  let targetGenres = []; // 테마 검색 시 사용할 장르
  if (genres.length >= 3) {
    targetGenres.push(genres.pop());
    targetGenres.push(genres.pop());
    targetGenres.push(genres.pop());
  } else {
    targetGenres = [...genres];
    genres = [];
  }

  return targetGenres;
};

const reloadThemes = () => {
  // 다른 장르 가져오기
  const targetGenres = getTargetGenres();
  getThemes(targetGenres);
};

onMounted(async () => {
  // 1. 장르 먼저 호출
  genres = await $api.theme.getGenres();
  const targetGenres = getTargetGenres();

  getThemes(targetGenres);
});
</script>

<style scoped>
.theme-for-you {
  .list-theme {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 48px 16px;
  }

  .area-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 48px;

    & > :first-child {
      margin-right: 48px;
    }
  }

  .area-recommended {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48px;
  }
}
</style>
