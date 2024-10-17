<template>
  <PageLayout title="공지사항" btn-txt="공지사항 등록" btn-role="ADMIN" @click-btn="goNoticeForm">
    <template v-if="notices.length > 0">
      <template v-for="(notice, id) in notices" :key="id">
        <NoticePreviewCard :notice="notice" class="notice-card" @click="goDetailNotice(id)"></NoticePreviewCard>
      </template>
    </template>
    <template v-else> 게시글이 존재하지 않습니다. </template>
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/layouts/PageLayout.vue';
import NoticePreviewCard from '@/components/cards/preview/NoticePreviewCard.vue';
import useToastMessage from '@/hooks/useToastMessage';

import { ref } from 'vue';
import router from '@/router/routes';

const { showSuccess } = useToastMessage();
const notices = ref([
  { id: 0, title: '제목1', createdAt: '2024.10.01', writer: '홍길동 관리자' },
  { id: 1, title: '제목2', createdAt: '2024.10.02', writer: '용길동 관리자' },
  { id: 2, title: '제목3', createdAt: '2024.10.03', writer: '홍길할 관리자' },
  { id: 3, title: '제목4', createdAt: '2024.10.04', writer: '홍길한 관리자' },
  { id: 4, title: '제목5', createdAt: '2024.10.05', writer: '길동 관리자' },
]);

const goDetailNotice = id => {
  router.push(`/notice/detail/${id}`);
};
const goNoticeForm = () => {
  router.push(`/notice/form`);
};
</script>

<style scoped>
.notice-card {
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
