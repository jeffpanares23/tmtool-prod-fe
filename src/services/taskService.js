import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks"; // Update if needed

export default {
  // Fetch tasks from API
  async getTasks(status = "") {
    try {
      const response = await axios.get(
        `${API_URL}${status ? `?status=${status}` : ""}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  async createTask(taskData) {
    try {
      const response = await axios.post(API_URL, taskData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update an existing task
  async updateTask(id, taskData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return { message: "Task deleted successfully" };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
