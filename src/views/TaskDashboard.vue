<template>
  <div class="task-dashboard flex flex-col space-y-6 p-6">
    <!-- Header Section -->
    <div class="flex justify-between px-4">
      <div class="items-center space-y-2">
        <h1 class="text-3xl font-medium text-gray-800">Welcome Max!</h1>
        <p class="text-gray-600">
          Here’s how you and your team’s productivity are looking right now!
        </p>
      </div>
      <div class="items-center space-y-2 content-center">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          @click="redirectToTaskView(`total`)"
        >
          View All Tasks
        </button>
      </div>
    </div>
    <!-- Main Content Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Left Column -->
      <div class="col-span-12 lg:col-span-6 space-y-6">
        <!-- My Tasks Component -->
        <MyTasks />

        <!-- Assignments Component -->
        <Assignments />

        <!-- Invitations Component -->
        <Invitations />
      </div>

      <!-- Right Column -->
      <div class="col-span-12 lg:col-span-6">
        <!-- Team Progress Component -->
        <TeamProgress />
      </div>
    </div>
  </div>
</template>

<script>
// Importing modular components
import MyTasks from "../components/MyTasks.vue";
import Assignments from "../components/TaskAssignments.vue";
import Invitations from "../components/TaskInvitations.vue";
import TeamProgress from "../components/TeamProgress.vue";

export default {
  name: "TaskDashboard",
  components: {
    MyTasks,
    Assignments,
    Invitations,
    TeamProgress,
  },
  methods: {
    redirectToTaskView(data) {
      this.$router.push(`/tasks/${data}`);
    },
  },
};
</script>

<style scoped>
/* Task Dashboard Styles */
.task-dashboard {
  min-height: 100vh; /* Ensures the dashboard covers full viewport height */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .task-dashboard {
    padding: 4px; /* Reduce padding for smaller screens */
  }
}
</style>
