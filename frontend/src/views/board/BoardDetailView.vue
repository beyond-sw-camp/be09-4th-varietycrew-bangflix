<template>
  <PageLayout title="게시글 상세보기">
    <div class="board-detail-container">
      <Card v-if="post">
        <template #header>
          <div class="card-header-container">
            <div class="start">
              <Avatar :image="Helper.getImageUrl(post.profile)" class="profile-image" size="large" shape="circle" />
              <div class="profile-nickname">{{ post.nickname }}</div>
            </div>
            <div class="end">
              <div class="created-at">{{ Helper.Date.formatDateTime(post.createdAt) }}</div>
              <i class="pi pi-exclamation-triangle" @click="handleReport"> 신고하기</i>
              <div class="button-overlay">
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" />
                <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
              </div>
            </div>
          </div>
        </template>
        <template #title>{{ post.title }}</template>
        <template #content>
          <div class="content-container">
            <div class="content">{{ post.content }}</div>
            <div class="content-image-container">
              <template v-if="post.imageUrls && post.imageUrls.length">
                <template v-for="(image, index) in post.imageUrls" :key="index">
                  <img :src="Helper.getImageUrl(image)" alt="보드 이미지" class="content-image" />
                </template>
              </template>
            </div>
          </div>
          <div class="content-footer">
            <ReviewLike
              :is-user-like="post.isLike"
              :count="countLikes.likeCount"
              @handle-active="toggleLike"
              @handle-deactivate="toggleLike"
            />
            <div class="comment">
              <i class="pi pi-comment"></i>
              <div class="emoji">{{ countComments.commentCount }}</div>
            </div>
          </div>
          <Divider type="solid" />
        </template>
        <template #footer>
          <div class="comment-container">
            <div class="input-comment-container">
              <Textarea v-model="inputComment.content" class="input-comment" placeholder="여기에 댓글 작성" />
              <Button class="enter-comment" @click="submitComment">작성</Button>
            </div>
            <template v-if="comments && comments.length">
              <template v-for="comment in comments" :key="comment.commentCode">
                <Comment
                  :comments="comment"
                  :is-admin="isAdmin"
                  :is-writer="isWriter"
                  @on-reload-comments="fetchComments"
                />
              </template>
            </template>
          </div>
        </template>
      </Card>

      <template v-else> 게시글이 존재하지 않습니다.</template>
    </div>
  </PageLayout>

  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useToastMessage from '@/hooks/useToastMessage';
import Comment from '@/components/common/Comment.vue';
import { $api } from '@/services/api/api';
import { Helper } from '@/utils/Helper';
import { useUserStore } from '@/stores/user';
import ReviewLike from '@/components/common/reaction/ReviewLike.vue';
import ConfirmDialog from 'primevue/confirmdialog';

const route = useRoute();
const userStore = useUserStore();
const { showSuccess, showWarning } = useToastMessage();

const post = ref(null);
const boardId = ref(route.params.boardId);
const isSubscribed = ref(true);
const isWriter = ref(true);
const isAdmin = ref(false);
const comments = ref([]);

const countLikes = ref({
  communityPostCode: boardId.value,
  likeCount: 0,
});

const countComments = ref({
  communityPostCode: boardId.value,
  commentCount: 0,
});

const inputComment = ref({
  content: '',
});

const fetchPostDetail = async () => {
  post.value = await $api.community.getPostDetailByPostCode(boardId.value);
  // console.log(post.value.nickname);
};

const fetchComments = async () => {
  const response = await $api.community.getCommentsByPostCode(boardId.value);
  comments.value = response.map(comment => ({
    commentCode: comment.commentCode,
    nickname: comment.nickname,
    content: comment.content,
    createdAt: Helper.Date.formatDateTime(comment.createdAt),
    profile: comment.profile,
    communityPostCode: comment.communityPostCode,
  }));
  // console.log(comments.value);
};

const fetchLikeCount = async () => {
  // console.log(props.post.communityPostCode);
  const response = await $api.postLike.getLikeCount(boardId.value);
  countLikes.value = response;
};

const fetchCommentCount = async () => {
  const response = await $api.community.getCommentCount(boardId.value);
  countComments.value = response;
};

// 댓글 작성 API 호출
const submitComment = async () => {
  if (!inputComment.value.content) {
    showWarning('댓글을 작성해주세요.'); // 댓글 내용이 없을 경우 경고
    return;
  }

  await $api.community.submitComment(boardId.value, { content: inputComment.value.content });
  showSuccess('댓글이 작성되었습니다.');
  fetchComments(); // 댓글 목록 새로 고침
  inputComment.value = '';
};

const menu = ref();

const menuItems = ref([]);

const setMenuItems = () => {
  if (isSubscribed.value) {
    menuItems.value = [
      {
        items: [
          {
            label: '구독중',
            icon: 'pi pi-bell-slash',
            command: handleSubscribe,
          },
        ],
      },
    ];
  } else {
    menuItems.value = [
      {
        items: [
          {
            label: '구독하기',
            icon: 'pi pi-bell',
            command: handleSubscribe,
          },
        ],
      },
    ];
  }

  if (isWriter.value) {
    menuItems.value[0].items.push(
      {
        label: '수정하기',
        icon: 'pi pi-pencil',
      },
      {
        label: '삭제하기',
        icon: 'pi pi-trash',
      },
    );
  }
};

const toggle = event => {
  menu.value.toggle(event);
};
const handleReport = () => {
  showSuccess('신고 완료!', '\n성공적으로 신고가 완료됐습니다.');
};
const handleSubscribe = () => {
  // 구독 API 요청 handling 필요
  isSubscribed.value = !isSubscribed.value;
  if (isSubscribed.value) {
    showSuccess('구독 완료', '\n해당 글을 구독합니다. \n\n 해당 글의 변동사항에 대해서 알림을 받습니다.');
  } else {
    showWarning('구독 취소', '\n구독을 취소합니다. \n\n 더 이상 해당 글의 변동사항에 대해서 알림을 받지 않습니다.');
  }

  setMenuItems();
  console.log('status: ', isSubscribed.value);
};

const toggleLike = () => {
  $api.postLike.toggleLike(boardId.value).then(() => {
    fetchLikeCount(); // 좋아요 개수 새로고침
    fetchPostDetail(); // isLike 새로고침
  });
};

onMounted(() => {
  setMenuItems();
  fetchPostDetail();
  fetchComments();
  fetchLikeCount();
  fetchCommentCount();
});
</script>

<style scoped>
.board-detail-container {
  display: flex;
  justify-content: center;
}
.p-card {
  padding: 30px;
  margin-top: 50px;
  width: 80%;
}

.card-header-container {
  display: flex;
  justify-content: space-between;
}

.start {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.profile-image {
  margin-right: 20px;
}

.end {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.created-at {
  margin-right: 20px;
}
.pi-exclamation-triangle {
  margin-right: 20px;
  cursor: pointer;
}

/* content */
.content-container {
  margin-top: 30px;
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

/* content-footer */
.content-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
}
.like {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
}
.comment {
  display: flex;
  flex-direction: row;
}
.emoji {
  margin-left: 5px;
}

/* comment input */
.input-comment-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}
.input-comment {
  resize: none;
  width: 100%;
  margin-right: 10px;
}
.enter-comment {
  width: 60px;
}
</style>
