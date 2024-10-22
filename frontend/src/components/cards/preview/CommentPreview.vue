<template>
  <div>
    <Card>
      <template #content>
        <p>
          {{
            props.comment.content.length > 130
              ? props.comment.content.slice(0, 130) + '...(더보기)'
              : props.comment.content
          }}
        </p>
        <p>{{ props.comment.createdAt.split('T')[0] }}</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card';
import { defineProps } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
