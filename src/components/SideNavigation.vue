<template>
  <nav
    class="side-navigation bg-white text-gray-800 h-screen shadow-md transition-transform transform z-40 fixed lg:relative"
    :class="{
      collapsed: isCollapsed,
    }"
  >
    <!-- Toggle Button -->
    <button
      class="toggle-button bg-gray-300 text-gray-700 absolute top-6 right-[-1rem] w-5 h-5 shadow flex items-center justify-center lg:right-[-1.5rem] z-50"
      @click="toggleCollapse"
    >
      <!-- <i
        :class="isCollapsed ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"
      ></i> -->
      <i
        :class="{
          'fas fa-chevron-right': isCollapsed,
          'fas fa-chevron-left': !isCollapsed,
        }"
      ></i>
    </button>

    <!-- Navigation Sections -->
    <ul class="flex-1 py-4 overflow-hidden h-full">
      <!-- Overview Section -->
      <h2 class="text-sm font-medium text-gray-500 uppercase opacity-0">
        Dashboard
      </h2>
      <!-- <li
        class="logo flex items-center justify-center py-4 border-b border-gray-300"
      >
        <h1 class="text-lg font-semibold" v-if="!isCollapsed">
          Digital Marketing Suite
        </h1>
        <img
          src="../../public/assets/icons/overview-icons/search.svg"
          alt="Logo"
          class="w-10 h-10"
          v-if="isCollapsed"
        />
      </li> -->

      <li
        v-for="item in overviewNav"
        :key="item.label"
        :class="[
          'nav-item flex items-center space-x-4 py-3 px-6 cursor-pointer hover:bg-blue-400',
          { 'bg-blue-100': isActive(item.path) },
        ]"
        @click="navigateTo(item.path)"
      >
        <img :src="item.icon" alt="icon" class="w-8 h-8" />
        <span v-if="!isCollapsed" class="text-xl">{{ item.label }}</span>
      </li>
      <hr class="my-4" />

      <!-- Users Section -->
      <li
        v-for="item in task"
        :key="item.label"
        :class="[
          'nav-item flex items-center space-x-4 py-3 px-6 cursor-pointer hover:bg-blue-400',
          { 'bg-blue-100 font-semibold': isActive(item.path) },
        ]"
        @click="navigateTo(item.path)"
      >
        <img :src="item.icon" alt="icon" class="w-8 h-8" />
        <span v-if="!isCollapsed" class="text-xl">{{ item.label }}</span>
      </li>
      <hr class="my-4" />

      <!-- New Application Section -->
    </ul>
    <div class="new-application border-t">
      <!-- <div
        class="nav-item flex items-center space-x-4 py-3 px-8 cursor-pointer hover:bg-blue-400"
        @click="navigateTo('/new-application')"
      >
        <i class="fas fa-plus text-xl"></i>
        <span v-if="!isCollapsed" class="text-xl">New Application</span>
      </div> -->
      <!-- User Avatar and Dropdown -->
      <div
        class="relative flex justify-between items-center space-x-2 cursor-pointer px-4 py-3 hover:bg-blue-400"
        @click="toggleDropdown"
      >
        <div class="flex items-center gap-2">
          <!-- Avatar -->
          <img
            src="../assets/user.svg"
            alt="User Avatar"
            class="w-10 h-10 rounded-full"
          />
          <!-- User Name -->
          <div>
            <span class="font-medium text-gray-800">Max</span>
            <br />
            <span class="font-normal text-gray-400">Admin Assistant</span>
          </div>
        </div>
        <!-- Dropdown Arrow -->
        <div>
          <i
            class="fa-solid fa-ellipsis-vertical text-gray-500"
            @click="toggleDropdown"
          ></i>
        </div>
        <!-- Dropdown Menu -->
        <div
          v-if="showDropdown"
          class="absolute right-0 -mt-4 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <ul class="py-2 right-0">
            <li
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @click="logout"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import OverviewIcon from "../assets/icons/side-navigation-icons/overview-icon.svg";
import ActivityIcon from "../assets/icons/side-navigation-icons/activity-icon.svg";
import UserIcon from "../assets/icons/side-navigation-icons/user-icon.svg";
import WPDashboardIcon from "../assets/icons/side-navigation-icons/wp-dashboard-icon.svg";
import FormsDataPointIcon from "../assets/icons/side-navigation-icons/forms-datapoint-icon.svg";
import TaskIcon from "../assets/icons/side-navigation-icons/task-icon.svg";
import ChatIcon from "../assets/icons/side-navigation-icons/chat-icon.svg";
import JobSchedulingIcon from "../assets/icons/side-navigation-icons/job-scheduling-icon.svg";
import WebsiteDiagnosticIcon from "../assets/icons/side-navigation-icons/diagnostic-icon.svg";

export default {
  name: "SideNavigation",
  props: {
    isCollapsed: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const toggleCollapse = () => {
      const newValue = !props.isCollapsed;
      emit("update:isCollapsed", newValue);
    };

    const router = useRouter();
    const isMobile = computed(() => window.innerWidth <= 1024);
    const navigateTo = (path) => {
      router.push(path);
    };

    const isActive = (path) => {
      return router.currentRoute.value.path === path;
    };

    return {
      navigateTo,
      isActive,
      toggleCollapse,
      isMobile,
    };
  },
  data() {
    return {
      overviewNav: [
        { label: "Dashboard", icon: OverviewIcon, path: "/task-dashboard" },
        { label: "Clients", icon: UserIcon, path: "/clients" },
      ],
      task: [
        {
          label: "Task",
          icon: TaskIcon,
          path: "/tasks/total",
        },
      ],
      addSection: [
        {
          label: "Add Section",
          iconClass: "fas fa-plus-circle",
          path: "/addSection",
        },
      ],
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem("token"); // Remove authentication token
      this.$router.push("/"); // Redirect to login
    },
  },
};
</script>

<style scoped>
.side-navigation {
  width: 16rem;
  transition: all 0.3s ease-in-out;
}

.side-navigation.collapsed {
  width: 4rem; /* Collapsed width */
}

.side-navigation.collapsed .toggle-button {
  right: 0; /* Adjust position for collapsed state */
}
.side-navigation.collapsed .nav-item {
  padding-left: 1rem;
  padding-right: 1rem;
}

.nav-item span {
  font-size: 1rem;
}

.nav-item img {
  transition: transform 0.3s;
}

.logo h1 {
  font-size: 1.25rem;
  font-weight: 600;
}

.nav-item.active {
  background-color: #f1f5f9;
}

.nav-item:hover {
  color: #fff;
}

/* .nav-item span {
  font-size: 0.875rem;
} */

.nav-item .text-xl {
  font-size: 16px;
}

.add-section {
  border-color: transparent;
}

.new-application {
  position: sticky;
  background: #ffffff;
  height: 5rem;
  bottom: 0;
  width: inherit;
}

.toggle-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 50;
  background: #aeaeae;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: white;
}

@media (max-width: 1024px) {
  .side-navigation {
    position: fixed;
    z-index: 50;
    transform: translateX(-100%);
  }
  .side-navigation.collapsed .toggle-button {
    right: 0; /* Adjust position for collapsed state */
  }
}
</style>
