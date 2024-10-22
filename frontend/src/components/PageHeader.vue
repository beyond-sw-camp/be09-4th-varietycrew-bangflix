<template>
  <header>
    <nav class="menu-bar">
      <div class="start">
        <RouterLink to="/">
          <img src="../assets/logo/bangflix_logo.svg" class="logo" />
        </RouterLink>

        <template v-for="item in items" :key="item.label">
          <Button v-if="item.role === 'ALL'" :label="item.label" text as="router-link" :to="item.route" />
          <Button
            v-else-if="item.role === 'ADMIN' && userStore.isAdmin"
            :label="item.label"
            severity="secondary"
            as="router-link"
            :to="item.route"
          />
        </template>
      </div>

      <div class="end">
        <!-- 로그인 유저 -->
        <template v-if="userStore.nickname">
          <div>{{ userStore.nickname }} 님, 안녕하세요!</div>

          <RouterLink to="/mypage">
            <UserAvatar :image-path="userStore.profileImage" />
          </RouterLink>

          <!-- <OverlayBadge value="2" size="small" severity="danger">
            <RouterLink to="/dm">
              <i class="pi pi-envelope" style="font-size: 1.3rem" />
            </RouterLink>
          </OverlayBadge>

          <OverlayBadge value="2" size="small" severity="danger">
            <RouterLink to="/notification">
              <i class="pi pi-bell" style="font-size: 1.3rem" />
            </RouterLink>
          </OverlayBadge> -->

          <Button label="로그아웃" severity="secondary" size="small" @click="logout()" />
        </template>

        <!-- 게스트 -->
        <template v-else>
          <Button label="로그인" severity="secondary" size="small" as="router-link" to="/login" />
          <Button label="회원가입" size="small" as="router-link" to="/register" />
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
import useToastMessage from '@/hooks/useToastMessage';
import { Helper } from '@/utils/Helper';
import UserAvatar from './common/UserAvatar.vue';

const { showSuccess } = useToastMessage();

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

const logout = () => {
  userStore.logout();
  showSuccess('로그아웃되었습니다.');
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

  position: relative; /* 그림자가 가려지지 않기 위해 설정 */
  z-index: 1; /* 그림자가 가려지지 않기 위해 설정 */

  .start,
  .end {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .end {
    gap: 20px;
  }

  .start {
    .router-link-active {
      font-size: 20px;
      text-decoration: underline;
      text-decoration-thickness: 4px;
      text-decoration-color: rgba(0, 0, 0, 0.2);
      text-underline-offset: -2px;
      position: relative;
      top: -3px;
    }
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
