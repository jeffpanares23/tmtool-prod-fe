<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>
    <button
      @click="showCreateTask = !showCreateTask"
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Add Task
    </button>
    <div v-if="showCreateTask" class="bg-white p-6 rounded shadow mt-4">
      <form @submit.prevent="createTask">
        <div class="mb-4">
          <label class="block text-gray-700">Task Title</label>
          <input
            v-model="task.title"
            type="text"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Task Description</label>
          <textarea
            v-model="task.description"
            class="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Save Task
        </button>
      </form>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <div class="bg-white p-6 rounded shadow">Task List</div>
    </div>
  </div>
</template>

<!-- <script>
export default {
  name: "TasksPage",
};
</script> -->

<script>
export default {
  name: "TasksPage",
  data() {
    return {
      showCreateTask: false,
      task: {
        title: "",
        description: "",
      },
    };
  },

  methods: {
    createTask() {
      console.log("Task created:", this.task);
      this.task = { title: "", description: "" }; // Reset form
      this.showCreateTask = false;
    },
  },
};
</script>
