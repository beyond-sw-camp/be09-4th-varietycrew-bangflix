<template>
  <PageLayout title="이벤트" btn-txt="글 작성" btn-role="ADMIN" @click-btn="goEventForm">
    <h3>할인 테마</h3>
    <div class="sub-title">테마 별 할인 정보를 제공합니다. 지금이 제일 저렴할 때!</div>
    <template v-if="cards.length > 0">
      <div class="event-card-container">
        <template v-for="(card, id) in cards" :key="id">
          <ThemeCard :theme="card" next-page="EVENT" />
        </template>
      </div>
    </template>
    <template v-else> 이벤트가 존재하지 않습니다. </template>
    <h3>신규 테마</h3>
    <div class="sub-title">새로운 방탈출 게임을 소개합니다.</div>
    <template v-if="cards.length > 0">
      <div class="event-card-container">
        <template v-for="(card, id) in cards" :key="id">
          <ThemeCard :theme="card" next-page="EVENT" />
        </template>
      </div>
    </template>
    <template v-else> 이벤트가 존재하지 않습니다. </template>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import ThemeCard from '@/components/cards/ThemeCard.vue';
import router from '@/router/routes';

const goEventForm = () => {
  router.push(`/event/form/`);
};

const cards = ref([
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
]);
</script>

<style scoped>
h3 {
  margin-top: 50px;
}
.sub-title {
  margin-top: 10px;
}
.event-card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.event-card {
  cursor: pointer;
}
</style>
