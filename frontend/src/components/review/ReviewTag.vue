<template>
  <div class="review-tag">
    <Tag :value="props.label"></Tag>
    <AppTypography type="body1" color="darkgray">{{ friendlyValue }}</AppTypography>
  </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import Tag from 'primevue/tag';
import AppTypography from '@/components/AppTypography.vue';
import {
  activityOptions,
  interiorOptions,
  levelOptions,
  probabilityOptions,
  quizQualityOptions,
  scaryOptions,
} from '@/utils/constants';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String, // PEOPLE, TIME, QUIZ, LEVEL, SCARY, ACTIVITY, INTERIOR, PROBABILITY
    required: true,
  },
});

const friendlyValue = ref('');

const findKo = options => {
  const founded = options.find(e => e.value === props.value);
  if (!founded) return '';
  return founded.label;
};

// type에 따른 value 셋팅
watchEffect(() => {
  if (props.type === 'PEOPLE') {
    friendlyValue.value = props.value + '명';
  } else if (props.type === 'TIME') {
    friendlyValue.value = props.value + '분';
  } else if (props.type === 'QUIZ') {
    friendlyValue.value = findKo(quizQualityOptions);
  } else if (props.type === 'LEVEL') {
    friendlyValue.value = findKo(levelOptions);
  } else if (props.type === 'SCARY') {
    friendlyValue.value = findKo(scaryOptions);
  } else if (props.type === 'ACTIVITY') {
    friendlyValue.value = findKo(activityOptions);
  } else if (props.type === 'INTERIOR') {
    friendlyValue.value = findKo(interiorOptions);
  } else if (props.type === 'PROBABILITY') {
    friendlyValue.value = findKo(probabilityOptions);
  }
});
</script>

<style scoped>
.review-tag {
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  gap: 5px;
}
</style>
