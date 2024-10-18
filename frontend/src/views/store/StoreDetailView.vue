<template>
  <PageLayout :title="storeName" class="store-detail-view">
    <!-- 매장 정보 -->
    <div class="mb-xl">
      <AppTypography type="title3" class="mb-s">매장 정보</AppTypography>
      <div class="mb-s">
        <div class="flex-row gap-10 items-center">
          <i class="pi pi-map-marker"></i>
          <AppTypography>주소</AppTypography>
        </div>

        <div class="flex-row gap-10 items-center">
          <AppTypography color="darkgray">{{ storeAddress }}</AppTypography>
          <Button
            v-if="!copySuccess"
            icon="pi pi-copy"
            aria-label="복사하기"
            outlined
            size="small"
            @click="clickCopyAddress"
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
          <Button icon="pi pi-external-link" aria-label="외부링크 이동" outlined size="small" @click="clickUrl" />
        </div>
      </div>
    </div>

    <!-- 매장의 베스트 리뷰 -->
    <div class="mb-l">
      <AppTypography type="title3" class="mb-s">베스트 리뷰</AppTypography>
      <ReviewItem v-if="bestReview" :review="bestReview" />
    </div>

    <!-- 매장의 테마 목록 -->
    <div>
      <AppTypography type="title3" class="mb-s">테마 목록</AppTypography>
      <div class="list-store-theme">
        <ThemeCard v-for="theme in themeList" :key="theme.id" :theme="theme" next-page="THEME" />
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import AppTypography from '@/components/AppTypography.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import ReviewItem from '@/components/review/ReviewItem.vue';
import ThemeCard from '@/components/cards/ThemeCard.vue';

const storeName = ref('');
const storeAddress = ref('');
const storeUrl = ref('');
const themeList = ref([]);
const bestReview = ref();
const copySuccess = ref(false);
let timeout = null;

const clickCopyAddress = () => {
  navigator.clipboard.writeText(storeAddress.value);

  copySuccess.value = true;
  timeout = setTimeout(() => {
    copySuccess.value = false;
  }, 2000);
};

const clickUrl = () => {
  window.open(storeUrl.value, '_blank');
};

onMounted(() => {
  storeName.value = '방플릭스 신촌점';
  storeAddress.value = '서울 강남구 강남대로98길 25 스타애비뉴 1층 황금열쇠 강남타임스퀘어점';
  storeUrl.value = 'http://xn--jj0b998aq3cptw.com/layout/res/home.php?go=main';
  themeList.value = [
    {
      id: 0,
      profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
      themeId: 1,
      theme: '위험한 동굴1',
      store: '그레이트 이스케이프 신촌점',
      location: '서울 동작구 여의대방로 188-11',
      reaction: {
        reviewCount: 1,
        like: {
          liked: false,
          count: 2,
        },
        scrap: {
          scraped: true,
          count: 3,
        },
      },
    },
    {
      id: 1,
      profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
      themeId: 2,
      theme: '위험한 동굴2',
      store: '그레이트 이스케이프 신촌점',
      location: '서울 동작구 여의대방로 188-12',
      reaction: {
        reviewCount: 4,
        like: {
          liked: false,
          count: 5,
        },
        scrap: {
          scraped: false,
          count: 6,
        },
      },
    },
    {
      id: 2,
      profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
      themeId: 3,
      theme: '위험한 동굴3',
      store: '그레이트 이스케이프 신촌점',
      location: '서울 동작구 여의대방로 188-13',
      reaction: {
        reviewCount: 7,
        like: {
          liked: true,
          count: 8,
        },
        scrap: {
          scraped: true,
          count: 9,
        },
      },
    },
    {
      id: 3,
      profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
      themeId: 4,
      theme: '위험한 동굴4',
      store: '그레이트 이스케이프 신촌점',
      location: '서울 동작구 여의대방로 188-14',
      reaction: {
        reviewCount: 10,
        like: {
          liked: false,
          count: 11,
        },
        scrap: {
          scraped: true,
          count: 12,
        },
      },
    },
    {
      id: 4,
      profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
      themeId: 5,
      theme: '위험한 동굴5',
      store: '그레이트 이스케이프 신촌점1',
      location: '서울 동작구 여의대방로 188-142',
      reaction: {
        reviewCount: 110,
        like: {
          liked: false,
          count: 131,
        },
        scrap: {
          scraped: true,
          count: 142,
        },
      },
    },
  ];
  bestReview.value = {
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
  };
});

onBeforeUnmount(() => {
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
