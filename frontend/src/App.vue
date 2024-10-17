<template>
  <PageHeader />

  <main>
    <RouterView />
  </main>

  <Toast position="top-center" />
</template>

<script setup>
import { RouterView } from 'vue-router';
import PageHeader from './components/PageHeader.vue';
import Toast from 'primevue/toast';
import { onMounted, onUnmounted } from 'vue';
import useToastMessage from './hooks/useToastMessage';
import DOMEventService from './services/DOMEventService';

const { showError, showSuccess } = useToastMessage();

function handleApiError(customEvent) {
  showError('오류 발생', customEvent.detail);
}

function handleApiSuccess(customEvent) {
  showSuccess('성공', customEvent.detail);
}

onMounted(() => {
  DOMEventService.subscribeApiError(handleApiError);
  DOMEventService.subscribeApiSuccess(handleApiSuccess);
});

onUnmounted(() => {
  DOMEventService.unsubscribeApiError(handleApiError);
  DOMEventService.unsubscribeApiSuccess(handleApiSuccess);
});
</script>

<style scoped>
main {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
