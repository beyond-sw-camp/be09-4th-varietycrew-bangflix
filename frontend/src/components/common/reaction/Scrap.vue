<template>
  <div class="scrap-container">
    <i class="pi pi-hammer" @click="handleActivate" />
    <div class="count">{{ props.count }}</div>
  </div>
</template>

<script setup>
import useToastMessage from '@/hooks/useToastMessage';
import { ref, defineProps } from 'vue';

const { showSuccess, showError } = useToastMessage();
const scraped = ref(false);

const props = defineProps({
  // scrap: {
  //   type: Object,
  //   requred: true,
  // },
  //     scrap: {
  //       scraped: true,
  //       count: 9,
  //     },
  count: {
    type: Number,
    required: true,
  },
});
// if (props.scrap.scraped) {
//   scraped.value = true;
// } else if (props.scrap.scraped) {
//   scraped.value = false;
// }

// 스크랩
const handleActivate = () => {
  if (!scraped.value) {
    // 스크랩 api
    scraped.value = true;
    showSuccess('스크랩 성공!', '마이페이지에서 확인할 수 있습니다.');
  } else if (scraped.value) {
    showError('오류', '이미 스크랩이 되어있습니다.');
  }
};
</script>

<style scoped>
.scrap-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.pi {
  margin-right: 5px;
  cursor: pointer;
}
</style>
