<template>
  <Avatar
    :icon="props.imagePath ? undefined : `pi pi-user`"
    size="large"
    shape="circle"
    :image="props.imagePath ? Helper.getImageUrl(props.imagePath) : undefined"
    :pt="{
      image: {
        style: {
          'object-fit': 'cover',
        },
      },
    }"
  />
</template>

<script setup>
import { defineProps } from 'vue';
import Avatar from 'primevue/avatar';
import { Helper } from '@/utils/Helper';

const props = defineProps({
  imagePath: {
    type: [String, null],
    required: true,
  },
});
</script>

<style scoped></style>
