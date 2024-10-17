<template>
  <div :style="{ color: textColor, fontSize: `${textSize}px`, fontFamily: font }">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: 'black',
  },
  type: {
    type: String, // title1, title2, title3, body1, body2, caption
    required: false,
    default: 'body1',
  },
});

const textColor = ref('#000000');
const textSize = ref(16);
const font = ref('NanumGothic');

// 텍스트 색상 설정
watchEffect(() => {
  if (props.color === 'black') {
    textColor.value = '#000000';
  } else if (props.color === 'white') {
    textColor.value === '#ffffff';
  } else if (props.color === 'gray') {
    textColor.value = '#b3b3b3';
  } else if (props.color === 'darkgray') {
    textColor.value = '#757575';
  }
});

// 텍스트 사이즈, 굵기 설정
watchEffect(() => {
  if (props.type === 'caption') {
    textSize.value = 12;
    font.value = 'NanumGothic';
  } else if (props.type === 'body2') {
    textSize.value = 14;
    font.value = 'NanumGothic';
  } else if (props.type === 'body1') {
    textSize.value = 16;
    font.value = 'NanumGothic';
  } else if (props.type === 'title3') {
    textSize.value = 20;
    font.value = 'NanumGothicBold';
  } else if (props.type === 'title2') {
    textSize.value = 28;
    font.value = 'NanumGothicExtraBold';
  } else if (props.type === 'title1') {
    textSize.value = 36;
    font.value = 'NanumGothicExtraBold';
  }
});
</script>

<style scoped></style>
