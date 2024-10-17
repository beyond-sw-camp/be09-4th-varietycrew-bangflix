<template>
  <div class="container-review-item">
    <!-- 메달 (in 베스트 리뷰) -->
    <Image
      v-if="props.review.rank === 1"
      src="/src/assets/icons/medal-gold.png"
      class="item-medal"
      image-style="width: 50px"
    />
    <Image
      v-else-if="props.review.rank === 2"
      src="/src/assets/icons/medal-silver.png"
      class="item-medal"
      image-style="width: 50px"
    />
    <Image
      v-else-if="props.review.rank === 3"
      src="/src/assets/icons/medal-bronze.png"
      class="item-medal"
      image-style="width: 50px"
    />

    <div class="area-review flex-row">
      <!-- 왼쪽 부분 -->
      <div class="grow-1">
        <div class="flex-row items-center content-between mb-m">
          <div class="flex-row gap-10 items-center">
            <Avatar :image="props.review.profileImageUrl" size="large" shape="circle" />
            <AppTypography type="body1" color="darkgray">{{ props.review.nickname }}</AppTypography>
            <AppTypography type="body2" color="gray">{{ props.review.createdAt }}</AppTypography>
            <AppTypography type="body2" color="gray">선호 장르: {{ props.review.userGenres }}</AppTypography>
          </div>

          <Button
            label="신고하기"
            outlined
            icon="pi pi-ban"
            size="small"
            severity="danger"
            @click="emit('clickReport', $event)"
          />
        </div>

        <div class="flex-row gap-10 mb-s">
          <AppTypography type="body1" class="grow-1">{{ props.review.desc }}</AppTypography>

          <!-- 이미지 있는 경우 표시 -->
          <img
            v-if="props.review.images.length > 0"
            :src="props.review.images[0]"
            width="150"
            height="150"
            @click="emit('clickImage', props.review.images)"
          />
        </div>

        <!-- 좋아요 버튼 -->
        <Like :like="{ liked: false, count: props.review.likeCnt }" />
      </div>

      <!-- 구분선 -->
      <Divider layout="vertical" />

      <!-- 상세 평가항목(오른쪽) -->
      <div class="shrink-0 flex-row gap-10 items-center">
        <div class="flex-col gap-5">
          <AppTypography type="body1" class="mb-xs">만족도</AppTypography>
          <AppTypography type="title1" class="mb-m">{{ props.review.totalScore }}.0</AppTypography>
          <ReviewTag label="참가인원" :value="props.review.people.toString()" type="PEOPLE" />
          <ReviewTag label="소요시간" :value="props.review.time.toString()" type="TIME" />
        </div>

        <div class="flex-col gap-5">
          <ReviewTag label="문제구성" :value="props.review.quizQuality" type="QUIZ" />
          <ReviewTag label="난이도" :value="props.review.level" type="LEVEL" />
          <ReviewTag label="공포도" :value="props.review.scary" type="SCARY" />
          <ReviewTag label="활동성" :value="props.review.activity" type="ACTIVITY" />
          <ReviewTag label="인테리어" :value="props.review.interior" type="INTERIOR" />
          <ReviewTag label="개연성" :value="props.review.probability" type="PROBABILITY" />
        </div>
      </div>
    </div>

    <!-- 테마/매장 정보 -->
    <div v-if="props.showTheme && props.review.theme" class="area-store">
      <div class="square"></div>
      <div class="store">
        <AppTypography class="mb-xs">테마: {{ props.review.theme.title }}</AppTypography>
        <AppTypography type="caption" color="darkgray">{{ props.review.theme.storeName }}</AppTypography>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Image from 'primevue/image';
import AppTypography from '@/components/AppTypography.vue';
import ReviewTag from '@/components/review/ReviewTag.vue';
import Like from '@/components/common/reaction/Like.vue';

const props = defineProps({
  review: {
    type: Object,
    /* 
    {
        reviewCode: 1,
        nickname: "홍길동",
        profileImageUrl: "http://",
        createdAt: "2024.10.10 22:00",
        userGenres: "범죄, 공포, 스릴러",
        title: "리뷰 제목",
        desc: "리뷰 내용",
        images: [
            "http://image.url",
            "http://image.url"
        ],
        likeCnt: 10,
        totalScore: 5,
        time: 70,
        people: 2,
        level: 'ONE',
        quizQuality: 'TWO',
        scary: 'TWO',
        activity: 'THREE',
        interior: 'FIVE',
        probability: 'FIVE'
    }
     */
    required: true,
  },
  showTheme: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['clickImage', 'clickReport']);
</script>

<style scoped>
.container-review-item {
  position: relative;

  .area-review {
    background-color: white;
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    padding: 20px;

    img {
      object-fit: cover;
    }
  }

  .item-medal {
    position: absolute;
    top: -10px;
    left: -25px;
  }

  .area-store {
    padding: 16px;
    display: flex;
    align-items: flex-start;

    .square {
      width: 20px;
      height: 20px;
      border-left: 1px solid #b3b3b3;
      border-bottom: 1px solid #b3b3b3;
      border-end-start-radius: 3px;
      margin-right: 10px;
    }

    .store {
      background-color: white;
      border: 1px solid #e4e4e7;
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>
