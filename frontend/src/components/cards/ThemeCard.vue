<template>
  <div class="card-theme">
    <template v-if="userStore.isLoggined">
      <!-- <div v-if="props.theme.reaction.scrap.scraped" class="banner-scraped">스크랩 됨</div>
        <div v-else class="banner-unscraped" /> -->
    </template>

    <Card>
      <template #header>
        <img class="theme-tumb" :src="props.theme.posterImage" alt="테마 프로필 이미지" />
      </template>
      <template #content>
        <div class="content-container">
          <div class="mb-m">
            <h3 class="theme mb-xxs">{{ props.theme.name }}</h3>
            <div class="mb-s">{{ props.theme.storeName }}</div>
            <AppTypography type="caption" color="darkgray">리뷰 {{ props.theme.reviewCount }}</AppTypography>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer mb-xs">
          <Button
            icon="pi pi-heart"
            label="좋아요"
            size="small"
            outlined
            :badge="props.theme.likeCount.toString()"
            @click="clickLike"
          />
          <Button
            icon="pi pi-bookmark"
            label="스크랩"
            size="small"
            outlined
            :badge="props.theme.scrapCount.toString()"
            @click="clickScrap"
          />
        </div>
        <Button label="테마 상세보기" size="small" fluid @click="clickCard(props.theme.themeCode)" />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import Card from 'primevue/card';
import ReviewIcon from '../common/reaction/ReviewIcon.vue';
import Like from '../common/reaction/Like.vue';
import Scrap from '../common/reaction/Scrap.vue';
import router from '@/router/routes';
import { useUserStore } from '@/stores/user';
import Button from 'primevue/button';
import AppTypography from '../AppTypography.vue';
import { $api } from '@/services/api/api';

const userStore = useUserStore();

const props = defineProps({
  theme: {
    type: Object, // theme: ThemeDTO
    required: true,
  },

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
};

const clickLike = () => {
  $api.theme.setReactions('like', true, props.theme.themeCode).then(() => {});
};

const clickScrap = () => {
  $api.theme.setReactions('scrap', true, props.theme.themeCode).then(() => {});
};
</script>

<style scoped>
.card-theme {
  .p-card {
    position: relative; /* 띠를 절대 위치로 배치하기 위한 부모 설정 */
    /* width: 245px; */
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  .theme-tumb {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .theme {
    font-weight: bolder;
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

  .footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
