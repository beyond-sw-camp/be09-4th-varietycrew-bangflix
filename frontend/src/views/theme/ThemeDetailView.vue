<template>
  <PageLoadingLayout v-if="!themeDetail" />
  <PageLayout
    v-else
    :title="`[테마] ${themeDetail.name}`"
    btn-role="ALL"
    btn-txt="나도 리뷰 작성할래요!"
    class="container-theme-detail"
    @click-btn="goReviewForm(themeDetail.themeCode)"
  >
    <!-- 매장 -->
    <Button
      :label="themeDetail.storeName"
      text
      icon="pi pi-home"
      class="mb-s"
      @click="clickStore(themeDetail.storeCode)"
    />

    <div class="flex-row gap-20 mb-l items-start">
      <div>
        <!-- 테마 이미지 -->
        <Image :src="themeDetail.posterImage" image-style="width: 440px; flex-shrink: 0; margin-bottom: 16px;" />

        <!-- 좋아요/스크랩 -->
        <div class="flex-row gap-10">
          <Button
            label="좋아요"
            :icon="`pi ${userLiked ? 'pi-heart-fill' : 'pi-heart'}`"
            outlined
            :badge="themeDetail.likeCount.toString()"
            @click="clickLike(themeDetail.themeCode)"
          />
          <Button
            label="스크랩"
            :icon="`pi ${userBookmarked ? 'pi-bookmark-fill' : 'pi-bookmark'}`"
            outlined
            :badge="themeDetail.scrapCount.toString()"
            @click="clickScrap(themeDetail.themeCode)"
          />
        </div>
      </div>

      <!-- 테마 상세 정보 -->
      <Panel header="" class="grow-1">
        <p class="mb-xl">
          {{ themeDetail.story }}
        </p>
        <p>난이도: {{ themeDetail.level }}</p>
        <p>1인당 가격: {{ themeDetail.price.toLocaleString() }}원</p>
        <p>제한시간: {{ themeDetail.timeLimit }}분</p>
      </Panel>
    </div>

    <!-- 리뷰 통계 -->
    <Fieldset legend="리뷰 통계" class="area-review-statistics">
      <div v-if="!reviewStatistics">아직 리뷰가 없어요! 리뷰를 작성해주세요</div>
      <div v-else>
        <div class="top">
          <div>
            <h3 class="mb-s">평균 만족도</h3>
            <h1>{{ reviewStatistics.avgTotalScore }} / 5</h1>
          </div>
          <Divider layout="vertical" />
          <div>
            <ReviewStatisticsItem :data="totalScoreStatisticsData" />
          </div>
        </div>

        <Divider />

        <div class="bottom">
          <ReviewStatisticsItem label="문제구성" :data="quizQualityStatisticsData" />
          <ReviewStatisticsItem label="난이도" :data="levelStatisticsData" />
          <ReviewStatisticsItem label="공포도" :data="scaryStatisticsData" />
          <ReviewStatisticsItem label="활동성" :data="activityStatisticsData" />
          <ReviewStatisticsItem label="인테리어" :data="interiorStatisticsData" />
          <ReviewStatisticsItem label="개연성" :data="probabilityStatisticsData" />
        </div>
      </div>
    </Fieldset>

    <!-- 리뷰 -->
    <section>
      <div class="flex-row content-between mb-m">
        <div class="flex-row gap-10 items-end">
          <h3>참가자 리뷰</h3>
          <span>({{ reviews.length }})</span>
        </div>

        <Select
          v-model="selectedReviewSorting"
          :options="reviewSortingOptions"
          option-label="name"
          placeholder="정렬기준"
          checkmark
          :highlight-on-select="false"
        />
      </div>

      <!-- 리뷰 목록 -->
      <ReviewList :reviews="reviews" />
    </section>
  </PageLayout>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageLayout from '@/components/layouts/PageLayout.vue';
import Panel from 'primevue/panel';
import Divider from 'primevue/divider';
import Select from 'primevue/select';
import Button from 'primevue/button';
import {
  quizQualityOptions,
  levelOptions,
  interiorOptions,
  activityOptions,
  probabilityOptions,
  scaryOptions,
} from '@/utils/constants';
import ReviewStatisticsItem from '@/components/review/ReviewStatisticsItem.vue';
import ReviewList from '@/components/review/ReviewList.vue';
import { $api } from '@/services/api/api';
import PageLoadingLayout from '@/components/layouts/PageLoadingLayout.vue';
import Image from 'primevue/image';
import Fieldset from 'primevue/fieldset';

const router = useRouter();
const route = useRoute();
const { themeId } = route.params;

const themeDetail = ref(null);
const totalScoreStatisticsData = ref([
  { label: '1점', value: 'ONE', percent: 1 },
  { label: '2점', percent: 2 },
  { label: '3점', percent: 10 },
  { label: '4점', percent: 25 },
  { label: '5점', percent: 62 },
]);
const quizQualityStatisticsData = ref([]);
const levelStatisticsData = ref([]);
const scaryStatisticsData = ref([]);
const activityStatisticsData = ref([]);
const interiorStatisticsData = ref([]);
const probabilityStatisticsData = ref([]);
const selectedReviewSorting = ref({ name: '최신 순', value: '' });
const reviewSortingOptions = ref([
  { name: '최신 순', value: '' },
  { name: '만족도 높은 순', value: 'highScore' },
  { name: '만족도 낮은 순', value: 'lowScore' },
]);
const reviews = ref([]);
const userLiked = ref(true);
const userBookmarked = ref(false);
const reviewStatistics = ref(null);
const currenReviewPage = 0;

