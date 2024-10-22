<template>
  <div class="like-container">
    <template v-if="props.isUserLike">
      <i class="pi pi-heart-fill" @click="emit('handleDeactivate')" />
    </template>
    <template v-else>
      <i class="pi pi-heart" @click="emit('handleActive')" />
    </template>
    <div class="count">{{ props.count }}</div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const liked = ref(false);

const props = defineProps({
  isUserLike: {
    type: Boolean,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['handleDeactivate', 'handleActive']);
</script>

<style scoped>
.like-container {
  display: flex;
  align-items: center;
}
.pi {
  margin-right: 5px;
  cursor: pointer;
}
</style>
