<template>
  <PageLayout title="커뮤니티" btn-txt="글 작성" btn-role="ALL" @click-btn="goBoardForm">
    <div class="board-card-container">
      <template v-if="posts && posts.length">
        <template v-for="(post, index) in posts" :key="post.id">
          <BoardPreviewCard
            :post="post"
            :index="index"
            class="board-card"
            @click-board-preview="goBoardDetail(post.communityPostCode)"
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
import { $api } from '@/services/api/api';

const router = useRouter();

const posts = ref([]);
const postNotExist = '게시글이 존재하지 않습니다.';

const goBoardDetail = id => {
  router.push(`/board/detail/${id}`);
};
const goBoardForm = () => {
  router.push({ path: 'board/form' });
};

const fetchPosts = async () => {
  const response = await $api.community.getCommunityPosts();
  posts.value = response;
  // console.log(posts.value);
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.board-card {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
