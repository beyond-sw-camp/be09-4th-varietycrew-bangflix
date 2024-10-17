<template>
  <AdminPageLayout>
    <RouterView />
  </AdminPageLayout>
</template>

<script setup>
import AdminPageLayout from '@/components/layouts/AdminPageLayout.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped></style>
