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
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            placeholder="비밀번호를 입력해주세요"
            :invalid="isValidPassword === false"
            aria-describedby="helper-password"
          />
        </InputGroup>
        <small
          v-if="helperPassword"
          id="helper-password"
          :class="{ error: isValidPassword === false, success: isValidPassword === true }"
          >{{ helperPassword }}</small
        >
      </div>

      <div class="input-group">
        <label for="check-password">비밀번호 확인</label>
        <InputGroup>
          <Password
            id="check-password"
            v-model="checkPassword"
            :invalid="isValidCheckPassword === false"
            placeholder="비밀번호를 다시 입력해주세요"
            :feedback="false"
            aria-describedby="helper-check-password"
          />
        </InputGroup>
        <small
          v-if="helperCheckPassword"
          id="helper-check-password"
          :class="{ error: isValidCheckPassword === false, success: isValidCheckPassword === true }"
          >{{ helperCheckPassword }}</small
        >
      </div>

      <div class="input-group">
        <label for="email">이메일</label>
        <InputGroup>
          <InputText
            id="email"
            v-model="email"
            placeholder="이메일을 입력해주세요"
            type="email"
            :invalid="isValidEmail === false"
          />
          <Button label="이메일 인증" @click="checkDuplicateEmail" />
        </InputGroup>
        <small v-if="helperEmail" :class="{ error: isValidEmail === false, success: isValidEmail === true }">{{
          helperEmail
        }}</small>
      </div>

      <div class="input-group">
        <label for="nickname">닉네임</label>
        <InputGroup>
          <InputText
            id="nickname"
            v-model="nickname"
            placeholder="닉네임을 입력해주세요"
            :invalid="isValidNickname === false"
          />
          <Button label="중복확인" @click="checkDuplicateNickname" />
        </InputGroup>
        <small v-if="helperNickname" :class="{ error: isValidNickname === false, success: isValidNickname === true }">{{
          helperNickname
        }}</small>
      </div>

      <!-- 프로필 사진 업로드 -->
      <div class="input-group">
        <label for="profileImage">프로필 사진(선택)</label>
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

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { $api } from '@/services/api/api';
import useToastMessage from '@/hooks/useToastMessage';

const router = useRouter();
const { showWarning } = useToastMessage();

const id = ref('');
const password = ref('');
const checkPassword = ref('');
const email = ref('');
const nickname = ref('');
const profileImage = ref('');

const isValidId = ref(null);
const isValidPassword = ref(null);
const isValidCheckPassword = ref(null);
const isValidEmail = ref(null);
const isValidNickname = ref(null);

const helperId = ref('');
const helperPassword = ref('');
const helperCheckPassword = ref('');
const helperEmail = ref('');
const helperNickname = ref('');

// 영문/숫자/특수문자 포함해서 8자 이상
const regexPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// 아이디 중복 검사
const checkDuplicateId = async () => {
  if (!id.value) {
    isValidId.value = false;
    helperId.value = '아이디를 입력해주세요.';
    return;
  }

  const result = await $api.auth.post(
    id.value,
    'confirm-id', // 서브 URL
  );

  if (result.isDuplicate) {
    isValidId.value = false;
    helperId.value = '이미 사용 중인 아이디입니다.';
  } else {
    isValidId.value = true;
    helperId.value = '사용가능한 아이디입니다.';
  }
};

// 닉네임 중복 검사
const checkDuplicateNickname = async () => {
  if (!nickname.value) {
    isValidNickname.value = false;
    helperNickname.value = '닉네임을 입력해주세요.';
    return;
  }

  const result = await $api.auth.post(
    nickname.value,
    'confirm-nickname', // 서브 URL
  );

  if (result.isDuplicate) {
    isValidNickname.value = false;
    helperNickname.value = '이미 사용 중인 닉네임입니다.';
  } else {
    isValidNickname.value = true;
    helperNickname.value = '사용가능한 닉네임입니다.';
  }
};

const checkDuplicateEmail = async () => {
  if (!email.value) {
    isValidEmail.value = false;
    helperEmail.value = '이메일을 입력해주세요.';
    return;
  }
  // const result = await $api.auth.post();
  // if (result.isDuplicate) {
  //   isValidEmail.value = false;
  //   helperEmail.value = '이메일이 이미 사용 중입니다.';
  // } else {
  //   isValidId.value = true;
  //   helperEmail.value = '사용가능한 이메일입니다.';
  // }
};

const submitForm = async () => {
  if (
    !isValidId.value ||
    !isValidPassword.value ||
    !isValidCheckPassword.value ||
    !isValidEmail.value ||
    !isValidNickname.value
  ) {
    showWarning('입력값 확인 필요', '입력 상태를 확인해주세요.');
    return;
  }

  const formData = new FormData();
  formData.append('signupDto', {
    id: id.value,
    password: password.value,
    nickname: nickname.value,
    email: email.value,
    isAdmin: false,
  });
  formData.append('imgFile', null);

  await $api.auth.post(formData, 'signup', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // 성공
  router.push('/login');
};

// 비밀번호 입력값 감시하여 helper text와 valid 상태 변경
watch(password, newVal => {
  if (!newVal) {
    isValidPassword.value = null;
    helperPassword.value = '';
    return;
  }

  if (!regexPassword.test(newVal)) {
    isValidPassword.value = false;
    helperPassword.value = '영문/숫자/특수문자 포함 8자리 이상 입력해주세요.';
    return;
  }

  // 일치할 때
  isValidPassword.value = true;
  helperPassword.value = '';
});

// 비밀번호 확인 입력값 감시하여 helper text와 valid 상태 변경
watch(checkPassword, newVal => {
  if (!newVal) {
    isValidCheckPassword.value = null;
    helperCheckPassword.value = '';
    return;
  }

  if (password.value !== newVal) {
    isValidCheckPassword.value = false;
    helperCheckPassword.value = '두 비밀번호가 다릅니다.';
    return;
  }

  // 통과
  isValidCheckPassword.value = true;
  helperCheckPassword.value = '';
});

// 아이디 입력값 감시하여 helper text와 valid 상태 변경
watch(id, newVal => {
  isValidId.value = null;
  helperId.value = '';
});

// 이메일 입력값 감시하여 helper text와 valid 상태 변경
watch(email, newVal => {
  if (!newVal) {
    isValidEmail.value = null;
    helperEmail.value = '';
    return;
  }

  if (!regexEmail.test(newVal)) {
    isValidEmail.value = false;
    helperEmail.value = '이메일 형식이 아닙니다.';
    return;
  }

  isValidEmail.value = true;
  helperEmail.value = '';
});

// 닉네임 입력값 감시하여 helper text와 valid 상태 변경
watch(nickname, newVal => {
  isValidNickname.value = null;
  helperNickname.value = '';
});
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
  width: 500px;
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
    color: darkgray;

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
