<template>
  <div class="container-user-rank-view">
    <div class="list-123 mb-l">
      <UserRankCard v-for="user in users.slice(0, 3)" :key="user.id" :rank-user="user" />
    </div>
    <div class="list-remainder">
      <UserRankCard v-for="user in users.slice(3)" :key="user.id" :rank-user="user" />
    </div>
  </div>
</template>

<script setup>
import UserRankCard from '@/components/cards/UserRankCard.vue';
import { ref } from 'vue';

const users = ref([
  {
    id: 1,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 1,
  },
  {
    id: 2,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 2,
  },
  {
    id: 3,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 3,
  },
  {
    id: 4,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 4,
  },
  {
    id: 5,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 5,
  },
  {
    id: 6,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 6,
  },
  {
    id: 7,
    nickname: '홍길동',
    profileUrl: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    point: 30000,
    genres: '공포, 스릴러',
    rank: 7,
  },
]);
</script>

<style scoped>
.container-user-rank-view {
  .list-123 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }

  .list-remainder {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }
}
</style>
