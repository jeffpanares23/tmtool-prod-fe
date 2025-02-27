<template>
  <div class="flex space-x-4">
    <!-- Export as PDF -->
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      @click="exportAsPDF"
    >
      Export as PDF
    </button>

    <!-- Export as CSV -->
    <button
      class="px-4 py-2 bg-green-500 text-white rounded-lg"
      @click="exportAsCSV"
    >
      Export as CSV
    </button>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  props: ["results"], // Ensure results are passed as a prop
  methods: {
    // Export Results as PDF
    exportAsPDF() {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Validation Results", 10, 10);

      if (Array.isArray(this.results)) {
        doc.autoTable({
          head: [["Key", "Value"]],
          body: this.results.map((item) => Object.entries(item)),
        });
      } else {
        doc.text(JSON.stringify(this.results, null, 2), 10, 20);
      }

      doc.save("results.pdf");
    },

    // Export Results as CSV
    exportAsCSV() {
      const csvRows = [];

      // Generate CSV headers
      if (Array.isArray(this.results) && this.results.length > 0) {
        csvRows.push(Object.keys(this.results[0]).join(","));
        this.results.forEach((row) => {
          csvRows.push(Object.values(row).join(","));
        });
      } else if (typeof this.results === "object") {
        csvRows.push(Object.keys(this.results).join(","));
        csvRows.push(Object.values(this.results).join(","));
      } else {
        csvRows.push("Results");
        csvRows.push(this.results);
      }

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "results.csv";
      a.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
