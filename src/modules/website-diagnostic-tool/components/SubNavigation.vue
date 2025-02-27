<template>
  <div class="sub-navigation bg-gray-100 p-4 flex items-center justify-between">
    <!-- Navigation History -->
    <div class="nav-history text-sm text-gray-600">
      <span>Operations</span> / <span>Website Diagnostic Tool</span>
    </div>

    <!-- Search Bar -->
    <div class="search-bar flex items-center">
      <input
        type="text"
        v-model="searchQuery"
        class="border border-gray-300 rounded-lg px-4 py-2 w-72"
        placeholder="Search diagnostics..."
      />
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        @click="searchDiagnostics"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // Holds the search query
    };
  },
  methods: {
    searchDiagnostics() {
      console.log("Searching for:", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.sub-navigation {
  border-bottom: 1px solid #e5e7eb;
}
</style>
