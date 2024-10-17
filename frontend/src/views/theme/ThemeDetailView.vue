<template>
  <PageLayout
    title="테마: 검은 조직"
    btn-role="ALL"
    btn-txt="나도 리뷰 작성할래요!"
    class="container-theme-detail"
    @click-btn="goReviewForm"
  >
    <!-- 매장 -->
    <Button label="방플릭스 신촌점" text icon="pi pi-home" class="mb-s" @click="clickStore" />

    <div class="flex-row gap-20 mb-l items-start">
      <div>
        <!-- 테마 이미지 -->
        <Galleria
          :value="themeImages"
          :circular="true"
          container-style="width: 440px; flex-shrink: 0; margin-bottom: 16px;"
          :show-item-navigators="true"
        >
          <template #item="slotProps">
            <img :src="slotProps.item.src" :alt="slotProps.item.alt" style="width: 100%; display: block" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item.src" :alt="slotProps.item.alt" style="display: block; width: 100px" />
          </template>
        </Galleria>

        <!-- 좋아요/스크랩 -->
        <div class="flex-row gap-10">
          <Button
            label="좋아요"
            :icon="`pi ${userLiked ? 'pi-heart-fill' : 'pi-heart'}`"
            outlined
            badge="1,000"
            @click="toggleLike"
          />
          <Button
            label="스크랩"
            :icon="`pi ${userBookmarked ? 'pi-bookmark-fill' : 'pi-bookmark'}`"
            outlined
            badge="2,102"
            @click="toggleBookmark"
          />
        </div>
      </div>

      <div class="grow-1">
        <!-- 테마 상세 정보 -->
        <Panel header="테마 상세 정보" class="area-theme-desc mb-s">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Panel>

        <!-- 리뷰 통계 -->
        <Panel header="" class="area-review-statistics">
          <div class="top">
            <div>
              <h3 class="mb-s">평균 만족도</h3>
              <h1>4.11 / 5</h1>
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
        </Panel>
      </div>
    </div>

    <!-- 리뷰 -->
    <section>
      <div class="flex-row content-between mb-m">
        <div class="flex-row gap-10 items-end">
          <h3>참가자 리뷰</h3>
          <span>(123)</span>
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageLayout from '@/components/layouts/PageLayout.vue';
import Galleria from 'primevue/galleria';
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

const router = useRouter();
const route = useRoute();
const { themeId } = route.params;

const themeImages = ref([]);
const totalScoreStatisticsData = ref([
  { label: '1점', percent: 1 },
  { label: '2점', percent: 2 },
  { label: '3점', percent: 10 },
  { label: '4점', percent: 25 },
  { label: '5점', percent: 62 },
]);
const quizQualityStatisticsData = ref(quizQualityOptions.map((e, i) => ({ ...e, percent: 10 * (i + 1) })));
const levelStatisticsData = ref(levelOptions.map((e, i) => ({ ...e, percent: 10 * (i + 1) })));
const scaryStatisticsData = ref(scaryOptions.map((e, i) => ({ ...e, percent: 10 * (i + 1) })));
const activityStatisticsData = ref(activityOptions.map((e, i) => ({ ...e, percent: 10 * (i + 1) })));
const interiorStatisticsData = ref(interiorOptions.map((e, i) => ({ ...e, percent: 10 * (i + 1) })));
const probabilityStatisticsData = ref(probabilityOptions.map((e, i) => ({ ...e, percent: 10 * (i + 1) })));
const selectedReviewSorting = ref({ name: '최신 순', value: 'RECENT' });
const reviewSortingOptions = ref([
  { name: '최신 순', value: 'RECENT' },
  { name: '만족도 높은 순', value: 'SCORE_DESC' },
  { name: '만족도 낮은 순', value: 'SCORE_ASC' },
]);
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
  },
]);
const userLiked = ref(true);
const userBookmarked = ref(false);

const goReviewForm = () => {
  router.push(`/theme/${themeId}/create-review`);
};

const toggleLike = () => {
  userLiked.value = !userLiked.value;
};

const toggleBookmark = () => {
  userBookmarked.value = !userBookmarked.value;
};

const clickStore = () => {
  router.push('/store/detail/1');
};

onMounted(() => {
  themeImages.value = [
    { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg', alt: '' },
    { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg', alt: '' },
    { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg', alt: '' },
    { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg', alt: '' },
    { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg', alt: '' },
  ];

  userLiked.value = false;
  userBookmarked.value = true;
});
</script>

<style scoped>
.container-theme-detail {
  .area-review-statistics {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

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
