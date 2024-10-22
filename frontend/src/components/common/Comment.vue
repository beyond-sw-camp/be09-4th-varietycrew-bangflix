<template>
  <div class="card">
    <Fieldset>
      <template #legend>
        <div class="profile-container">
          <Avatar :image="Helper.getImageUrl(props.comments.profile)" shape="circle" />
          <span class="nickname">{{ props.comments.nickname }}</span>
        </div>
      </template>
      <div class="comment-content-container">
        <div class="created-at">{{ props.comments.createdAt }}</div>
        <Textarea v-if="isEditing" v-model="editingComment" rows="5" cols="30" fluid />
        <div v-else class="comment-content">{{ props.comments.content }}</div>
      </div>
      <div v-if="isEditing" class="flex-row content-between">
        <Button label="취소" size="small" severity="secondary" @click="cancelEdit" />
        <Button label="저장" size="small" @click="handleCommentUpdate" />
      </div>
      <div v-else class="comment-footer">
        <div class="footer-start">
          <i v-if="isWriter" class="pi pi-pencil" @click="clickEdit"> 수정</i>
          <i v-if="isWriter" class="pi pi-trash" @click="clickDelete"> 삭제</i>
          <i v-if="isAdmin" class="pi pi-power-off" @click="handleCommentDeactivate(props.comments.commentCode)">
            비활성화
          </i>
        </div>
        <div class="footer-end">
          <i
            v-if="props.comments"
            class="pi pi-exclamation-triangle"
            @click="handleCommentReport(props.comments.commentCode)"
          >
            신고</i
          >
        </div>
      </div>
    </Fieldset>
  </div>
</template>

<script setup>
import useToastMessage from '@/hooks/useToastMessage';
import { Helper } from '@/utils/Helper';
import { defineProps, onMounted, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { $api } from '@/services/api/api';
import { useConfirm } from 'primevue/useconfirm';

const { showSuccess } = useToastMessage();
const props = defineProps({
  comments: {
    type: Object,
    required: true,
  },
  isWriter: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['onReloadComments']);

const userStore = useUserStore(); // Pinia 스토어 인스턴스 가져오기
const currentUserNickname = userStore.nickname; // 현재 로그인한 사용자의 닉네임
const currentUserIsAdmin = userStore.isAdmin;

const confirm = useConfirm();

// 댓글 작성자와 현재 사용자의 닉네임 비교
const isWriter = computed(() => props.comments.nickname === currentUserNickname);

const isEditing = ref(false);
const editingComment = ref('');

const clickEdit = () => {
  isEditing.value = true;
  editingComment.value = props.comments.content;
};

const cancelEdit = () => {
  isEditing.value = false;
  editingComment.value = '';
};

const handleCommentUpdate = () => {
  $api.community
    .updateComment(props.comments.communityPostCode, props.comments.commentCode, editingComment.value)
    .then(() => {
      isEditing.value = false;
      emit('onReloadComments');
    });
};

const clickDelete = () => {
  confirm.require({
    message: '댓글을 삭제할까요?',
    header: '댓글 삭제',
    rejectProps: {
      label: '취소',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: '댓글 삭제',
      severity: 'danger',
    },
    accept: handleCommentDelete,
  });
};
const handleCommentDelete = () => {
  $api.community.deleteComment(props.comments.communityPostCode, props.comments.commentCode).then(() => {
    emit('onReloadComments');
  });
};

const handleCommentDeactivate = commentId => {
  // TODO: 댓글 비활성화
  showSuccess('deactivated', 'successfully');
};
const handleCommentReport = commentId => {
  // TODO: 댓글 신고
  showSuccess('reported', 'successfully');
};
</script>

<style scoped>
/* legend profile */
.profile-container {
  display: flex;
  align-items: center;
}
.nickname {
  margin-left: 10px;
}

/* content-container */
.created-at {
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
}

/* footer */
.comment-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
i {
  margin-right: 15px;
  cursor: pointer;
}
</style>
