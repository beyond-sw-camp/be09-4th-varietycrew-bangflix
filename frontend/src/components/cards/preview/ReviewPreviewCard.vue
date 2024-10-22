<template>
  <div class="review-preview-container">
    <Card>
      <template #title>
        <h2>{{ props.review.totalScore }}/5</h2>
      </template>
      <template #content>
        <p>
          {{
            props.review.content.length > 130
              ? props.review.content.slice(0, 130) + '...(더보기)'
              : props.review.content
          }}
        </p>
      </template>
      <template #footer>
        <div class="footer-container">
          <div>{{ props.review.createdAt.split('T')[0] }}</div>
          <div>
            <ReviewLike :is-user-like="props.review.isUserLike" :count="props.review.likes" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import ReviewLike from '@/components/common/reaction/ReviewLike.vue';
import Card from 'primevue/card';

import { defineProps, onMounted } from 'vue';
const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  // props.review.createdAt.value = props.review.createdAt.value.split('T')[0];
});
</script>

<style scoped>
.review-preview-container {
  margin-right: 10px;
}
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
