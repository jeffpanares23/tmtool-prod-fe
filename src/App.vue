<template>
  <div class="app min-h-screen flex flex-col font-sans">
    <!-- Header Component -->
    <HeaderComponent v-if="showSideNavigation && isAuthenticated" />

    <!-- Main Layout -->
    <div class="main-layout flex flex-1">
      <!-- Side Navigation -->
      <SideNavigation
        v-show="showSideNavigation && isAuthenticated"
        :isCollapsed="isCollapsed"
        @update:isCollapsed="isCollapsed = $event"
      />

      <!-- Main Content -->
      <div
        class="main-content flex-1 bg-gradient-to-r from-gray-100 to-blue-50"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import SideNavigation from "./components/SideNavigation.vue";
import HeaderComponent from "./components/Header.vue";

export default {
  components: {
    SideNavigation,
    HeaderComponent,
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  setup() {
    const route = useRoute();

    // ✅ Check if user is authenticated
    const isAuthenticated = computed(() => !!localStorage.getItem("token"));
    // Show SideNavigation and Header only if the route is not '/login'
    const showSideNavigation = computed(() => route.path !== "/");
    // State for collapsing SideNavigation
    const isSideNavCollapsed = ref(false);
    const toggleSideNavigation = () => {
      isSideNavCollapsed.value = !isSideNavCollapsed.value;
    };

    return {
      showSideNavigation,
      isSideNavCollapsed,
      toggleSideNavigation,
      isAuthenticated,
    };
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column; /* Stack header at the top */
  min-height: 100vh; /* Full height for the app */
}

.main-layout {
  display: flex;
  flex: 1; /* Occupy the remaining space after the header */
}

.main-content {
  flex: 1; /* Occupy the rest of the space after SideNavigation */
  transition: margin-left 0.3s ease-in-out;
}

.main-content.ml-16 {
  margin-left: 4rem; /* Adjust main content margin when SideNavigation is collapsed */
}
</style>
