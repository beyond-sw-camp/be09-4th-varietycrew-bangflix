<template>
  <div class="select-button-with-label">
    <label>{{ props.label }}</label>
    <SelectButton
      :model-value="props.selected"
      :options="options"
      option-label="label"
      data-key="value"
      :aria-labelledby="props.label"
      @change="onChange"
    >
      <template #option="slotProps">
        <span>{{ slotProps.option.label }}</span>
      </template>
    </SelectButton>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from 'vue';
import SelectButton from 'primevue/selectbutton';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  selected: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['changeValue']);

const selectOptions = ref([]);

watchEffect(() => {
  selectOptions.value = props.options;
});

const onChange = event => {
  emit('changeValue', event.value);
};
</script>

<style scoped>
.select-button-with-label {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }
}
</style>
