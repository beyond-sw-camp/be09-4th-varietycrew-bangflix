<template>
  <div class="container-review-statistics-bar">
    <label for="">{{ props.label }}</label>
    <ProgressBar :value="percentData" class="bar" :show-value="props.percent >= 10"></ProgressBar>
  </div>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
});

const percentData = ref(0);
let timeout = null;

onMounted(() => {
  startProgress();
});

onBeforeUnmount(() => {
  clearTimeout(timeout);
});

const startProgress = () => {
  timeout = setTimeout(() => {
    percentData.value = props.percent;
  }, 500);
};
</script>

<style scoped>
.container-review-statistics-bar {
  display: flex;
  align-items: center;

  & + & {
    margin-top: 10px;
  }

  label {
    margin-right: 10px;
    font-size: 14px;
    width: 200px;
  }

  .bar {
    flex-grow: 1;
  }
}
</style>
