<template>
  <div class="page-loading-layout">
    <LoadingView />
  </div>
</template>

<script setup>
import LoadingView from '../common/LoadingView.vue';
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
