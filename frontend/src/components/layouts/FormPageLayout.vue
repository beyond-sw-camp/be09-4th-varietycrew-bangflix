<template>
  <div class="container">
    <div class="top-area">
      <Button label="돌아가기" text icon="pi pi-arrow-left" @click="goBack" />
      <Button label="저장" size="small" @click="emit('clickSave')" />
    </div>

    <h2>{{ props.title }}</h2>

    <slot></slot>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['clickSave']);

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.container {
  padding: 64px 48px;

  .top-area {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  h2 {
    margin-bottom: 32px;
  }
}
</style>
