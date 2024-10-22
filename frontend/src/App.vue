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
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user';

const { showError, showSuccess } = useToastMessage();
const router = useRouter();
const userStore = useUserStore();

function handleApiError(customEvent) {
  showError('오류 발생', customEvent.detail);
}

function handleApiSuccess(customEvent) {
  showSuccess('성공', customEvent.detail);
}

function handleExpiredToken() {
  showError('로그인이 만료되어 로그아웃됩니다.');
  userStore.logout();
  router.replace('/login');
}

onMounted(() => {
  DOMEventService.subscribeApiError(handleApiError);
  DOMEventService.subscribeApiSuccess(handleApiSuccess);
  DOMEventService.subscribeExpiredToken(handleExpiredToken);
});

onUnmounted(() => {
  DOMEventService.unsubscribeApiError(handleApiError);
  DOMEventService.unsubscribeApiSuccess(handleApiSuccess);
  DOMEventService.unsubscribeExpiredToken(handleExpiredToken);
});
</script>

<style scoped>
main {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
