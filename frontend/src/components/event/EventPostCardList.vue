<template>
  <div class="event-card-container">
    <EventPostCard v-for="(eventPost, id) in props.eventPosts" :key="id" :event-post="eventPost" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import EventPostCard from '../cards/EventPostCard.vue';

const props = defineProps({
  eventPosts: {
    type: Array, // EventPostDTO[]
    required: true,
  },
});
</script>

<style scoped>
.event-card-container {
  display: grid; /* flex 대신 grid 사용 */
  grid-template-columns: repeat(5, 1fr); /* 5개 열 */
  gap: 16px; /* 카드 간격 */
  margin-top: 20px; /* 상단 여백 */
  align-items: flex-start;
}
</style>
