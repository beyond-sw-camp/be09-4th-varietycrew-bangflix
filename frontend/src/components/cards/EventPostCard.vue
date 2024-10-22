<template>
  <Card style="overflow: hidden" class="event-post-card">
    <template #header>
      <img class="theme-tumb" :src="props.eventPost.eventTheme.posterImage" alt="테마 포스터 이미지" />
    </template>
    <template #content>
      <h3 class="theme mb-xs">{{ props.eventPost.eventTheme.name }}</h3>
      <AppTypography type="caption" color="darkgray">{{ props.eventPost.content }}</AppTypography>
    </template>
    <template #footer>
      <Button
        label="이벤트 상세보기"
        size="small"
        fluid
        as="router-link"
        :to="`/event/detail/${props.eventPost.eventPostCode}`"
      />
    </template>
  </Card>
</template>

<script setup>
import { defineProps } from 'vue';
import AppTypography from '../AppTypography.vue';
import Button from 'primevue/button';

const props = defineProps({
  eventPost: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.event-post-card {
  .theme-tumb {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
