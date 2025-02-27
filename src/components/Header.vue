<template>
  <header
    class="header flex items-center justify-between px-8 py-4 bg-white shadow-lg border-#e0e0e0 border-b"
  >
    <div class="flex items-center">
      <h1 class="text-2xl font-semibold text-gray-800">Task Management</h1>
      <div class="search-container relative ml-16">
        <!-- Search Icon -->
        <img
          src="../../public/assets/icons/overview-icons/search.svg"
          alt="Search Icon"
          class="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <!-- Search Input -->
        <input
          type="text"
          placeholder="Search"
          class="search border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div class="flex items-center space-x-6">
      <!-- Need Assistance -->
      <button
        class="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
      >
        <span>Need Assistance?</span>
        <i class="fas fa-chevron-down"></i>
      </button>

      <!-- Notification Icon -->
      <div class="relative cursor-pointer">
        <i class="fas fa-bell text-gray-500 text-xl"></i>
        <span
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
        >
          9
        </span>
      </div>

      <!-- User Avatar and Dropdown -->
      <div class="relative flex items-center space-x-2 cursor-pointer">
        <!-- Avatar -->
        <img
          src="../assets/user.svg"
          alt="User Avatar"
          class="w-10 h-10 rounded-full"
          @click="toggleDropdown"
        />
        <!-- User Name -->
        <span class="font-medium text-gray-800">Max</span>
        <!-- Dropdown Arrow -->
        <i
          class="fas fa-chevron-down text-gray-500"
          @click="toggleDropdown"
        ></i>
        <!-- Dropdown Menu -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <ul class="py-2">
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
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
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
.header {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.search {
  width: 615px;
}
</style>
