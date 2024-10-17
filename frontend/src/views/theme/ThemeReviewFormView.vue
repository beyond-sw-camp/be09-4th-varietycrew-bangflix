<template>
  <FormPageLayout title="리뷰 작성">
    <div class="mb-xl">테마명: {{ themeName }}</div>

    <div class="flex flex-col items-center mb-xl">
      <h3 class="mb-s">이번 방탈출은 어떠셨나요? 만족도를 평가해주세요!</h3>
      <Rating v-model="totalScore">
        <template #onicon>
          <img src="https://primefaces.org/cdn/primevue/images/rating/custom-onicon.png" height="32" width="32" />
        </template>
        <template #officon>
          <img src="https://primefaces.org/cdn/primevue/images/rating/custom-officon.png" height="32" width="32" />
        </template>
      </Rating>
    </div>

    <div class="flex-col items-center gap-20 mb-xl">
      <div class="flex-row gap-10">
        <FloatLabel variant="in">
          <InputNumber id="peopleNum" v-model="peopleNum" suffix="명" />
          <label for="peopleNum">참가 인원</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputNumber id="time" v-model="time" suffix="분" />
          <label for="time">소요 시간</label>
        </FloatLabel>
      </div>

      <SelectButtonWithLabel
        :selected="quizQuality"
        :options="quizQualityOptions"
        label="문제 구성"
        @change-value="onChangeQuizQuality"
      />

      <SelectButtonWithLabel
        :selected="level"
        :options="levelOptions"
        label="체감 난이도"
        @change-value="onChangeLevel"
      />

      <SelectButtonWithLabel
        :selected="scary"
        :options="scaryOptions"
        label="체감 공포도"
        @change-value="onChangeScary"
      />

      <SelectButtonWithLabel
        :selected="activity"
        :options="activityOptions"
        label="체감 활동성"
        @change-value="onChangeActivity"
      />

      <SelectButtonWithLabel
        :selected="interior"
        :options="interiorOptions"
        label="인테리어"
        @change-value="onChangeInterior"
      />

      <SelectButtonWithLabel
        :selected="probability"
        :options="probabilityOptions"
        label="개연성"
        @change-value="onChangeProbability"
      />
    </div>

    <FloatLabel class="mb-xl">
      <Textarea id="reviewContent" v-model="reviewContent" auto-resize rows="6" cols="100" fluid />
      <label for="reviewContent">리뷰 내용</label>
    </FloatLabel>

    <UploadImage :current-files="currentFiles" :current-cnt="currentFiles.length" @on-change-files="onChangeFiles" />
  </FormPageLayout>
</template>

<script setup>
import FormPageLayout from '@/components/layouts/FormPageLayout.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import InputNumber from 'primevue/inputnumber';
import SelectButtonWithLabel from '@/components/form/SelectButtonWithLabel.vue';
import FloatLabel from 'primevue/floatlabel';
import UploadImage from '@/components/form/UploadImage.vue';
import Rating from 'primevue/rating';
import {
  quizQualityOptions,
  levelOptions,
  scaryOptions,
  activityOptions,
  interiorOptions,
  probabilityOptions,
} from '@/utils/constants';

const route = useRoute();
const { themeId } = route.params;

const themeName = ref('');
const totalScore = ref(null);
const peopleNum = ref(null);
const time = ref(null);
const quizQuality = ref({});
const level = ref({});
const scary = ref({});
const activity = ref({});
const interior = ref({});
const probability = ref({});
const reviewContent = ref('');
const currentFiles = ref([]);

const onChangeQuizQuality = newVal => {
  quizQuality.value = newVal;
};

const onChangeLevel = newVal => {
  level.value = newVal;
};

const onChangeScary = newVal => {
  scary.value = newVal;
};

const onChangeActivity = newVal => {
  activity.value = newVal;
};

const onChangeInterior = newVal => {
  interior.value = newVal;
};

const onChangeProbability = newVal => {
  probability.value = newVal;
};

const onChangeFiles = newFiles => {
  currentFiles.value = newFiles;
};

onMounted(() => {
  // TODO:: themeId 테마 정보 조회
  themeName.value = '검은 조직';
});
</script>

<style scoped></style>
