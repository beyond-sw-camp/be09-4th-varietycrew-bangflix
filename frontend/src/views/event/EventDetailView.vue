<template>
  <DetailPageLayout>
    <div class="detail-container">
      <div class="profile-container">
        <h1>{{ event.category }}</h1>
        <EventCard :card="event.theme" next-page="THEME" />
      </div>
      <div class="content-container">
        <Card class="content-aria">
          <template #content>
            <div class="inner-content">
              <div class="content">{{ event.content }}</div>
              <div class="content-image-container">
                <template v-if="event.images">
                  <template v-for="(image, index) in event.images" :key="index">
                    <img :src="image" alt="이미지" class="content-image" />
                  </template>
                </template>
              </div>
            </div>
          </template>
        </Card>
        <div class="content-footer-container">
          <div class="created-at">2024.10.01 13:50 등록</div>
          <div class="writer">홍길동 관리자</div>
        </div>
      </div>
    </div>
  </DetailPageLayout>
</template>

<script setup>
import DetailPageLayout from '@/components/layouts/DetailPageLayout.vue';
import EventCard from '@/components/cards/EventCard.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const event = ref({
  id: route.params.eventId,
  category: '할인 테마',
  theme: {
    id: 2,
    profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
    themeId: 0,
    theme: '위험한 동굴3',
    store: '그레이트 이스케이프 신촌점',
    location: '서울 동작구 여의대방로 188-13',
    reaction: {
      reviewCount: 7,
      like: {
        liked: false,
        count: 8,
      },
      scrap: {
        scraped: true,
        count: 9,
      },
    },
  },
  content:
    '안녕하세요. 방플릭스입니다. \n방탈출 마감 할인 정보 공유드립니다. \n\n1~2인 20,000원 \n3~6인 17,000원에 만나보실 수 있습니다.',
  images: [
    'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
    'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
    'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
  ],
});

onMounted(() => {});
</script>

<style scoped>
.detail-container {
  display: flex;
  margin-top: 50px;
}

h1 {
  margin-bottom: 30px;
}

.content-container {
  margin-left: 30px;
  width: 100%;
  height: 400px;
}

.content-aria {
  height: 600px;
}

.inner-content {
  display: flex;
  flex-direction: column;
}

/* content-image */
.content-image-container {
  margin-top: 50px;
}
.content-image {
  width: 100px;
  height: 100px;
  margin-inline: 10px;
}

.content-footer-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
