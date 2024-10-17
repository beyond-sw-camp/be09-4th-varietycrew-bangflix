<template>
  <div class="review-container">
    <i class="pi pi-comments" />
    <div class="count">{{ props.count }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  count: {
    type: Number,
    requred: true,
  },
  //     count: 123
});
</script>

<style scoped>
.review-container {
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
