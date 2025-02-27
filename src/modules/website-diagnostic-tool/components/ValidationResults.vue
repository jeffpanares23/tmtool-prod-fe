<template>
  <div class="results-section bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Validation Results</h2>

    <!-- SEO Issues Section -->
    <div class="seo-issues mb-6">
      <h3 class="text-md font-semibold mb-2">Common SEO Issues</h3>
      <div class="score-summary flex justify-between items-center mb-4">
        <span>Score: {{ results.seo_checks.score }}</span>
        <span>Failed: {{ results.seo_checks.failed }}</span>
        <span>Warnings: {{ results.seo_checks.warnings }}</span>
        <span>Passed: {{ results.seo_checks.passed }}</span>
      </div>

      <ul class="issues-list">
        <li
          v-for="issue in results.seo_checks.issues"
          :key="issue.id"
          class="issue-item mb-4"
        >
          <div
            :class="{
              'text-green-500': issue.status === 'Passed',
              'text-yellow-500': issue.status === 'Warning',
              'text-red-500': issue.status === 'Failed',
            }"
          >
            <strong>{{ issue.title }}</strong>
            <p>{{ issue.details }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Metadata -->
    <p><strong>Title:</strong> {{ results.metadata?.title || "N/A" }}</p>
    <p>
      <strong>Description:</strong> {{ results.metadata?.description || "N/A" }}
    </p>

    <!-- SOP Compliance -->
    <h4 class="text-md font-semibold mt-4">SOP Compliance</h4>
    <ul>
      <li>
        <strong>Company Name:</strong> {{ results.sop?.company_name || "N/A" }}
      </li>
      <li><strong>Address:</strong> {{ results.sop?.address || "N/A" }}</li>
      <li>
        <strong>Phone Number:</strong> {{ results.sop?.phone_number || "N/A" }}
      </li>
      <li>
        <strong>Email Address:</strong>
        {{ results.sop?.email_address || "N/A" }}
      </li>
      <li><strong>Copyright:</strong> {{ results.sop?.copyright || "N/A" }}</li>
    </ul>

    <!-- SEO Checks -->
    <h4 class="text-md font-semibold mt-4">SEO Checks</h4>
    <ul>
      <li>
        <strong>Has HTTPS:</strong>
        {{ results.seo_checks?.hasHttps ? "Yes" : "No" }}
      </li>
      <li>
        <strong>Mobile Responsive:</strong>
        {{ results.seo_checks?.mobileResponsive ? "Yes" : "No" }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      default: () => ({
        metadata: {},
        sop: {},
        seo_checks: {},
      }),
    },
  },
};
</script>
