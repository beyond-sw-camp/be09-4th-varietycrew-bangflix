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
          <Button
            :label="isValidId ? '중복체크 완료' : '중복확인'"
            :disabled="isValidId === true"
            @click="checkDuplicateId"
          />
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
        <label for="confirm-password">비밀번호 확인</label>
        <InputGroup>
          <Password
            id="confirm-password"
            v-model="confirmPassword"
            :invalid="isValidConfirmPassword === false"
            placeholder="비밀번호를 다시 입력해주세요"
            :feedback="false"
            aria-describedby="helper-confirm-password"
          />
        </InputGroup>
        <small
          v-if="helperConfirmPassword"
          id="helper-confirm-password"
          :class="{ error: isValidConfirmPassword === false, success: isValidConfirmPassword === true }"
          >{{ helperConfirmPassword }}</small
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
            :disabled="isCompleteSendEmail"
          />
          <Button v-if="isCompleteSendEmail" label="재전송" @click="retrySendEmail" />
          <Button
            v-else
            label="이메일 인증"
            :loading="isSendingEmail"
            :disabled="isSendingEmail"
            @click="sendEmailVerifyCode"
          />
        </InputGroup>
        <small v-if="helperEmail" :class="{ error: isValidEmail === false, success: isValidEmail === true }">{{
          helperEmail
        }}</small>

        <!-- 이메일 인증코드 입력 -->
        <InputGroup v-if="isCompleteSendEmail" class="mt-xs">
          <InputText
            id="email-code"
            v-model="emailCode"
            placeholder="인증코드를 입력해주세요"
            :invalid="isValidEmailCode === false"
            :disabled="isCompleteVerifyEmail"
          />
          <Button label="인증코드 확인" :disabled="isCompleteVerifyEmail" @click="verifyEmail" />
        </InputGroup>
        <small
          v-if="helperEmailCode"
          :class="{ error: isValidEmailCode === false, success: isValidEmailCode === true }"
          >{{ helperEmailCode }}</small
        >
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
          <Button
            :label="isValidNickname ? '중복체크 완료' : '중복확인'"
            :disabled="isValidNickname === true"
            @click="checkDuplicateNickname"
          />
        </InputGroup>
        <small v-if="helperNickname" :class="{ error: isValidNickname === false, success: isValidNickname === true }">{{
          helperNickname
        }}</small>
      </div>

      <!-- 프로필 사진 업로드 -->
      <div class="input-group mb-xl">
        <label for="profileImage">프로필 사진(선택사항)</label>
        <div class="flex-col gap-10 items-center">
          <img v-if="previewUrl" class="profile-image" :src="previewUrl" />
          <div v-else class="area-empty-image">
            <i class="pi pi-user" style="font-size: 20px"></i>
          </div>
          <Button label="프로필 사진 선택" size="small" severity="secondary" @click="clickUpload" />
          <input ref="profileImageRef" type="file" accept="image/*" style="display: none" @change="changeFile" />
        </div>
      </div>

      <!-- 제출 버튼 -->
      <Button label="회원가입" @click="submitForm" />
    </div>
  </div>
</template>

<script setup>
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { $api } from '@/services/api/api';
import useToastMessage from '@/hooks/useToastMessage';

const router = useRouter();
const { showWarning } = useToastMessage();

const id = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const emailCode = ref('');
const nickname = ref('');
const profileImageRef = ref('');
let profileImageFile = null;
const previewUrl = ref('');

const isValidId = ref(null);
const isValidPassword = ref(null);
const isValidConfirmPassword = ref(null);
const isValidEmail = ref(null);
const isValidEmailCode = ref(null);
const isValidNickname = ref(null);

const helperId = ref('');
const helperPassword = ref('');
const helperConfirmPassword = ref('');
const helperEmail = ref('');
const helperEmailCode = ref('');
const helperNickname = ref('');

