<template>
  <div class="bg-gray-100 shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Scan History</h3>
    <ul>
      <li
        v-for="item in history"
        :key="item.id"
        class="cursor-pointer p-2 hover:bg-gray-200 rounded-lg"
        @click="$emit('select', formatResult(item))"
      >
        {{ item.url }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["history"],
  methods: {
    formatResult(item) {
      return {
        Title: item.metadata?.title || "N/A",
        Description: item.metadata?.description || "N/A",
        "Company Name": item.sopCompliance?.company_name || "N/A",
        Address: item.sopCompliance?.address || "N/A",
        "Phone Number": item.sopCompliance?.phone_number || "N/A",
        "Email Address": item.sopCompliance?.email_address || "N/A",
        Copyright: item.sopCompliance?.copyright || "N/A",
      };
    },
  },
};
</script>

<style scoped>
/* Add styles for history list */
.max-h-96 {
  max-height: 24rem;
}
</style>
