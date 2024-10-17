<template>
  <div class="container-user-rank-card">
    <Card>
      <template #title>
        <div class="flex-row content-between">
          <AppTypography type="title3">{{ props.rankUser.point.toLocaleString() }}점</AppTypography>
          <Tag v-if="props.rankUser.rank >= 4" :value="`${props.rankUser.rank}위`" rounded severity="info"></Tag>
        </div>
      </template>
      <template #content>
        <div class="flex-row gap-10 items-center">
          <Avatar :image="props.rankUser.profileUrl" size="large" />
          <div>
            <AppTypography class="mb-xxs">{{ props.rankUser.nickname }}</AppTypography>
            <AppTypography type="body2" color="darkgray">선호 장르: {{ props.rankUser.genres }}</AppTypography>
          </div>
        </div>
      </template>
      <template #footer>
        <Button label="프로필 보기" size="small" severity="secondary" fluid @click="clickUser(props.rankUser.id)" />
      </template>
    </Card>

    <!-- 메달 -->
    <Image
      v-if="props.rankUser.rank === 1"
      src="/src/assets/icons/medal-gold.png"
      class="item-medal"
      image-style="width: 50px"
    />
    <Image
      v-else-if="props.rankUser.rank === 2"
      src="/src/assets/icons/medal-silver.png"
      class="item-medal"
      image-style="width: 50px"
    />
    <Image
      v-else-if="props.rankUser.rank === 3"
      src="/src/assets/icons/medal-bronze.png"
      class="item-medal"
      image-style="width: 50px"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import AppTypography from '../AppTypography.vue';
import Avatar from 'primevue/avatar';
import Image from 'primevue/image';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import Tag from 'primevue/tag';

const props = defineProps({
  /** rankUser
   * {
   *  id: number,
   *  nickname: string,
   *  profileUrl: string,
   *  point: number,
   *  genres: string "호러,공포,스릴러"
   *  rank: number,
   * }
   */
  rankUser: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const clickUser = userId => {
  // router.push()
};
</script>

<style scoped>
.container-user-rank-card {
  position: relative;

  .item-medal {
    position: absolute;
    top: -10px;
    left: -25px;
  }
}
</style>
