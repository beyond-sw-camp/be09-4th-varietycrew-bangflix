<template>
  <PageLayout title="방탈출 테마" class="theme-main-view">
    <FloatLabel variant="in" class="mb-m">
      <InputText id="keyword" v-model="keyword" size="large" fluid />
      <label for="keyword">테마명 검색</label>
    </FloatLabel>

    <div class="flex-row item-center content-between">
      <SelectButton
        v-model="selectedGenres"
        :options="genreOptions"
        option-label="label"
        multiple
        aria-labelledby="장르"
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
    <div class="list-theme">
      <Card v-for="index in 10" :key="index" style="overflow: hidden">
        <template #header>
          <img
            alt="테마 이미지"
            src="https://primefaces.org/cdn/primevue/images/card-vue.jpg"
            height="250"
            width="100%"
            style="object-fit: cover"
          />
        </template>
        <template #title>Advanced Card</template>
        <template #subtitle>Card subtitle</template>
        <template #content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
            cupiditate neque quas!
          </p>
        </template>
        <template #footer>
          <Button label="테마 상세보기" fluid @click="clickTheme" />
        </template>
      </Card>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PageLayout from '@/components/layouts/PageLayout.vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Button from 'primevue/button';

const router = useRouter();

const keyword = ref('');
const selectedGenres = ref([]);
const genreOptions = ref([
  { label: '공포', value: 1 },
  { label: '추리', value: 2 },
  { label: '드라마', value: 3 },
  { label: '판타지', value: 3 },
  { label: 'SF', value: 3 },
  { label: '로맨스', value: 3 },
  { label: '감성', value: 3 },
  { label: '퓨전사극', value: 3 },
  { label: '힐링', value: 3 },
]);
const selectedSorting = ref({ name: '최신 순', value: 'RECENT' });
const sortingOptions = ref([
  { name: '최신 순', value: 'RECENT' },
  { name: '리뷰 많은 순', value: 'REVIEW_DESC' },
  { name: '좋아요 많은 순', value: 'LIKE_DESC' },
  { name: '스크랩 많은 순', value: 'SCRAP_DESC' },
]);

const clickTheme = () => {
  router.push('/theme/detail/2');
};
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
