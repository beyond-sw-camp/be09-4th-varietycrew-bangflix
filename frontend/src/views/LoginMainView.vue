<template>
  <div>
    <Button label="일반 유저 로그인" @click="login()" />
    <Button label="관리자 로그인" severity="secondary" @click="loginByAdmin()" />

    <div class="login-container">
      <div class="login-box">
        <h2>로그인</h2>
        <form @submit.prevent="login">
          <div>
            <label for="id">아이디</label>
            <InputText id="id" v-model="id" type="text" placeholder="아이디를 입력하세요" />
          </div>
          <div>
            <label for="password">비밀번호</label>
            <InputText id="password" v-model="password" type="password" placeholder="비밀번호를 입력하세요" />
          </div>
        </form>
        <Button label="일반 유저 로그인" @click="login()" />
        <div class="signup-link">계정이 없으신가요? <a @click="goToSignup">회원가입하기</a></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { $api } from '@/services/api/api';

const userStore = useUserStore();
const router = useRouter();
const id = ref('');
const password = ref('');

const goHome = () => {
  router.replace('/');
};

const login = async () => {
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
  const userInfo = await $api.user.getAll();

  // userStore에 유저 정보 저장
  userStore.saveUserInfo(userInfo);

  goHome();
};

const loginByAdmin = () => {
  userStore.loginByAdmin();
  goHome();
};

const goToSignup = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #ffffff;
}

.login-box {
  width: 300px;
  height: 500px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
