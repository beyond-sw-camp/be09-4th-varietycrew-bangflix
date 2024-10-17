import { createRouter, createWebHistory } from 'vue-router';

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

export default router;
