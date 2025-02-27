<template>
  <div class="flex flex-col lg:flex-row p-6">
    <!-- Sidebar -->
    <div
      class="w-full lg:w-1/4 bg-gray-100 overflow-y-auto fixed lg:relative h-full"
    >
      <HistorySidebar :history="history" @select="handleHistorySelect" />
    </div>

    <!-- Main Content -->
    <div
      class="w-full lg:w-3/4 flex-1 p-4 space-y-6 overflow-y-auto ml-0 lg max-w-screen-xl"
    >
      <SubNavigation />
      <WebsiteInput @loading="setLoading" @results="handleResults" />
      <ExportButtons v-if="results" :results="results" />

      <!-- Tabs -->
      <div>
        <div class="tabs flex space-x-4 border-b">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="py-2 px-4"
            :class="{
              'border-b-2 border-blue-500': activeTab === tab,
              'text-gray-500': activeTab !== tab,
            }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div v-if="activeTab === 'SOP Compliance'">
        <ValidationResults v-if="results" :results="results" />
      </div>
      <div v-if="activeTab === 'Content Analysis'">
        <p class="text-gray-700">Content Analysis feature coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script>
import SubNavigation from "../components/SubNavigation.vue";
import WebsiteInput from "../components/WebsiteInput.vue";
import ValidationResults from "../components/ValidationResults.vue";
import ExportButtons from "../components/ExportButtons.vue";
import HistorySidebar from "../components/HistorySidebar.vue";
import axios from "axios";

export default {
  components: {
    SubNavigation,
    WebsiteInput,
    ValidationResults,
    ExportButtons,
    HistorySidebar,
  },
  data() {
    return {
      loading: false,
      results: null,
      tabs: ["SOP Compliance", "Content Analysis"],
      activeTab: "SOP Compliance",
      history: {},
    };
  },
  mounted() {
    this.fetchHistory();
  },
  methods: {
    async fetchHistory() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8081/api/diagnostic-history"
        );
        console.log("History API Response:", response.data); // Debugging
        this.history = response.data;
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    },
    handleHistorySelect(selectedResult) {
      console.log("Selected History Data:", selectedResult); // Debugging
      this.results = selectedResult; // Ensure SOP Compliance details are included
    },
    handleResults(newResults) {
      this.loading = false;
      console.log("API Response:", newResults);
      this.results = newResults;
      this.fetchHistory();
    },
    setLoading() {
      this.loading = true;
    },
  },
};
</script>
