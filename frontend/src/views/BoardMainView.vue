<template>
  <PageLayout title="커뮤니티" btn-txt="글 작성" btn-role="ALL" @click-btn="goBoardForm">
    <div class="board-card-container">
      <template v-if="cards && cards.length">
        <template v-for="(card, index) in cards" :key="card.id">
          <BoardPreviewCard
            :card="card"
            :index="index"
            class="board-card"
            @click-board-preview="goBoardDetail(card.id)"
          />
        </template>
      </template>
      <template v-else>{{ postNotExist }}</template>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PageLayout from '@/components/layouts/PageLayout.vue';
import BoardPreviewCard from '@/components/cards/preview/BoardPreviewCard.vue';

const router = useRouter();

const cards = ref([]);
const postNotExist = '게시글이 존재하지 않습니다.';

const goBoardDetail = id => {
  router.push(`/board/detail/${id}`);
};
const goBoardForm = () => {
  router.push({ path: 'board/form' });
};

onMounted(() => {
  cards.value.push({ id: 0, key: 'value' });
  cards.value.push({ id: 1, key: 'value' });
  cards.value.push({ id: 2, key: 'value' });
  cards.value.push({ id: 3, key: 'value' });
  cards.value.push({ id: 4, key: 'value' });
});
</script>

<style scoped>
.board-card {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
