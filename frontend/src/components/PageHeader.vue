<template>
  <header>
    <nav class="menu-bar">
      <div class="start">
        <RouterLink to="/">
          <img src="../assets/logo/bangflix_logo.svg" class="logo" />
        </RouterLink>

        <template v-for="item in items" :key="item.label">
          <RouterLink :to="item.route">
            <Button v-if="item.role === 'ALL'" :label="item.label" text />
            <Button v-else-if="item.role === 'ADMIN' && userStore.isAdmin" :label="item.label" severity="secondary" />
          </RouterLink>
        </template>
      </div>

      <div class="end">
        <!-- 로그인 유저 -->
        <template v-if="userStore.nickname">
          <div>{{ userStore.nickname }} 님, 안녕하세요!</div>

          <RouterLink to="/mypage">
            <Avatar icon="pi pi-user" size="large" shape="circle" />
          </RouterLink>

          <OverlayBadge value="2" size="small" severity="danger">
            <RouterLink to="/dm">
              <i class="pi pi-envelope" style="font-size: 1.3rem" />
            </RouterLink>
          </OverlayBadge>

          <OverlayBadge value="2" size="small" severity="danger">
            <RouterLink to="/notification">
              <i class="pi pi-bell" style="font-size: 1.3rem" />
            </RouterLink>
          </OverlayBadge>

          <Button label="로그아웃" severity="secondary" size="small" @click="logout()" />
        </template>

        <!-- 게스트 -->
        <template v-else>
          <Button label="로그인" severity="secondary" size="small" @click="goLoginPage" />
          <Button label="회원가입" size="small" @click="goRegisterPage" />
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import OverlayBadge from 'primevue/overlaybadge';

const items = ref([
  {
    label: '홈',
    route: '/',
    role: 'ALL',
  },
  {
    label: '랭킹',
    route: '/rank',
    role: 'ALL',
  },
  {
    label: '방탈출 테마',
    route: '/theme',
    role: 'ALL',
  },
  {
    label: '커뮤니티',
    route: '/board',
    role: 'ALL',
  },
  {
    label: '이벤트',
    route: '/event',
    role: 'ALL',
  },
  {
    label: '공지사항',
    route: '/notice',
    role: 'ALL',
  },
  {
    label: '관리자',
    route: '/admin',
    role: 'ADMIN',
  },
]);

const userStore = useUserStore();
const router = useRouter();

const goLoginPage = () => {
  router.push('/login');
};

const goRegisterPage = () => {
  router.push('/register');
};

const logout = () => {
  userStore.logout();
  router.replace('/');
};
</script>

<style scoped>
.menu-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 28px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  .start,
  .end {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .end {
    gap: 20px;
  }
}

.logo {
  width: 49px;
  height: 49px;
  margin-right: 20px;
}

.pi-envelope {
  border: none;
  background: #ffffff;
}

.pi-bell {
  border: none;
  background: #ffffff;
}
</style>
