<template>
  <div class="like-container">
    <template v-if="liked">
      <i class="pi pi-heart-fill" @click="handleDeactivate" />
    </template>
    <template v-else>
      <i class="pi pi-heart" @click="handleActivate" />
    </template>
    <div class="count">{{ props.count }}</div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const liked = ref(false);

const props = defineProps({
  // like: {
  //   type: Object,
  //   requred: true,
  // },
  //     like: {
  //       liked: false,
  //       count: 8,
  //     },
  count: {
    type: Number,
    required: true,
  },
});
// if (props.like.liked) {
//   liked.value = true;
// } else if (props.like.liked) {
//   liked.value = false;
// }

// 좋아요
const handleActivate = () => {
  if (!liked.value) {
    // 좋아요 api
    liked.value = !liked.value;
  }
};

// 좋아요 취소
const handleDeactivate = () => {
  if (liked.value) {
    // 좋아요 취소 api
    liked.value = !liked.value;
  }
};
</script>

<style scoped>
.like-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.pi {
  margin-right: 5px;
  cursor: pointer;
}
</style>
