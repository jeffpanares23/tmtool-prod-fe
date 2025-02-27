<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-lg font-semibold mb-4">Run Diagnostic</h2>
    <div class="flex justify-between items-center">
      <input
        v-model="websiteUrl"
        type="url"
        class="flex-grow border rounded-lg p-3 text-gray-700 mr-4"
        placeholder="Enter URL or paste text here"
        required
      />
      <button
        type="button"
        @click="submitUrl"
        class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
      >
        GO!
      </button>
    </div>
    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      websiteUrl: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitUrl() {
      this.errorMessage = "";
      this.$emit("loading"); // Trigger loading state in parent component

      // ✅ Ensure URL has proper format
      let formattedUrl = this.websiteUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "http://" + formattedUrl;
      }

      try {
        // ✅ Call `analyze-website` API
        const response = await axios.post(
          "http://127.0.0.1:8081/api/analyze-website",
          { url: formattedUrl }
        );

        // ✅ Ensure the response contains valid data
        if (!response.data || response.data.error) {
          throw new Error(
            response.data.error || "Invalid response from server."
          );
        }

        // ✅ Process API Response
        const processedData = {
          url: formattedUrl,
          metadata: response.data.metadata || {},
          sop: response.data.sop || {},
          seo_checks: response.data.seo_checks || {},
        };

        // ✅ Emit results back to parent component
        this.$emit("results", processedData);
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error ||
          "An error occurred while processing the URL.";
        console.error("API Error:", error);
      }
    },
  },
};
</script>
