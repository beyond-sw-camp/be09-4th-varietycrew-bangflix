<template>
  <PageLayout title="방탈출 테마" class="theme-main-view">
    <FloatLabel variant="in" class="mb-m">
      <InputText id="keyword" v-model="keyword" size="large" fluid />
      <label for="keyword">테마명 검색</label>
    </FloatLabel>

    <div class="flex-row item-center content-between">
      <SelectButton
        :model-value="selectedGenres"
        :options="genreOptions"
        option-label="label"
        multiple
        aria-labelledby="장르"
        @change="changeGenre($event)"
      />

      <Select
        v-model="selectedSorting"
        :options="sortingOptions"
        option-label="name"
        placeholder="정렬기준"
        checkmark
        :highlight-on-select="false"
      />
    </div>

    <Divider />

    <!-- 검색 결과 목록 -->
    <LoadingView v-if="isFirstLoading" />
    <template v-else>
      <div class="list-theme mb-l">
        <ThemeCard v-for="theme in resultThemes" :key="theme.themeCode" :theme="theme" next-page="THEME" />
      </div>
      <Button label="더보기" fluid severity="secondary" :loading="isMoreLoading" @click="clickMoreThemes" />
    </template>
  </PageLayout>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import { $api } from '@/services/api/api';
import ThemeCard from '@/components/cards/ThemeCard.vue';
import LoadingView from '@/components/common/LoadingView.vue';

const keyword = ref('');
const selectedGenres = ref([]);
const genreOptions = ref([]);
const selectedSorting = ref({ name: '최신 순', value: '' });
const sortingOptions = ref([
  { name: '최신 순', value: '' },
  { name: '리뷰 많은 순', value: 'review' },
  { name: '좋아요 많은 순', value: 'like' },
  { name: '스크랩 많은 순', value: 'scrap' },
]);
const resultThemes = ref([]); // 검색 결과로 나온 테마 목록
const isFirstLoading = ref(false);
const isMoreLoading = ref(false);
let currentPage = 0;

let debounce = null;

const searchThemes = async (themeName, genres, filter) => {
  if (currentPage < 1) {
    isFirstLoading.value = true;
  } else {
    isMoreLoading.value = true;
  }

  const foundThemes = await $api.theme.searchThemes({
    themeName,
    genres: genres.map(e => e.label), // 장르 이름
    filter: filter.value,
    page: currentPage,
  });

  isFirstLoading.value = false;
  isMoreLoading.value = false;
  resultThemes.value = resultThemes.value.concat(foundThemes); // 데이터 받은 것 추가
};

const changeGenre = event => {
  if (event.value.length < 1) {
    return;
  }

  selectedGenres.value = event.value;
};

const clickMoreThemes = () => {
  currentPage += 1;
  searchThemes(keyword.value, selectedGenres.value, selectedSorting.value);
};

const resetPage = () => {
  currentPage = 0;
  resultThemes.value = [];
};

onMounted(async () => {
  // 1. 전체 장르 목록 표시
  const genres = await $api.theme.getGenres();

  // 장르 옵션 목록 만들기
  const options = genres.map(genre => ({
    value: genre.genreCode,
    label: genre.name,
  }));

  genreOptions.value = options;

  // default 장르 선택
  if (options.length > 0) {
    selectedGenres.value = [options[0]];
  }
});

// 장르가 변경되면 테마 검색
watch(selectedGenres, newVal => {
  resetPage();
  searchThemes(keyword.value, newVal, selectedSorting.value);
});

// 키워드가 변경되면 테마 검색
watch(keyword, newVal => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(() => {
    resetPage();
    searchThemes(newVal, selectedGenres.value, selectedSorting.value);
  }, 500);
});

// 정렬기준이 변경되면 테마 검색
watch(selectedSorting, newVal => {
  resetPage();
  searchThemes(keyword.value, selectedGenres.value, newVal);
});

onBeforeUnmount(() => {
  if (debounce) {
    clearTimeout(debounce);
  }
});
</script>

<style scoped>
.theme-main-view {
  .list-theme {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
}
</style>