const isSendingEmail = ref(false);
const isCompleteSendEmail = ref(false);
const isCompleteVerifyEmail = ref(false);

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
    {
      id: id.value,
    },
    'confirm-id', // 서브 URL
  );

  if (result.duplicate) {
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
    {
      nickname: nickname.value,
    },
    'confirm-nickname', // 서브 URL
  );

  if (result.duplicate) {
    isValidNickname.value = false;
    helperNickname.value = '이미 사용 중인 닉네임입니다.';
  } else {
    isValidNickname.value = true;
    helperNickname.value = '사용가능한 닉네임입니다.';
  }
};

const sendEmailVerifyCode = async () => {
  if (!email.value) {
    isValidEmail.value = false;
    helperEmail.value = '이메일을 입력해주세요.';
    return;
  }

  isSendingEmail.value = true;
  $api.auth.sendEmailVerifyCode(email.value).then(() => {
    isSendingEmail.value = false;
    isCompleteSendEmail.value = true;
    isValidEmail.value = true;
    helperEmail.value = '이메일로 인증코드가 전송되었습니다.';
  });
};

const retrySendEmail = () => {
  isCompleteSendEmail.value = false;
  isCompleteVerifyEmail.value = false;
  email.value = '';
  emailCode.value = '';
};

const verifyEmail = async () => {
  if (!emailCode.value) {
    isValidEmailCode.value = false;
    helperEmailCode.value = '인증코드를 입력해주세요.';
    return;
  }

  $api.auth.verifyEmail(email.value, emailCode.value).then(() => {
    isCompleteVerifyEmail.value = true;
    isValidEmailCode.value = true;
    helperEmailCode.value = '인증완료 되었습니다.';
  });
};

const submitForm = async () => {
  if (!isValidId.value) {
    showWarning('아이디 중복 체크 여부를 확인해주세요.');
    return;
  }

  if (!isValidPassword.value || !isValidConfirmPassword.value) {
    showWarning('비밀번호 입력값을 확인해주세요.');
    return;
  }

  if (!isValidConfirmPassword.value) {
    showWarning('비밀번호 확인 입력값을 확인해주세요.');
    return;
  }

  if (!isValidEmail.value || !isValidEmailCode.value) {
    showWarning('이메일 인증을 진행해주세요.');
    return;
  }

  if (!isValidNickname.value) {
    showWarning('닉네임 중복 체크 여부를 확인해주세요.');
    return;
  }

  const signupData = {
    id: id.value,
    password: password.value,
    nickname: nickname.value,
    email: email.value,
    isAdmin: false,
  };

  const formData = new FormData();
  formData.append('signupDto', new Blob([JSON.stringify(signupData)], { type: 'application/json' }));
  formData.append('imgFile', profileImageFile);

  await $api.auth.post(formData, 'signup');

  // 성공
  router.replace('/login');
};

const changeFile = event => {
  const {
    target: { files },
  } = event;

  // 이전값 삭제
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = '';
  }

  if (profileImageFile) {
    profileImageFile.value = null;
  }

  // 다시 추가
  if (files.length > 0) {
    profileImageFile = files[0];
    previewUrl.value = URL.createObjectURL(profileImageFile);
  }
};

const clickUpload = () => {
  profileImageRef.value.click();
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

  // 패스
  isValidPassword.value = true;
  helperPassword.value = '';

  // 추가 검사
  if (newVal !== confirmPassword.value) {
    isValidConfirmPassword.value = false;
    helperConfirmPassword.value = '두 비밀번호가 다릅니다.';
  }
});

// 비밀번호 확인 입력값 감시하여 helper text와 valid 상태 변경
watch(confirmPassword, newVal => {
  if (!newVal) {
    isValidConfirmPassword.value = null;
    helperConfirmPassword.value = '';
    return;
  }

  if (password.value !== newVal) {
    isValidConfirmPassword.value = false;
    helperConfirmPassword.value = '두 비밀번호가 다릅니다.';
    return;
  }

  // 통과
  isValidConfirmPassword.value = true;
  helperConfirmPassword.value = '';
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

// 이메일 인증코드
watch(emailCode, newVal => {
  isValidEmailCode.value = null;
  helperEmailCode.value = '';
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

  .profile-image,
  .area-empty-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid darkgray;
  }

  .profile-image {
    object-fit: cover;
  }
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
