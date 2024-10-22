<template>
  <DetailPageLayout title="공지사항" btn-role="ADMIN" @update="handleUpdateNotice">
    <NoticePreviewCard :notice="notice" class="notice-card" />
    <div class="notice-detail-container">
      <Card>
        <template #content>
          <div class="content-container">
            <div class="content">{{ notice.content }}</div>
            <!-- <div class="content-image-container">
              <template v-if="notice.images">
                <template v-for="(image, index) in notice.images" :key="index">
                  <img :src="image" alt="공지사항 이미지" class="content-image" />
                </template>
              </template>
            </div> -->
          </div>
        </template>
      </Card>
    </div>
  </DetailPageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailPageLayout from '@/components/layouts/DetailPageLayout.vue';
import NoticePreviewCard from '@/components/cards/preview/NoticePreviewCard.vue';
import Card from 'primevue/card';
import { useConfirm } from 'primevue/useconfirm';
import useToastMessage from '@/hooks/useToastMessage';
import { $api } from '@/services/api/api';

const { showSuccess } = useToastMessage();

const route = useRoute();
const confirm = useConfirm();
const noticeId = ref(route.params.noticeId);
const notice = ref({});

const fetchNoticeDetail = async () => {
  notice.value = await $api.notice.getNoticeDetailByNoticeCode(noticeId.value);
  console.log(notice.value.title);
};

onMounted(fetchNoticeDetail);

const handleUpdateNotice = actionType => {
  if (actionType === 'edit') {
    console.log('수정 버튼');
  } else if (actionType === 'delete') {
    console.log('delete 버튼');
    handleOnDelete();
  }
};

const handleOnDelete = () => {
  confirm.require({
    message: '글이 삭제됩니다.',
    header: '공지사항 글을 삭제할까요?',
    rejectProps: {
      label: '취소',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: '삭제하기',
    },
    accept: () => {
      showSuccess('삭제 완료', '공지사항이 삭제되었습니다.');
    },
    reject: () => {},
  });
};
</script>

<style scoped>
.notice-detail-container {
  display: flex;
  justify-content: center;
}
.p-card {
  padding: 30px;
  margin-top: 50px;
  width: 100%;
}

/* content */
.content-container {
  margin-top: 10px;
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
</style>
