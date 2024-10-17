<template>
  <div class="upload-image">
    <label for="">이미지 업로드</label>
    <span class="helper-text">최대 {{ maxCnt }}장까지 가능</span>
    <Button label="파일 선택" severity="secondary" @click="clickUpload" />
    <ul v-if="previewUrls.length > 0">
      <li v-for="(url, index) in previewUrls" :key="url">
        <Image :src="url" width="150" height="150" preview image-style="object-fit: cover;" />
        <Button
          icon="pi pi-times"
          severity="secondary"
          rounded
          raised
          aria-label="삭제"
          class="btn-remove"
          @click="clickRemove(index)"
        />
      </li>
    </ul>
    <input ref="refInputFile" type="file" multiple accept="image/*" style="display: none" @change="changeFile" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { defineProps } from 'vue';
import useToastMessage from '@/hooks/useToastMessage';

const props = defineProps({
  currentCnt: {
    type: Number,
    required: true,
  },
  currentFiles: {
    type: Array,
    required: true,
  },
});

// onChangeFiles: 생성, 삭제가 완료된(처리가 완료된) 전체 이미지 파일 배열을 넘겨주기 위해 사용
const emit = defineEmits(['onChangeFiles']);

const { showWarning } = useToastMessage();

const maxCnt = ref(5);
const previewUrls = ref([]);
const refInputFile = ref(null);

const clickUpload = () => {
  refInputFile.value.click();
};

const changeFile = event => {
  const {
    target: { files },
  } = event;
  const length = files.length;
  const newFiles = [...props.currentFiles];
  const newPreviewUrls = [...previewUrls.value];

  if (props.currentCnt + length > maxCnt.value) {
    showWarning('최대 개수 초과', `최대 ${maxCnt.value}장까지 업로드 가능합니다.`);
    return;
  }

  for (let i = 0; i < length; i++) {
    const file = files[i];
    newFiles.push(file);
    newPreviewUrls.push(URL.createObjectURL(file)); // 프리뷰 이미지 생성
  }

  emit('onChangeFiles', newFiles);
  previewUrls.value = newPreviewUrls;
};

const clickRemove = targetIndex => {
  // 프리뷰 이미지 삭제
  previewUrls.value = previewUrls.value.filter((url, index) => {
    if (index === targetIndex) {
      URL.revokeObjectURL(url);
    } else {
      return url;
    }
  });

  // 파일 삭제
  const newFiles = [...props.currentFiles].filter((file, index) => index !== targetIndex);
  emit('onChangeFiles', newFiles);
};

onBeforeUnmount(() => {
  // 프리뷰 이미지 객체 할당 해제
  previewUrls.value.forEach(url => {
    URL.revokeObjectURL(url);
  });
});
</script>

<style scoped>
.upload-image {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .helper-text {
    color: #757575;
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 16px;
    display: flex;
    gap: 24px;

    li {
      position: relative;
    }

    .btn-remove {
      position: absolute;
      top: -16px;
      right: -16px;
    }
  }
}
</style>
