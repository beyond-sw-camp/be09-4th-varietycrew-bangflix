<template>
  <Card>
    <template #content>
      <template v-if="userStore.isLoggined">
        <div v-if="props.card.reaction.scrap.scraped" class="banner-scraped">스크랩 됨</div>
        <div v-else class="banner-unscraped" />
      </template>
      <div class="content-container">
        <img
          class="theme-tumb"
          :src="props.card.profileImage"
          alt="테마 프로필 이미지"
          @click="clickCard(props.card.themeId)"
        />
        <h3 class="theme" @click="clickCard(props.card.themeId)">{{ props.card.theme }}</h3>
        <div class="store">{{ props.card.store }}</div>
        <div class="location">{{ props.card.location }}</div>
        <div class="reaction-container">
          <ReviewIcon :count="props.card.reaction.reviewCount" />
          <Like :like="props.card.reaction.like" />
          <Scrap :scrap="props.card.reaction.scrap" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import Card from 'primevue/card';
import ReviewIcon from '../common/reaction/ReviewIcon.vue';
import Like from '../common/reaction/Like.vue';
import Scrap from '../common/reaction/Scrap.vue';
import router from '@/router/routes';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  // card object
  // {
  //   id: 2,
  //   profileImage: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
  //   themeId: 0,
  //   theme: '위험한 동굴3',
  //   store: '그레이트 이스케이프 신촌점',
  //   location: '서울 동작구 여의대방로 188-13',
  //   reaction: {
  //     reviewCount: 7,
  //     like: {
  //       liked: false,
  //       count: 8,
  //     },
  //     scrap: {
  //       scraped: true,
  //       count: 9,
  //     },
  //   },
  // },
  nextPage: {
    type: String, // 'EVENT', 'THEME'
    required: true,
  },
});

const clickCard = id => {
  let nextPageUrl = '';
  if (props.nextPage === 'EVENT') {
    nextPageUrl = `/event/detail/${id}`;
  } else if (props.nextPage === 'THEME') {
    nextPageUrl = `/theme/detail/${id}`;
  }

  router.push(nextPageUrl);

  console.log(id);
};
</script>

<style scoped>
.p-card {
  position: relative; /* 띠를 절대 위치로 배치하기 위한 부모 설정 */
  width: 245px;
}

.content-container {
  display: flex;
  flex-direction: column;
}

.theme-tumb {
  margin: 0 auto;
  /* align-self: center; */
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.theme {
  margin-top: 20px;
  font-weight: bolder;
  cursor: pointer;
}
.store {
  margin-top: 10px;
}
.location {
  margin-top: 10px;
}

.reaction-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

/* 스크랩 여부에 따른 띠 스타일 */
.banner-unscraped {
  position: absolute;
  top: 0;
  right: 0;
  background-color: white; /* 띠 배경색 */
  color: #fff; /* 텍스트 색상 */
  padding: 5px 10px;
  font-weight: bold;
  font-size: 12px;
  border-bottom-left-radius: 8px;
}

/* 스크랩 여부에 따른 띠 스타일 */
.banner-scraped {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffcc00; /* 띠 배경색 */
  color: #fff; /* 텍스트 색상 */
  padding: 5px 10px;
  font-weight: bold;
  font-size: 12px;
  border-bottom-left-radius: 8px;
}
</style>
