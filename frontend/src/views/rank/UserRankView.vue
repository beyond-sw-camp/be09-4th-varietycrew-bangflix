<template>
  <div class="container-user-rank-view">
    <div class="area-reload">
      <Button
        label="새로고침"
        class="mb-l"
        severity="secondary"
        icon="pi pi-refresh"
        size="small"
        :loading="isReloading"
        @click="reload"
      />
    </div>

    <div class="list-123 mb-l">
      <UserRankCard
        v-for="(member, index) in members.slice(0, 3)"
        :key="member.memberCode"
        :rank-member="member"
        :rank="index + 1"
      />
    </div>
    <div v-if="members.length > 3" class="list-remainder">
      <UserRankCard
        v-for="(member, index) in members.slice(3)"
        :key="member.memberCode"
        :rank-member="member"
        :rank="index + 1 + 3"
      />
    </div>
  </div>
</template>

<script setup>
import UserRankCard from '@/components/cards/UserRankCard.vue';
import { $api } from '@/services/api/api';
import { onMounted, ref } from 'vue';

const members = ref([]);
const isReloading = ref(false);

const getMemberRanking = () => {
  isReloading.value = true;
  $api.ranking.getMemberRanking().then(foundMemberRanking => {
    members.value = foundMemberRanking;
    isReloading.value = false;
  });
};

const reload = () => {
  getMemberRanking();
};

onMounted(() => {
  // 유저 랭킹 목록 불러오기
  getMemberRanking();
});
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

  .area-reload {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