const totalScoreOptions = [
  { label: '1점', value: 'ONE' },
  { label: '2점', value: 'TWO' },
  { label: '3점', value: 'THREE' },
  { label: '4점', value: 'FOUR' },
  { label: '5점', value: 'FIVE' },
];

const goReviewForm = themeCode => {
  router.push(`/theme/${themeCode}/create-review`);
};

const clickLike = themeCode => {
  $api.theme.setReactions('like', true, themeCode).then(() => {});
};

const clickScrap = themeCode => {
  $api.theme.setReactions('scrap', true, themeCode).then(() => {});
};

const clickStore = storeCode => {
  router.push(`/store/detail/${storeCode}`);
};

const mappingStatistics = (options, one, two, three, four, five) => {
  return options.map(e => {
    let percent = 0;

    if (e.value === 'ONE') {
      percent = one;
    } else if (e.value === 'TWO') {
      percent = two;
    } else if (e.value === 'THREE') {
      percent = three;
    } else if (e.value === 'FOUR') {
      percent = four;
    } else if (e.value === 'FIVE') {
      percent = five;
    }
    return { ...e, percent };
  });
};

// 테마코드로 조회
watchEffect(() => {
  if (!themeId) return;

  // 테마 정보 조회
  $api.theme.getTheme(themeId).then(theme => {
    themeDetail.value = theme;
  });

  // 리뷰 통계 조회
  $api.review.getStatisticsByThemeCode(themeId).then(statistics => {
    reviewStatistics.value = statistics;

    const {
      oneCompositionPercent,
      twoCompositionPercent,
      threeCompositionPercent,
      fourCompositionPercent,
      fiveCompositionPercent,

      oneLevelPercent,
      twoLevelPercent,
      threeLevelPercent,
      fourLevelPercent,
      fiveLevelPercent,

      oneHorrorLevelPercent,
      twoHorrorLevelPercent,
      threeHorrorLevelPercent,
      fourHorrorLevelPercent,
      fiveHorrorLevelPercent,

      oneActivePercent,
      twoActivePercent,
      threeActivePercent,
      fourActivePercent,
      fiveActivePercent,

      oneInteriorPercent,
      twoInteriorPercent,
      threeInteriorPercent,
      fourInteriorPercent,
      fiveInteriorPercent,

      oneProbabilityPercent,
      twoProbabilityPercent,
      threeProbabilityPercent,
      fourProbabilityPercent,
      fiveProbabilityPercent,

      oneScorePercent,
      twoScorePercent,
      threeScorePercent,
      fourScorePercent,
      fiveScorePercent,
    } = statistics;

    // 문제구성
    quizQualityStatisticsData.value = mappingStatistics(
      quizQualityOptions,
      oneCompositionPercent,
      twoCompositionPercent,
      threeCompositionPercent,
      fourCompositionPercent,
      fiveCompositionPercent,
    );

    // 난이도
    levelStatisticsData.value = mappingStatistics(
      levelOptions,
      oneLevelPercent,
      twoLevelPercent,
      threeLevelPercent,
      fourLevelPercent,
      fiveLevelPercent,
    );

    // 공포도
    scaryStatisticsData.value = mappingStatistics(
      scaryOptions,
      oneHorrorLevelPercent,
      twoHorrorLevelPercent,
      threeHorrorLevelPercent,
      fourHorrorLevelPercent,
      fiveHorrorLevelPercent,
    );

    // 활동성
    activityStatisticsData.value = mappingStatistics(
      activityOptions,
      oneActivePercent,
      twoActivePercent,
      threeActivePercent,
      fourActivePercent,
      fiveActivePercent,
    );

    // 인테리어
    interiorStatisticsData.value = mappingStatistics(
      interiorOptions,
      oneInteriorPercent,
      twoInteriorPercent,
      threeInteriorPercent,
      fourInteriorPercent,
      fiveInteriorPercent,
    );

    // 개연성
    probabilityStatisticsData.value = mappingStatistics(
      probabilityOptions,
      oneProbabilityPercent,
      twoProbabilityPercent,
      threeProbabilityPercent,
      fourProbabilityPercent,
      fiveProbabilityPercent,
    );

    totalScoreStatisticsData.value = mappingStatistics(
      totalScoreOptions,
      oneScorePercent,
      twoScorePercent,
      threeScorePercent,
      fourScorePercent,
      fiveScorePercent,
    );
  });

  // 리뷰 목록 조회
  $api.review.getReviewsByThemeCode(themeId).then(themeReviews => {
    reviews.value = themeReviews;
  });
});

watch(selectedReviewSorting, newVal => {
  // 리뷰 목록 조회
  $api.review.getReviewsByThemeCode(themeId, currenReviewPage, newVal.value).then(themeReviews => {
    reviews.value = themeReviews;
  });
});
</script>

<style scoped>
.container-theme-detail {
  .area-review-statistics {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-bottom: 32px;

    .top {
      display: grid;
      grid-template-columns: 0.7fr 0.2fr 2fr;
    }

    .bottom {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
}
</style>
