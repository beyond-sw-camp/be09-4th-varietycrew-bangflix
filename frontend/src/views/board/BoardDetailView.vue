<template>
  <PageLayout title="게시글 상세보기">
    <div class="board-detail-container">
      <Card v-if="boardDetail">
        <template #header>
          <div class="card-header-container">
            <div class="start">
              <Avatar :image="boardDetail.profileImage" class="profile-image" size="large" shape="circle" />
              <div class="profile-nickname">{{ boardDetail.writer }}</div>
            </div>
            <div class="end">
              <div class="created-at">{{ boardDetail.createdAt }}</div>
              <i class="pi pi-exclamation-triangle" @click="handleReport"> 신고하기</i>
              <div class="button-overlay">
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" />
                <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
              </div>
            </div>
          </div>
        </template>
        <template #title>{{ boardDetail.title }}</template>
        <template #content>
          <div class="content-container">
            <div class="content">{{ boardDetail.content }}</div>
            <div class="content-image-container">
              <template v-if="boardDetail.images">
                <template v-for="(image, index) in boardDetail.images" :key="index">
                  <img :src="image" alt="보드 이미지" class="content-image" />
                </template>
              </template>
            </div>
          </div>
          <div class="content-footer">
            <div class="like">
              <i class="pi pi-heart"></i>
              <div class="emoji">{{ boardDetail.like }}</div>
            </div>
            <div class="comment">
              <i class="pi pi-comment"></i>
              <div class="emoji">{{ boardDetail.comment }}</div>
            </div>
          </div>
          <Divider type="solid" />
        </template>
        <template #footer>
          <div class="comment-container">
            <div class="input-comment-container">
              <Textarea v-model="inputComment" class="input-comment" placeholder="여기에 댓글 작성" />
              <Button class="enter-comment">작성</Button>
            </div>
            <template v-if="boardDetail.comments">
              <template v-for="comment in boardDetail.comments" :key="comment.id">
                <Comment :comment="comment" :is-admin="isAdmin" :is-writer="isWriter" />
              </template>
            </template>
          </div>
        </template>
      </Card>

      <template v-else> 게시글이 존재하지 않습니다.</template>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useToastMessage from '@/hooks/useToastMessage';
import Comment from '@/components/common/Comment.vue';

const route = useRoute();
const { showSuccess, showWarning } = useToastMessage();

const boardId = ref(route.params.boardId);
const isSubscribed = ref(true);
const isWriter = ref(true);
const isAdmin = ref(true);

const inputComment = ref('');
const menu = ref();
const boardDetail = ref({
  id: boardId,
  profileImage: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
  writer: '닉네임',

  title: '제목',
  content:
    '내용 오늘 다녀온 따끈따끈한 방탈출 리뷰 남겨보겠습니다. 총 인원은...3명이었구요! 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 어쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 어쩌구 ......이러쿵 저러쿵',
  images: [
    'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
    'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
    'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
  ],
  like: 0,
  comment: 0,
  comments: [
    {
      id: 0,
      writer: '홍길동1',
      profileImage: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
      comment: '저도 이번에 여기 다녀왔는데 저한텐 흙길 ㅠ1',
      createdAt: '오후 8:33',
    },
    {
      id: 1,
      writer: '홍길동2',
      profileImage: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
      comment: '저도 이번에 여기 다녀왔는데 저한텐 흙길 ㅠ2',
      createdAt: '오후 8:33',
    },
  ],
  createdAt: '오후 8:33',
});

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

onMounted(() => {
  setMenuItems();
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
