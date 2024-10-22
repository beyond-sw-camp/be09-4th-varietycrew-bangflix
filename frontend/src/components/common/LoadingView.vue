<template>
  <div class="loading-view">
    <ProgressSpinner />
    <AppTypography color="darkgray" class="mt-m">데이터를 가져오는 중입니다...</AppTypography>
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import AppTypography from '../AppTypography.vue';
</script>

<style scoped>
.loading-view {
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
