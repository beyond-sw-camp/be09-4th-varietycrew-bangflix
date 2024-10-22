<template>
  <PageLoadingLayout v-if="!storeDetail" />
  <PageLayout v-else :title="storeDetail.name" class="store-detail-view">
    <!-- 매장 정보 -->
    <div class="mb-xl">
      <AppTypography type="title3" class="mb-s">매장 정보</AppTypography>
      <div class="mb-s">
        <div class="flex-row gap-10 items-center">
          <i class="pi pi-map-marker"></i>
          <AppTypography>주소</AppTypography>
        </div>

        <div class="flex-row gap-10 items-center">
          <AppTypography color="darkgray">{{ storeDetail.address }}</AppTypography>
          <Button
            v-if="!copySuccess"
            icon="pi pi-copy"
            aria-label="복사하기"
            outlined
            size="small"
            @click="clickCopyAddress(storeDetail.address)"
          />
          <Button v-else outlined size="small" icon="pi pi-check" severity="success" label="복사되었어요!" />
        </div>
      </div>

      <div>
        <div class="flex-row gap-10 items-center">
          <i class="pi pi-link"></i>
          <AppTypography>홈페이지</AppTypography>
        </div>

        <div class="flex-row gap-10 items-center">
          <AppTypography color="darkgray">홈페이지 방문하기</AppTypography>
          <Button
            icon="pi pi-external-link"
            aria-label="외부링크 이동"
            outlined
            size="small"
            @click="clickUrl(storeDetail.pageUrl)"
          />
        </div>
      </div>
    </div>

    <!-- 매장의 베스트 리뷰 -->
    <div class="mb-l">
      <AppTypography type="title3" class="mb-s">베스트 리뷰</AppTypography>
      <ReviewItem v-if="bestReview" :review="bestReview" show-theme />
      <AppTypography v-else>아직 베스트 리뷰가 없어요!</AppTypography>
    </div>

    <!-- 매장의 테마 목록 -->
    <div>
      <AppTypography type="title3" class="mb-s">테마 목록</AppTypography>
      <div class="list-store-theme">
        <ThemeCard v-for="theme in themeList" :key="theme.themeCode" :theme="theme" next-page="THEME" />
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { onBeforeUnmount, ref, watchEffect } from 'vue';
import AppTypography from '@/components/AppTypography.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import ReviewItem from '@/components/review/ReviewItem.vue';
import ThemeCard from '@/components/cards/ThemeCard.vue';
import { $api } from '@/services/api/api';
import { useRoute } from 'vue-router';
import PageLoadingLayout from '@/components/layouts/PageLoadingLayout.vue';

const route = useRoute();
const storeId = route.params.storeId;

const storeDetail = ref(null);
const bestReview = ref(null);
const themeList = ref([]);
const copySuccess = ref(false);

let timeout = null;

const clickCopyAddress = address => {
  navigator.clipboard.writeText(address);

  copySuccess.value = true;
  timeout = setTimeout(() => {
    copySuccess.value = false;
  }, 2000);
};

const clickUrl = pageUrl => {
  window.open(pageUrl, '_blank');
};

watchEffect(() => {
  if (!storeId) return;

  // 매장 정보
  $api.store.getStoreByStoreCode(storeId).then(foundStore => {
    storeDetail.value = foundStore;
  });

  // 베스트 리뷰
  $api.store.getStoreBestReview(storeId).then(foundReview => {
    if (!foundReview) return;
    bestReview.value = foundReview;
  });

  // 매장의 테마 목록
  $api.theme.getStoreThemes(storeId).then(foundThemes => {
    themeList.value = foundThemes;
  });
});

onBeforeUnmount(() => {
  // 타임아웃 정리
  clearTimeout(timeout);
});
</script>

<style scoped>
.store-detail-view {
  .list-store-theme {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-items: center;
  }
}
</style>
