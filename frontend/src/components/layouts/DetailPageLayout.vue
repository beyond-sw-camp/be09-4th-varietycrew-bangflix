<template>
  <div class="container">
    <div class="top-area">
      <Button label="돌아가기" text icon="pi pi-arrow-left" @click="goBack" />
      <div class="buttons">
        <template v-if="props.btnRole === 'ALL' || (props.btnRole === 'ADMIN' && userStore.isAdmin)">
          <ConfirmDialog></ConfirmDialog>
          <Button label="수정" size="small" class="edit" @click="clickBtn('edit')" />
          <Button label="삭제" size="small" class="delete" @click="clickBtn('delete')" />
        </template>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

const props = defineProps({
  // btnRole: 오른쪽 상단 버튼의 권한(모두에게 보일지 어드민에게만 보일지)
  // : "ADMIN", "ALL"
  btnRole: {
    type: String,
    default: 'ADMIN',
  },
});
const emit = defineEmits(['update']);

const clickBtn = actionType => {
  emit('update', actionType);
};

const goBack = () => {
  router.back();
};

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

.edit {
  background-color: black;
  color: white;
  margin-right: 10px;
}
.edit:hover {
  background-color: grey;
  border: grey solid 1px;
  color: white;
}

.delete {
  background-color: white;
  border: red solid 1px;
  color: red;
}
.delete:hover {
  background-color: red;
  border: red solid 1px;
  color: white;
}
</style>
