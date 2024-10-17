<template>
  <FormPageLayout title="커뮤니티 글 등록" @click-save="saveBoard">
    <div class="title-container">
      <label class="label" for="title">제목</label>
      <InputText v-model="inputTitle" class="title" type="text" placeholder="제목을 입력해주세요." />
    </div>
    <div class="content-container">
      <label class="label" for="content">내용</label>
      <Textarea
        v-model="inputContent"
        class="content"
        rows="15"
        placeholder="내용을 입력해주세요. &#10;스포일러에 대한 내용을 작성할 경우 법적으로 조치가 들어갈 수 있습니다."
      />
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
import { ref, onMounted } from 'vue';
import FormPageLayout from '@/components/layouts/FormPageLayout.vue';
import useToastMessage from '@/hooks/useToastMessage';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { useRouter } from 'vue-router';

const router = useRouter();
const inputTitle = ref('');
const inputContent = ref('');
const fileInput = ref(null);
const images = ref([]);

const { showSuccess, showError, showWarning } = useToastMessage();

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
const saveBoard = () => {
  console.log('inputTitle.value: ', inputTitle);
  console.log('inputContent.value: ', inputContent);
  showSuccess('작성완료!', '성공적으로 게시글이 등록되었습니다.');
  router.push('/board');
};
</script>

<style scoped>
.title-container {
  display: flex;
  flex-direction: column;
}
.title {
  width: 100%;
  margin-top: 10px;
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
