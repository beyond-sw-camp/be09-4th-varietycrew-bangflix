<template>
  <div class="login-container">
    <!-- <Button label="일반 유저 로그인" @click="login()" />
    <Button label="관리자 로그인" severity="secondary" @click="loginByAdmin()" /> -->

    <div class="login-box">
      <h2 class="mb-l">로그인</h2>
      <form class="mb-l" @submit.prevent="login">
        <div class="mb-s">
          <label for="login-id">아이디</label>
          <InputText
            id="login-id"
            v-model="id"
            type="text"
            placeholder="아이디를 입력하세요"
            aria-describedby="helper-id"
            fluid
          />
          <small v-if="helperId" id="helper-id">{{ helperId }}</small>
        </div>

        <div>
          <label for="password">비밀번호</label>
          <Password
            id="password"
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            aria-describedby="helper-password"
            :feedback="false"
            fluid
          />
          <small v-if="helperPassword" id="helper-password">{{ helperPassword }}</small>
        </div>
      </form>

      <Button label="로그인" fluid @click="login" />
      <div class="signup-link">계정이 없으신가요? <a href="/register">회원가입하기</a></div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { $api } from '@/services/api/api';
import Password from 'primevue/password';

const userStore = useUserStore();
const router = useRouter();

const id = ref('');
const password = ref('');
const helperId = ref('');
const helperPassword = ref('');

const goHome = () => {
  router.replace('/');
};

const login = async () => {
  if (!id.value || !password.value) {
    if (!id.value) {
      helperId.value = '아이디를 입력해주세요';
    }

    if (!password.value) {
      helperPassword.value = '비밀번호를 입력해주세요';
    }

    return;
  }

  // 기존의 정보 만료
  userStore.logout();

  // 토큰 발급
  const userTokens = await $api.auth.post(
    {
      id: id.value,
      password: password.value,
    },
    'login', // 서브 URL
  );

  // userStore에 발급된 토큰 저장
  userStore.saveTokens(userTokens);

  // 회원 정보 가져오기
  const userInfo = await $api.user.get('info');

  // userStore에 유저 정보 저장
  userStore.saveUserInfo(userInfo);

  goHome();
};

const loginByAdmin = () => {
  userStore.loginByAdmin();
  goHome();
};

watch(id, () => {
  helperId.value = '';
});

watch(password, () => {
  helperPassword.value = '';
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ffffff;
}

.login-box {
  width: 500px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    display: block;
  }

  small {
    color: red;
  }
}

#login {
  margin-top: 150px;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-link a {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.signup-link a:hover {
  color: #0056b3;
}
</style>
