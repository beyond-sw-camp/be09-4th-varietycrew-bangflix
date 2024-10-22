<template>
  <section class="section-home-view">
    <AppTypography type="title3" color="white" class="mb-l">{{ props.sectionTitle }}</AppTypography>
    <ul>
      <li v-for="(theme, index) in themeList" :key="theme.themeCode">
        <Tag v-if="props.showOrder" :value="index + 1" class="tag-order"></Tag>
        <ThemeCard :theme="theme" next-page="THEME" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import AppTypography from './AppTypography.vue';
import { defineProps, ref, watchEffect } from 'vue';
import ThemeCard from './cards/ThemeCard.vue';
import { $api } from '@/services/api/api';

const themeList = ref([]);

const props = defineProps({
  sectionTitle: {
    type: String,
    required: true,
  },
  themes: {
    type: Array, // ThemeDTO[]
    required: false,
    default: new Array(),
  },
  showOrder: {
    type: Boolean,
    required: false,
    default: false,
  },
  genreName: {
    type: String,
    required: false,
    default: null,
  },
});

watchEffect(() => {
  if (props.themes.length > 0) {
    themeList.value = props.themes;
  } else if (props.genreName) {
    // 장르가 넘어오면 API 통신
    $api.theme.searchThemes({ genres: [props.genreName] }).then(foundThemes => {
      themeList.value = foundThemes.slice(0, 5);
    });
  }
});
</script>

<style scoped>
.section-home-view {
  padding: 20px;
  background-color: #343a40;

  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;

    li {
      .tag-order {
        margin-bottom: 10px;
      }
    }
  }

  & + & {
    margin-top: 4px;
  }
}
</style>
