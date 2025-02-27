<template>
  <transition name="slide">
    <div v-if="isVisible" class="task-panel rounded-2xl" @click.stop>
      <h2 class="text-lg font-bold mb-4">Update Task</h2>

      <form @submit.prevent="updateTask">
        <label class="font-semibold">Service:</label>
        <select
          v-model="taskCopy.service"
          class="border p-2 rounded w-full mb-2 input-field"
        >
          <option value="Brand Audit">Brand Audit</option>
          <option value="Content Creation">Content Creation</option>
          <option value="SEO Optimization">SEO Optimization</option>
        </select>

        <label class="font-semibold">Subject:</label>
        <input
          v-model="taskCopy.subject"
          class="border p-2 rounded w-full mb-2 input-field"
          required
        />

        <label class="font-semibold">Instructions:</label>
        <textarea
          v-model="taskCopy.instructions"
          class="border p-2 rounded w-full mb-2 input-field"
        ></textarea>

        <div class="flex justify-between mt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </transition>
  <div v-if="isVisible" class="overlay" @click="$emit('close')"></div>
</template>

<script>
import { ref, watch } from "vue";
import taskService from "../services/taskService";

export default {
  props: {
    task: Object, // Accept task as a prop
    isVisible: Boolean,
  },
  emits: ["close", "taskUpdated"],
  setup(props, { emit }) {
    // Create a reactive copy of the task prop
    const taskCopy = ref({ ...props.task });

    // Watch for changes in the prop and update the local copy
    watch(
      () => props.task,
      (newTask) => {
        taskCopy.value = { ...newTask };
        console.log(taskCopy.value);
      },
      { immediate: true }
    );

    // Function to update the task
    const updateTask = async () => {
      try {
        await taskService.updateTask(taskCopy.value.task_id, taskCopy.value);
        emit("taskUpdated");
        emit("close");
      } catch (error) {
        console.error("Task update failed:", error);
      }
    };

    return { taskCopy, updateTask };
  },
};
</script>

<style scoped>
.task-panel {
  width: 40%;
  padding: 20px;
  background: white;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 41;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 40;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
