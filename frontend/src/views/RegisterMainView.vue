<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2 class="mb-l">회원가입</h2>

      <!-- 아이디 입력 및 중복 확인 -->
      <div class="input-group">
        <label for="id">아이디</label>
        <InputGroup>
          <InputText
            v-model="id"
            placeholder="아이디를 입력해주세요"
            :invalid="isValidId === false"
            aria-describedby="helper-id"
          />
          <Button label="중복확인" @click="checkDuplicateId" />
        </InputGroup>
        <small v-if="helperId" id="helper-id" :class="{ error: isValidId === false, success: isValidId === true }">{{
          helperId
        }}</small>
      </div>

      <div class="input-group">
        <label for="password">비밀번호</label>
        <InputGroup>
          <InputText v-model="group" placeholder="비밀번호를 입력해주세요" />
        </InputGroup>
      </div>

      <div class="input-group">
        <label for="checkPassword">비밀번호 확인</label>
        <InputGroup>
          <InputText v-model="checkPassword" :invalid="!checkPassword" placeholder="비밀번호를 입력해주세요" />
        </InputGroup>
      </div>

      <div class="input-group">
        <label for="email">이메일</label>
        <InputGroup>
          <InputText v-model="email" placeholder="이메일을 입력해주세요" />
          <Button label="이메일 인증" @click="checkDuplicateEmail('email')" />
        </InputGroup>
        <small v-if="isValidEmail" class="success-message">이메일 중복확인이 완료되었습니다</small>
      </div>

      <div class="input-group">
        <label for="nickname">닉네임</label>
        <InputGroup>
          <InputText v-model="nickname" placeholder="닉네임을 입력해주세요" />
          <Button label="중복확인" @click="checkDuplicateNickname('nickname')" />
        </InputGroup>
        <small v-if="isValidNickname" class="success-message">이메일 중복확인이 완료되었습니다</small>
      </div>

      <!-- 프로필 사진 업로드 -->
      <div class="input-group">
        <label for="profileImage">프로필 사진</label>
        <FileUpload
          name="profilePicture"
          url="./upload"
          accept="image/*"
          mode="basic"
          auto
          choose-label="프로필 사진 업로드"
        />
      </div>

      <!-- 제출 버튼 -->
      <Button label="회원가입" @click="submitForm" />
    </div>
  </div>
</template>

<script setup>
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { $api } from '@/services/api/api';

const router = useRouter();

const id = ref('');
const password = ref('');
const checkPassword = ref('');
const email = ref('');
const nickname = ref('');
const profileImage = ref('');

const isValidId = ref(null);
const isVaildEmail = ref(null);
const isVaildNickname = ref(null);
const helperId = ref('');

const goLogin = () => {
  router.replace('/login');
};

const signup = async () => {};

const checkDuplicateId = async () => {
  if (!id.value) {
    isValidId.value = false;
    helperId.value = '아이디를 입력해주세요.';
    return;
  }

  // 아이디 유효성 검사
  const checkId = await $api.auth.post(
    { id: id.value },
    'confirm-id', // 서브 URL
  );

  if (checkId.isDuplicate) {
    alert('아이디가 이미 사용 중입니다.');
    isValidId.value = false;
  } else {
    alert('아이디가 사용 가능합니다.');
    isValidId.value = true;
  }
};

const checkDuplicateNickname = async () => {
  const response = await fetch(`http://your-server-url.com/check-duplicate?field=username&value=${username.value}`);
  const data = await response.json();

  if (data.isDuplicate) {
    alert('아이디가 이미 사용 중입니다.');
    isValidId.value = false;
  } else {
    alert('아이디가 사용 가능합니다.');
    isValidId.value = true;
  }
};

const checkDuplicateEmail = async () => {
  const response = await fetch(`http://your-server-url.com/check-duplicate?field=username&value=${username.value}`);
  const data = await response.json();

  if (data.isDuplicate) {
    alert('아이디가 이미 사용 중입니다.');
    isValidId.value = false;
  } else {
    alert('아이디가 사용 가능합니다.');
    isValidId.value = true;
  }
};

const submitForm = () => {
  if (this.password !== this.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  console.log('Form submitted:', {
    username: this.username,
    email: this.email,
    nickname: this.nickname,
    password: this.password,
    profilePicture: this.profilePicture,
  });
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f4f4f4;
}

.signup-box {
  width: 350px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 28px;

  label {
    margin-bottom: 4px;
    display: block;
  }

  small {
    font-size: 0.875rem; /* 작은 텍스트로 설정 */

    &.success {
      color: green;
    }
    &.error {
      color: red;
    }
  }
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.p-fileupload-content {
  width: 100%;
}
</style>
