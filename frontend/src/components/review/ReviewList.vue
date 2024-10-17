<template>
  <ul class="review-list">
    <li v-for="review in props.reviews" :key="review.reviewCode">
      <ReviewItem :review="review" @click-image="clickImage" @click-report="clickReport" />
    </li>
  </ul>

  <!-- 리뷰 사진 크게 -->
  <Galleria
    v-model:visible="displayBigImage"
    :value="bigImages"
    :num-visible="5"
    container-style="max-width: 80vw; max-height: 90vh;"
    :circular="true"
    :full-screen="true"
    :show-item-navigators="true"
    :show-thumbnails="false"
    :show-indicators="true"
    :show-indicators-on-item="true"
  >
    <template #item="slotProps">
      <img :src="slotProps.item" style="width: 100%; display: block" />
    </template>
  </Galleria>

  <!-- 신고하기 popup -->
  <Popover ref="popupReport" class="p-16">
    <AppTypography type="title3" class="mb-s">신고 사유 선택</AppTypography>
    <div class="flex-col gap-5 mb-m">
      <div v-for="reportOption in reportOptions" :key="reportOption.key" class="flex-row items-center gap-5">
        <RadioButton
          v-model="selectedReport"
          :input-id="reportOption.key"
          name="radio-report"
          :value="reportOption.name"
        />
        <label :for="reportOption.key">{{ reportOption.name }}</label>
      </div>
    </div>
    <div class="flex-row gap-10">
      <Button label="취소" severity="secondary" size="small" @click="clickCancelReport" />
      <Button label="신고하기" size="small" @click="clickSaveReport" />
    </div>
  </Popover>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import Galleria from 'primevue/galleria';
import Popover from 'primevue/popover';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import ReviewItem from './ReviewItem.vue';
import AppTypography from '../AppTypography.vue';

const props = defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});

const displayBigImage = ref(false);
const bigImages = ref([]);
const popupReport = ref();
const selectedReport = ref('');
const reportOptions = ref([
  { key: 'A', name: '영리목적/홍보성' },
  { key: 'B', name: '불법정보' },
  { key: 'C', name: '욕설/인신공격' },
  { key: 'D', name: '스포일러' },
  { key: 'E', name: '같은 내용 반복' },
  { key: 'F', name: '개인정보 노출' },
  { key: 'G', name: '음란성/선정성' },
  { key: 'H', name: '기타' },
]);

const clickImage = images => {
  bigImages.value = images;
  displayBigImage.value = true;
};

const clickReport = event => {
  popupReport.value.toggle(event);
};

const clickCancelReport = event => {
  popupReport.value.toggle(event);
};

const clickSaveReport = () => {
  // 신고하기 저장
};
</script>

<style scoped>
.review-list {
  padding: 0;
  margin: 0;
  list-style-type: none;

  li + li {
    margin-top: 16px;
  }
}
</style>
