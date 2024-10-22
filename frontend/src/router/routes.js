import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';

// meta: { requiresAuth: true }, // 인증이 필요한 페이지
// meta: { requiresAdmin: true }, // 관리자 권한이 필요한 페이지
// meta: { guestOnly: true }, // 로그인한 사용자는 접근할 수 없는 페이지

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/rank',
      component: () => import('@/views/RankMainView.vue'),
    },
    {
      path: '/theme',
      component: () => import('@/views/ThemeMainView.vue'),
    },
    {
      path: '/theme/detail/:themeId',
      component: () => import('@/views/theme/ThemeDetailView.vue'),
    },
    {
      path: '/theme/:themeId/create-review',
      component: () => import('@/views/theme/ThemeReviewFormView.vue'),
    },
    {
      path: '/theme/for-you',
      component: () => import('@/views/theme/ThemeForYouView.vue'),
    },
    {
      path: '/board',
      component: () => import('@/views/BoardMainView.vue'),
    },
    {
      path: '/board/detail/:boardId',
      component: () => import('@/views/board/BoardDetailView.vue'),
    },
    {
      path: '/board/form',
      component: () => import('@/views/board/BoardFormView.vue'),
    },
    {
      path: '/event',
      component: () => import('@/views/EventMainView.vue'),
    },
    {
      path: '/event/detail/:eventId',
      component: () => import('@/views/event/EventDetailView.vue'),
    },
    {
      path: '/event/form/:eventId?',
      component: () => import('@/views/event/EventFormView.vue'),
    },
    {
      path: '/notice',
      component: () => import('@/views/NoticeMainView.vue'),
    },
    {
      path: '/notice/detail/:noticeId',
      component: () => import('@/views/notice/NoticeDetailView.vue'),
    },
    {
      path: '/notice/form/:noticeId?',
      component: () => import('@/views/notice/NoticeFormView.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/views/AdminMainView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/admin/MemberListView.vue'),
        },
        {
          path: 'stores',
          component: () => import('@/views/admin/StoreListView.vue'),
        },
        {
          path: 'themes',
          component: () => import('@/views/admin/ThemeListView.vue'),
        },
        {
          path: 'genres',
          component: () => import('@/views/admin/GenreListView.vue'),
        },
        {
          path: 'reports',
          component: () => import('@/views/admin/ReportListView.vue'),
        },
      ],
    },
    {
      path: '/mypage',
      component: () => import('@/views/MyPageView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/member/detail/:memberId',
      component: () => import('@/views/MyPageView.vue'),
    },
    {
      path: '/dm',
      component: () => import('@/views/DMMainView.vue'),
    },
    {
      path: '/notification',
      component: () => import('@/views/NotificationMainView.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/LoginMainView.vue'),
    },
    {
      path: '/register',
      component: () => import('@/views/RegisterMainView.vue'),
    },
    {
      path: '/store',
      component: () => import('@/views/StoreMainView.vue'),
    },
    {
      path: '/store/detail/:storeId',
      component: () => import('@/views/store/StoreDetailView.vue'),
    },
  ],
});

// 라우터 가드 설정
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 인증이 필요한 페이지인지 확인
  if (to.meta.requiresAuth && !userStore.accessToken) {
    // 인증되지 않은 사용자일 경우 로그인 페이지로 리다이렉트
    next('/login');
  }

  // 로그인이 완료된 유저라면
  if (to.meta.guestOnly && userStore.accessToken) {
    next('/');
  }

  // 관리자 권한이 필요한 페이지인지 확인
  else if (to.meta.requiresAdmin && (!userStore.accessToken || !userStore.isAdmin)) {
    // 관리자 권한이 없을 경우 접근 불가
    next('/');
  } else {
    next();
  }
});

export default router;
