<template>
  <transition name="slide">
    <div v-if="isVisible" class="task-panel rounded-2xl" @click.stop>
      <h2 class="text-lg font-bold mb-4">Create Task</h2>

      <form @submit.prevent="createTask">
        <label class="font-semibold">Service:</label>
        <select
          v-model="task.service"
          class="border p-2 rounded w-full mb-2 input-field"
          required
        >
          <option value="Brand Audit">Brand Audit</option>
          <option value="Content Creation">Content Creation</option>
          <option value="SEO Optimization">SEO Optimization</option>
        </select>

        <label class="font-semibold">Subject:</label>
        <input
          v-model="task.subject"
          placeholder="Enter subject..."
          class="border p-2 rounded w-full mb-2 input-field"
          required
        />

        <label class="font-semibold">Instructions:</label>
        <textarea
          v-model="task.instructions"
          placeholder="Write instructions here..."
          class="border p-2 rounded w-full mb-2 input-field"
        ></textarea>

        <!-- <label class="font-semibold">Attachment:</label>
        <div class="upload-area border p-4 text-center cursor-pointer">
          <input type="file" @change="handleFileUpload" class="hidden" />
          <p>Drag and drop files here</p>
        </div> -->
        <label class="font-semibold">Attachment:</label>
        <div class="upload-area border p-4 text-center cursor-pointer">
          <input
            type="file"
            @change="handleFileUpload"
            accept=".jpg,.jpeg,.png,.pdf"
          />
          <p v-if="task.attached_file">
            Selected: {{ task.attached_file.name }}
          </p>
          <p v-else>Click to select a file</p>
        </div>

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
            Submit
          </button>
        </div>
      </form>
    </div>
  </transition>
  <div v-if="isVisible" class="overlay" @click="$emit('close')"></div>
</template>

<script>
import { ref } from "vue";
import taskService from "../services/taskService";

export default {
  props: {
    isVisible: Boolean,
  },
  emits: ["close", "taskCreated"],
  setup(_, { emit }) {
    const task = ref({
      service: "",
      subject: "",
      instructions: "",
      attached_file: null,
    });

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        task.value.attached_file = file;
      }
    };

    const generateTaskId = () => {
      const randomNumber = Math.floor(100 + Math.random() * 900000);
      return `DMS-${randomNumber}`;
    };
    const createTask = async () => {
      try {
        const formData = new FormData();
        formData.append("task_id", generateTaskId());
        formData.append("company_name", "Sample Company");
        formData.append("service", task.value.service);
        formData.append("status", "Open");
        formData.append("subject", task.value.subject);
        formData.append("instructions", task.value.instructions);
        formData.append("created_by", 1); // Replace with logged-in user ID

        if (task.value.attached_file) {
          formData.append("attached_file", task.value.attached_file);
        }

        await taskService.createTask(formData);

        task.value = {
          service: "",
          subject: "",
          instructions: "",
          attached_file: null,
        };

        emit("taskCreated");
        emit("close");
      } catch (error) {
        console.error("Task creation failed:", error);
      }
    };

    return { task, createTask, handleFileUpload };
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
.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: white;
}
.upload-area {
  background: #f7f7f7;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
}
</style>
