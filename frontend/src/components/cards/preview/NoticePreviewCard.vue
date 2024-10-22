<template>
  <Card>
    <template #content>
      <div class="notice-header-container">
        <div class="title">{{ notice.title }}</div>
        <div class="writer">{{ notice.nickname }}</div>
      </div>
      <div class="content">{{ Helper.Date.formatDateTime(notice.createdAt) }}</div>
    </template>
  </Card>
</template>

<script setup>
import { Helper } from '@/utils/Helper';
import { defineProps } from 'vue';

const props = defineProps({
  notice: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.notice-header-container {
  display: flex;
  justify-content: space-between;
}
.title {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
.content {
  font-size: 13px;
  margin-top: 10px;
}
</style>
