<template>
  <div class="container">
    <div class="top-area">
      <h1>{{ props.title }}</h1>
      <Button
        v-if="props.btnTxt && (props.btnRole === 'ALL' || (props.btnRole === 'ADMIN' && userStore.isAdmin))"
        :label="props.btnTxt"
        size="small"
        @click="emit('clickBtn')"
      />
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useUserStore } from '@/stores/user';
import Button from 'primevue/button';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  // btnTxt: 오른쪽 상단에 위치한 버튼
  btnTxt: {
    type: String,
    default: '',
  },

  // btnRole: 오른쪽 상단 버튼의 권한(모두에게 보일지 어드민에게만 보일지)
  // : "ADMIN", "ALL"
  btnRole: {
    type: String,
    default: 'ADMIN',
  },
});
const emit = defineEmits(['clickBtn']);

const userStore = useUserStore();
</script>

<style scoped>
.container {
  padding: 64px 48px;

  .top-area {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
  }
}
</style>
