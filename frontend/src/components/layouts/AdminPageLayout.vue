<template>
  <div class="container">
    <aside>
      <h3>관리자 전용 메뉴</h3>
      <nav>
        <div v-for="item in items" :key="item.label" class="group">
          <div class="group-label">
            <i v-if="item.icon" :class="item.icon"></i>
            <img v-else-if="item.iconSrc" :src="item.iconSrc" alt="" />

            <span>{{ item.label }}</span>
          </div>
          <div class="menus">
            <RouterLink v-for="menu in item.menus" :key="menu.label" :to="menu.route">
              {{ menu.label }}
            </RouterLink>
          </div>
        </div>
      </nav>
    </aside>

    <div class="nested">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const items = ref([
  {
    label: '회원 관리',
    icon: 'pi pi-user',
    menus: [{ label: '회원 목록', route: '/admin' }],
  },
  {
    label: '매장/테마관리',
    icon: 'pi pi-map-marker',
    menus: [
      { label: '매장 목록', route: '/admin/stores' },
      { label: '테마 목록', route: '/admin/themes' },
      { label: '장르 목록', route: '/admin/genres' },
    ],
  },
  {
    label: '신고 관리',
    iconSrc: '/src/assets/icons/ic-flash-24.svg',
    menus: [{ label: '신고 내역', route: '/admin/reports' }],
  },
]);
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;

  aside {
    height: 100%;
    padding: 60px 0;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #d9d9d9;

    h3 {
      margin-bottom: 32px;
    }

    nav {
      width: 100%;

      .group-label,
      a {
        padding: 10px 20px;
      }

      .group-label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;

        i {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .menus {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .nested {
    flex-grow: 1;
  }
}
</style>
