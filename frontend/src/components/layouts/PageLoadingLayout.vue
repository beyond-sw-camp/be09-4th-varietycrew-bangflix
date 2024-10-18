<template>
  <div class="page-loading-layout">
    <ProgressSpinner />
    <AppTypography color="darkgray">페이지를 가져오는 중입니다...</AppTypography>
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import AppTypography from '../AppTypography.vue';
</script>

<style scoped>
.page-loading-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
