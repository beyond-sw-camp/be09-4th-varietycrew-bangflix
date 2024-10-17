<template>
  <PageLayout title="랭킹">
    <Tabs value="0">
      <TabList>
        <Tab value="0">주간 베스트 리뷰</Tab>
        <Tab value="1">실시간 베스트 리뷰</Tab>
        <Tab value="2">유저 랭킹 TOP100</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <WeekBestReviewView />
        </TabPanel>
        <TabPanel value="1">
          <BestReviewView />
        </TabPanel>
        <TabPanel value="2">
          <UserRankView />
        </TabPanel>
      </TabPanels>
    </Tabs>

    <a href="https://www.flaticon.com/free-icons/medal" title="medal icons"
      >Medal icons created by Freepik - Flaticon</a
    >
  </PageLayout>
</template>

<script setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Tab from 'primevue/tab';
import PageLayout from '@/components/layouts/PageLayout.vue';
import BestReviewView from './rank/BestReviewView.vue';
import WeekBestReviewView from './rank/WeekBestReviewView.vue';
import UserRankView from './rank/UserRankView.vue';
</script>

<style scoped></style>
