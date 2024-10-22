<template>
  <PageLayout title="이벤트" btn-txt="글 작성" btn-role="ADMIN" @click-btn="goEventForm">
    <h3>할인 테마</h3>
    <div class="sub-title">테마 별 할인 정보를 제공합니다. 지금이 제일 저렴할 때!</div>
    <template v-if="discountEvents.length > 0">
      <EventPostCardList :event-posts="discountEvents" />
    </template>
    <template v-else> 이벤트가 존재하지 않습니다. </template>

    <h3>신규 테마</h3>
    <div class="sub-title">새로운 방탈출 게임을 소개합니다.</div>
    <template v-if="newThemeEvents.length > 0">
      <EventPostCardList :event-posts="newThemeEvents" />
    </template>
    <template v-else> 이벤트가 존재하지 않습니다. </template>
  </PageLayout>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import router from '@/router/routes';
import { $api } from '@/services/api/api';
import EventPostCardList from '@/components/event/EventPostCardList.vue';

const goEventForm = () => {
  router.push('/event/form/');
};

const events = ref([]);

const discountEvents = computed(() => {
  return events.value.find(category => category.category === 'discount')?.eventList || [];
});

const newThemeEvents = computed(() => {
  return events.value.find(category => category.category === 'newTheme')?.eventList || [];
});

const fetchEvents = async () => {
  const response = await $api.event.getEvents();
  events.value = response;
};

// watch(
//   async () => {
//     await fetchEvents();
//   },
//   { immediate: true },
// );

onMounted(fetchEvents);
</script>

<style scoped>
h3 {
  margin-top: 50px;
}
.sub-title {
  margin-top: 10px;
}
/* .event-card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}*/

.event-card {
  cursor: pointer;
}

/* 카드에 대한 스타일 */
.theme-card {
  cursor: pointer;
}

/* 태그 스타일 */
.tag-order {
  margin-bottom: 10px;
}

& + & {
  margin-top: 4px;
}
</style>
