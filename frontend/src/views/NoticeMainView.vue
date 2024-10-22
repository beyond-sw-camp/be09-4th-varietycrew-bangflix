<template>
  <PageLayout title="공지사항" btn-txt="공지사항 등록" btn-role="ADMIN" @click-btn="goNoticeForm">
    <template v-if="notices.totalPages > 0">
      <template v-for="(notice, id) in notices.noticePosts" :key="id">
        <NoticePreviewCard
          :notice="notice"
          class="notice-card"
          @click="goDetailNotice(notice.noticePostCode)"
        ></NoticePreviewCard>
      </template>
    </template>
    <template v-else> 게시글이 존재하지 않습니다. </template>
  </PageLayout>
  <Paginator
    v-model:first="first"
    :rows="6"
    :total-records="notices.totalElements"
    :rows-per-page="6"
    @page="onPageChange"
  >
  </Paginator>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import PageLayout from '@/components/layouts/PageLayout.vue';
import NoticePreviewCard from '@/components/cards/preview/NoticePreviewCard.vue';
import useToastMessage from '@/hooks/useToastMessage';
import Paginator from 'primevue/paginator';
import { $api } from '@/services/api/api';

const router = useRouter();
const { showSuccess } = useToastMessage();
const notices = ref({
  noticePosts: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 1,
});

const first = ref(0);
const currentPage = computed(() => Math.floor(first.value / 6) + 1);

const fetchNotices = async page => {
  const response = await $api.notice.getNoticesByPage(page);
  notices.value = response;
};

const onPageChange = event => {
  first.value = event.first;
  fetchNotices(currentPage.value);
};

const goDetailNotice = id => {
  router.push(`/notice/detail/${id}`);
};

const goNoticeForm = () => {
  router.push(`/notice/form`);
};

watch(
  currentPage,
  newPage => {
    fetchNotices(newPage);
  },
  { immediate: true },
);
</script>

<style scoped>
.notice-card {
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
