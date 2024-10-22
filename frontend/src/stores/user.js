import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref('');
    const nickname = ref('');
    const accessToken = ref('');
    const refreshToken = ref('');
    const isAdmin = ref(false);
    const isLoggined = ref(false);
    const profileImage = ref('');

    function login() {
      id.value = 1;
      nickname.value = '프로방탈출러';
      accessToken.value = 'fakeaccesstoken';
      isAdmin.value = false;
      isLoggined.value = true;
    }

    function loginByAdmin() {
      id.value = 10;
      nickname.value = '나는관리자야';
      accessToken.value = 'fakeadminaccesstoken';
      isAdmin.value = true;
      isLoggined.value = true;
    }

    function logout() {
      id.value = 0;
      nickname.value = '';
      accessToken.value = '';
      refreshToken.value = '';
      isAdmin.value = false;
      isLoggined.value = false;
      profileImage.value = null;
    }

    function saveTokens(userTokens) {
      accessToken.value = userTokens.accessToken;
      refreshToken.value = userTokens.refreshToken;
      isLoggined.value = true;
    }

    function saveUserInfo(userInfo) {
      id.value = userInfo.id;
      nickname.value = userInfo.nickname;
      isAdmin.value = userInfo.isAdmin;
      profileImage.value = userInfo.image;
    }

    function setToken(accessToken) {
      accessToken.value = accessToken;
    }

    return {
      id,
      nickname,
      accessToken,
      refreshToken,
      isAdmin,
      isLoggined,
      profileImage,
      login,
      loginByAdmin,
      logout,
      saveTokens,
      saveUserInfo,
      setToken,
    };
  },
  {
    persist: true,
  },
);
