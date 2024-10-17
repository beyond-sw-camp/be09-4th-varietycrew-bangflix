<template>
  <Card @click="emit('clickBoardPreview')">
    <template #header>
      <div class="card-header-container">
        <div class="card-profile">
          <Avatar :image="profileImage" class="profile-image" size="large" shape="circle" />
          <div class="profile-nickname">{{ nickname }}</div>
        </div>
        <div>{{ createdAt }}</div>
      </div>
    </template>
    <template #title>{{ title }}</template>
    <template #content>
      <p class="m-0">{{ content }}</p>
    </template>
    <template #footer>
      <div class="board-footer">
        <div class="like">
          <i class="pi pi-heart"></i>
          <div class="emoji">{{ like }}</div>
        </div>
        <div class="comment">
          <i class="pi pi-comment"></i>
          <div class="emoji">{{ comment }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['clickBoardPreview']);

const profileImage = ref('https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png');
const nickname = ref('닉네임');

const createdAt = ref('오후 8:33');

const title = ref('제목');
const content = ref('내용');

const like = ref(0);
const comment = ref(0);
</script>

<style scoped>
.p-card {
  /* Card */
  padding: 20px;
}

.card-header-container {
  display: flex;
  justify-content: space-between;
}
.card-profile {
  display: flex;
}
.profile-image {
  margin-right: 20px;
}
.profile-nickname {
  display: flex;
  align-items: center;
}

.board-footer {
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
</style>
