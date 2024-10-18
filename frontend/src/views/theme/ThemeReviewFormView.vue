<template>
  <FormPageLayout title="리뷰 작성" @click-save="clickSaveReview">
    <div class="mb-xl">[테마] {{ themeName }}</div>

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
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
import { $api } from '@/services/api/api';
import useToastMessage from '@/hooks/useToastMessage';

const route = useRoute();
const { themeId } = route.params;
const { showWarning } = useToastMessage();
const router = useRouter();

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

const clickSaveReview = () => {
  if (!totalScore.value) {
    showWarning('전체 만족도를 선택해주세요!');
    return;
  }

  if (!peopleNum.value) {
    showWarning('참가인원을 입력해주세요!');
    return;
  }

  if (!time.value) {
    showWarning('소요시간을 입력해주세요!');
    return;
  }

  if (!quizQuality.value.value) {
    showWarning('[문제 구성]을 입력해주세요!');
    return;
  }

  if (!level.value.value) {
    showWarning('[체감 난이도]를 입력해주세요!');
    return;
  }

  if (!scary.value.value) {
    showWarning('[체감 공포도]를 입력해주세요!');
    return;
  }

  if (!activity.value.value) {
    showWarning('[체감 활동성]을 입력해주세요!');
    return;
  }

  if (!interior.value.value) {
    showWarning('[인테리어]를 입력해주세요!');
    return;
  }

  if (!probability.value.value) {
    showWarning('[개연성]을 입력해주세요!');
    return;
  }

  if (!reviewContent.value) {
    showWarning('리뷰 내용을 입력해주세요!');
    return;
  }

  const formData = new FormData();
  const reviewData = {
    themeCode: themeId,
    headcount: peopleNum.value,
    takenTime: time.value,
    totalScore: totalScore.value,
    composition: quizQuality.value.value,
    level: level.value.value,
    horrorLevel: scary.value.value,
    activity: activity.value.value,
    interior: interior.value.value,
    probability: probability.value.value,
    content: reviewContent.value,
  };
  formData.append('review', new Blob([JSON.stringify(reviewData)], { type: 'application/json' }));

  // 리뷰 사진
  currentFiles.value.forEach(file => {
    formData.append('images', file);
  });

  $api.review.post(formData).then(() => {
    router.replace(`/theme/detail/${themeId}`);
  });
};

// 테마명 조회
watchEffect(() => {
  if (!themeId) return;

  $api.theme.getTheme(themeId).then(theme => {
    themeName.value = theme.name;
  });
});
</script>

<style scoped></style>
