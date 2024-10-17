<template>
  <FormPageLayout :title="title" @click-save="saveEvent">
    <div class="select-event-category-container">
      <label class="label" for="select-category">이벤트 카테고리 선택</label>
      <Select
        v-model="selectedCategory"
        :options="categories"
        option-label="category"
        checkmark
        class="select-category"
      />
    </div>
    <div class="search-theme-container">
      <label class="label" for="search-theme">방탈출 테마 선택</label>
      <Select
        v-model="selectedTheme"
        :options="themes"
        filter
        option-label="theme"
        placeholder="테마 검색"
        class="search-theme"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="">
            <div>{{ slotProps.value.theme }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="">
            <div>{{ slotProps.option.theme }}</div>
          </div>
        </template>
      </Select>
    </div>
    <div class="content-container">
      <label class="label" for="content">내용</label>
      <Textarea v-model="inputContent" class="content" rows="15" placeholder="이벤트 내용을 입력해주세요" />
    </div>
    <div class="image-container">
      <p>이미지 업로드</p>
      <label class="image-upload-label" for="file-upload-button">최대 5장까지 가능</label>
      <Button class="file-upload-button" label="Secondary" severity="secondary" @click="triggerFileUpload">
        파일 선택
      </Button>
      <input ref="fileInput" style="display: none" type="file" accept="image/*" multiple @change="handleFileUpload" />
    </div>

    <div v-if="images" class="image-preview-container">
      <div v-for="(image, index) in images" :key="index" class="preview-image">
        <img :src="image.url" class="preview-image" alt="미리보기 이미지" />
        <button class="delete-button" @click="removeImage(index)">X</button>
      </div>
    </div>
  </FormPageLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import FormPageLayout from '@/components/layouts/FormPageLayout.vue';
import useToastMessage from '@/hooks/useToastMessage';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { useRoute } from 'vue-router';

const route = useRoute();
const eventId = ref(route.params.eventId);
const isEditMode = ref(false);
const title = ref('');
const { showSuccess, showError, showWarning } = useToastMessage();

const inputContent = ref('');
const fileInput = ref(null);
const images = ref([]);

const selectedCategory = ref({ category: '신규 테마' });
const selectedTheme = ref();

const categories = ref([{ category: '신규 테마' }, { category: '할인 테마' }]);

const themes = ref([
  { theme: '종결사건' },
  { theme: 'Tempo Rubato' },
  { theme: 'WANNA GO HOME' },
  { theme: 'US' },
  { theme: '호텔 레토' },
  { theme: '호텔 네드토' },
  { theme: '네드' },
  { theme: '그림자 없는 상자' },
  { theme: '꼬레아 우라' },
]);

const triggerFileUpload = () => {
  fileInput.value.click();
};

const removeImage = index => {
  images.value.splice(index, 1);
};

const handleFileUpload = event => {
  const files = event.target.files;
  if (files.length + images.value.length > 5) {
    showError('최대 이미지 초과', '최대 5장의 이미지만 업로드 가능합니다.');
    return;
  }

  for (const file of files) {
    // 서버로 이미지 업로드 요청
    images.value.push({
      file,
      url: 'https://github.com/user-attachments/assets/04e68ff8-44ad-4b43-b5f0-9fa1c6704842',
    });
  }
};

const saveEvent = () => {
  console.log('selectedTheme: ', selectedTheme.value);
  console.log('selectedCategory: ', selectedCategory.value);
  showSuccess('작성완료!', '성공적으로 게시글이 등록되었습니다.');
  // router.push('/event');
};

onMounted(() => {
  if (eventId.value) {
    title.value = '이벤트 수정';
    isEditMode.value = true;
  } else {
    title.value = '이벤트 등록';
    isEditMode.value = false;
  }
});
// if()
</script>

<style scoped>
label {
  margin-bottom: 10px;
}

.select-event-category-container {
  display: flex;
  flex-direction: column;
}

.select-category {
  width: 200px;
}

.search-theme-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.search-theme {
  width: 500px;
}

.content-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}
.content {
  width: 100%;
  margin-top: 10px;
  resize: none;
  padding: 15px;
}

.image-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}
.image-upload-label {
  color: #757575;
}
.file-upload-button {
  width: 100px;
  margin-top: 10px;
  border: 1px solid;
}

.image-preview-container {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.preview-image {
  width: 100px;
  height: 100px;
  margin-inline: 10px;
  position: relative;
}
.delete-button {
  position: absolute;
  width: 25px;
  height: 25px;
  top: -10px;
  right: -10px;
  background-color: #e3e3e3;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 5px;
}
</style>
