<template>
  <div class="bg-white p-6 rounded-xl space-y-6">
    <h2 class="text-xl font-bold">My Tasks</h2>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="text-center p-4 rounded-lg hover:shadow-lg hover:cursor-pointer transition duration-300 ease-in-out"
        :style="{ backgroundColor: task.color, padding: '2.6rem' }"
        @click="filterByCategory(task.label)"
      >
        <p :key="index" class="text-5xl" :style="{ color: task.textColor }">
          {{ task.count }}
        </p>
        <p class="text-gray-700">{{ task.label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          label: "Total Tasks",
          count: 25,
          color: "#F2F0FF",
          textColor: "#8D7EF9",
        },
        { label: "Open", count: 20, color: "#F0F7FF", textColor: "#4EA3FF" },
        { label: "Done", count: 5, color: "#EFF9F1", textColor: "#46CE5F" },
        { label: "Overdue", count: 2, color: "#FEF3E6", textColor: "#FFA947" },
      ],
    };
  },
  methods: {
    filterByCategory(label) {
      const category = this.mapLabelToCategory(label);
      this.$router.push(`/tasks/${category}`);
    },
    mapLabelToCategory(label) {
      const labelMapping = {
        "Total Tasks": "total",
        Open: "open",
        Done: "done",
        Overdue: "overdue",
      };
      return labelMapping[label] || "total";
    },
  },
};
</script>
