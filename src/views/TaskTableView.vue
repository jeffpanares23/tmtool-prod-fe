<template>
  <div class="task-container flex p-4 gap-6">
    <!-- Task Table Section (Shrinks when panel is open) -->
    <!-- Breadcrumbs -->
    <div
      class="task-table-view rounded-2xl p-6 transition-all"
      :class="{ 'shrink-table': showCreatePanel || showUpdatePanel }"
    >
      <div
        class="breadcrumbs text-gray-600 text-sm flex items-center gap-2 mb-4"
      >
        <span
          @click="$router.push('/task-dashboard')"
          class="hover:underline cursor-pointer"
        >
          Task
        </span>
        <span class="text-gray-400">
          <i class="fas fa-chevron-right"></i>
        </span>
        <span class="text-gray-900 font-semibold">{{ activeTabName }}</span>
      </div>

      <!-- Tabs -->
      <div class="tabs flex items-center relative">
        <div
          v-for="tab in visibleTabs"
          :key="tab.name"
          @click="setActiveTab(tab)"
          class="tab flex justify-center items-center px-4 py-2 rounded-t-lg transition-colors min-w-56 min-h-12 cursor-pointer bg-white bg-opacity-50 border-t-2 drop-shadow-lg"
          :class="{
            'text-blue-500 font-medium bg-white bg-opacity-100':
              activeTab === tab.name,
            'text-gray-600 hover:text-gray-900': activeTab !== tab.name,
          }"
        >
          {{ tab.name }}
        </div>

        <!-- More Services Dropdown -->
        <div
          v-if="hiddenTabs.length > 0"
          class="relative"
          v-click-outside="closeMoreTabs"
        >
          <div
            @click="toggleMoreTabs"
            class="cursor-pointer px-4 py-2 rounded-t-lg text-gray-600 hover:text-gray-900"
          >
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div
            v-if="showMoreTabs"
            class="absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-10"
          >
            <ul class="py-2">
              <li
                v-for="tab in hiddenTabs"
                :key="tab.name"
                @click="setActiveTab(tab)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {{ tab.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="task-table-view bg-white rounded-b-lg p-6 space-y-6 shadow-lg transition-all"
      >
        <!-- Summary Boxes -->
        <div class="flex flex-cols-1 sm:flex-cols-2 lg:flex-cols-4 gap-4 mt-4">
          <div
            v-for="(count, type) in taskCounts"
            :key="type"
            :class="getSummaryBoxClasses(type)"
            @click="filterByStatus(type)"
            class="summary-box rounded-lg px-4 py-4 flex flex-row justify-center items-center cursor-pointer transition-transform hover:scale-105 max-h-9 gap-2"
          >
            <span class="text-md">
              {{ categories[type] }}
            </span>
            <span
              class="text-md text-white flex items-center px-2 rounded"
              :class="getSummaryBoxClassesBg(type)"
            >
              {{ count }}
            </span>
          </div>
        </div>

        <!-- Filter Dropdown -->
        <div class="flex justify-between items-center">
          <div class="relative">
            <button
              @click="toggleDropdown"
              class="filter-button bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
            >
              <!-- <span>Filter by {{ selectedFilter || "All" }}</span> -->
              <span>{{ categories[selectedFilter] || "Filter" }}</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div
              v-if="showDropdown"
              v-click-outside="closeDropdown"
              class="dropdown bg-white shadow-lg rounded-lg mt-2 absolute top-full z-10 min-w-44"
            >
              <ul class="py-2">
                <li
                  v-for="(category, key) in categories"
                  :key="key"
                  @click="selectFilterCategory(key)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {{ category }}
                </li>
              </ul>
            </div>
          </div>
          <button
            @click="showCreatePanel = true"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Create Task
          </button>
        </div>

        <!-- Task Table -->
        <div class="mt-6 overflow-x-auto">
          <table
            class="w-full border-collapse border border-gray-300 rounded-lg text-left"
          >
            <thead>
              <tr class="bg-gray-100 text-gray-700">
                <th
                  v-for="header in tableHeaders"
                  :key="header.key"
                  class="p-4 border border-gray-300"
                >
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="task in filteredTasks"
                :key="task.id"
                @click="openUpdateTask(task)"
                class="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td class="p-4 border border-gray-300">{{ task.task_id }}</td>
                <td class="p-4 border border-gray-300">
                  {{ task.subject }}
                </td>
                <td class="p-4 border border-gray-300">{{ task.service }}</td>
                <td class="p-4 border border-gray-300">
                  {{ formatDate(task.created_at) }}
                </td>
                <td class="p-4 border border-gray-300 text-center">
                  <span
                    class="status-pill"
                    :class="getStatusClasses(task.status)"
                  >
                    {{ task.status }}
                  </span>
                </td>
                <!-- <td class="p-4 border border-gray-300 text-center">
                  <i class="fas fa-ellipsis-h cursor-pointer text-gray-600"></i>
                </td> -->
              </tr>
              <tr v-if="filteredTasks.length === 0">
                <td colspan="6" class="p-4 text-center text-gray-500">
                  No tasks found matching the current filters
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Task Creation Panel (Slides in when opened) -->
    <CreateTaskPanel
      :isVisible="showCreatePanel"
      @close="showCreatePanel = false"
      @taskCreated="fetchTasks"
    />
    <!-- Task Update Panel (Slides in when opened) -->
    <UpdateTaskPanel
      :isVisible="showUpdatePanel"
      :task="selectedTask"
      @close="showUpdatePanel = false"
      @taskUpdated="fetchTasks"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import CreateTaskPanel from "../components/CreateTaskPanel.vue";
import UpdateTaskPanel from "../components/UpdateTaskPanel.vue";
import taskService from "../services/taskService";
import { format } from "date-fns";
export default {
  name: "TaskTableView",
  // props: {
  //   tasks: {
  //     type: Array,
  //     required: true,
  //     default: () => [],
  //   },
  // },
  components: {
    CreateTaskPanel,
    UpdateTaskPanel, // ✅ Register the component here
  },
  setup(props) {
    const activeTab = ref("All Tasks");
    const showDropdown = ref(false);
    const showMoreTabs = ref(false);
    const selectedFilter = ref("");
    const sortKey = ref("dateCreated");
    const sortOrder = ref("desc");
    const showCreatePanel = ref(false);
    const showUpdatePanel = ref(false);
    const selectedTask = ref(null);
    const tasks = ref([]); // API data storage

    const categories = {
      total: "All Tasks",
      open: "Open Tasks",
      inProgress: "In Progress",
      done: "Completed Tasks",
      overdue: "Overdue Tasks",
    };

    const tabs = [
      { name: "All Tasks" },
      { name: "My Tasks" },
      { name: "Created Tasks" },
      { name: "SEO Service" },
      { name: "Content Writing" },
    ];

    const tableHeaders = [
      { key: "id", label: "Task ID" },
      { key: "company", label: "Task" },
      { key: "service", label: "Service" },
      { key: "dateCreated", label: "Date Created" },
      { key: "status", label: "Status" },
      // { key: "actions", label: "Actions" },
    ];

    // Fetch tasks from the API
    const fetchTasks = async () => {
      tasks.value = await taskService.getTasks();
      console.log(tasks.value);
    };

    // Delete task function
    const deleteTask = async (id) => {
      if (confirm("Are you sure you want to delete this task?")) {
        await taskService.deleteTask(id);
        fetchTasks(); // Refresh task list
      }
    };

    const openUpdateTask = (task) => {
      selectedTask.value = { ...task }; // Clone the task object
      showUpdatePanel.value = true;
      console.log("opened", showUpdatePanel.value);
    };

    onMounted(() => {
      fetchTasks();
    });

    const filteredTasks = computed(() => {
      if (!selectedFilter.value) return tasks.value;
      return tasks.value.filter((task) => {
        if (selectedFilter.value === "open") return task.status === "Open";
        if (selectedFilter.value === "inProgress")
          return task.status === "In Progress";
        if (selectedFilter.value === "done") return task.status === "Completed";
        if (selectedFilter.value === "overdue")
          return task.status === "Overdue";
        return true;
      });
    });

    const formatDate = (date) => {
      if (!date || isNaN(new Date(date).getTime())) {
        return "Invalid Date"; // Return fallback text if date is invalid
      }
      return format(new Date(date), "MMM dd, yyyy");
    };

    const getStatusClasses = (status) => {
      const statusClasses = {
        "In Progress": "bg-blue-500",
        Completed: "bg-green-500",
        Overdue: "bg-red-500",
        Open: "bg-yellow-500",
      };
      return statusClasses[status] || "bg-gray-500";
    };

    const filterByStatus = (type) => {
      selectedFilter.value = type;
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
    const closeDropdown = () => {
      showDropdown.value = false;
    };

    // Computed properties
    const visibleTabs = computed(() => tabs.slice(0, 3));
    const hiddenTabs = computed(() => tabs.slice(3));
    const activeTabName = computed(() => activeTab.value);

    const displayedTasks = computed(() => tasks.value);

    const taskCounts = computed(() => ({
      total: displayedTasks.value.length,
      open: displayedTasks.value.filter((task) => task.status === "Open")
        .length,
      inProgress: tasks.value.filter((task) => task.status === "In Progress")
        .length,
      done: displayedTasks.value.filter((task) => task.status === "Completed")
        .length,
      overdue: displayedTasks.value.filter((task) => task.status === "Overdue")
        .length,
    }));

    const sortedAndFilteredTasks = computed(() => {
      let filtered = [...props.tasks];

      // Apply tab filter
      if (activeTab.value !== "All Tasks") {
        filtered = filtered.filter((task) => task.service === activeTab.value);
      }

      // Apply category filter
      if (selectedFilter.value) {
        filtered = filtered.filter((task) => {
          switch (selectedFilter.value) {
            case "open":
              return task.status === "Open";
            case "done":
              return task.status === "Completed";
            case "overdue":
              return task.status === "Overdue";
            default:
              return true;
          }
        });
      }

      // Apply sorting
      return filtered.sort((a, b) => {
        const aValue = a[sortKey.value];
        const bValue = b[sortKey.value];

        if (sortOrder.value === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    });

    // Methods
    const setActiveTab = (tab) => {
      activeTab.value = tab.name;
      showMoreTabs.value = false;
    };

    const toggleMoreTabs = () => {
      showMoreTabs.value = !showMoreTabs.value;
    };

    const closeMoreTabs = () => {
      showMoreTabs.value = false;
    };

    const selectFilterCategory = (category) => {
      selectedFilter.value = category;
      showDropdown.value = false;
    };

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = key;
        sortOrder.value = "asc";
      }
    };

    const getSummaryBoxClasses = (type) => {
      const classes = {
        total: "bg-purple-100 text-purple-700",
        open: "bg-orange-100 text-orange-700",
        inProgress: "bg-blue-100 text-blue-400",
        done: "bg-green-100 text-green-700",
        overdue: "bg-red-100 text-red-700",
      };
      return classes[type];
    };

    const getSummaryBoxClassesBg = (type) => {
      const classes = {
        total: "bg-purple-700",
        open: "bg-orange-700",
        inProgress: "bg-blue-400",
        done: "bg-green-700",
        overdue: "bg-red-700",
      };
      return classes[type];
    };

    return {
      activeTab,
      showDropdown,
      showMoreTabs,
      selectedFilter,
      filteredTasks,
      filterByStatus,
      sortKey,
      sortOrder,
      categories,
      tabs,
      tableHeaders,
      visibleTabs,
      hiddenTabs,
      activeTabName,
      taskCounts,
      sortedAndFilteredTasks,
      displayedTasks,
      setActiveTab,
      toggleDropdown,
      toggleMoreTabs,
      closeDropdown,
      closeMoreTabs,
      selectFilterCategory,
      sortBy,
      formatDate,
      getSummaryBoxClasses,
      getSummaryBoxClassesBg,
      showCreatePanel,
      showUpdatePanel,
      openUpdateTask,
      selectedTask,
      tasks,
      fetchTasks,
      deleteTask,
      getStatusClasses,
    };
  },
};
</script>
<style scoped>
.task-container {
  display: flex;
  width: 100%;
}
.task-table-view {
  width: 100%;
  transition: width 1s ease-in-out;
}
.shrink-table {
  width: 60%;
}
.create-task-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background 1s ease-in-out;
}
.create-task-btn:hover {
  background: #2563eb;
}

.status-pill {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
}

.status-pill.bg-blue-500 {
  background: #3b82f6;
  color: white;
}

.status-pill.bg-green-500 {
  background: #10b981;
  color: white;
}

.status-pill.bg-red-500 {
  background: #ef4444;
  color: white;
}

.status-pill.bg-yellow-500 {
  background: #fbbf24;
  color: white;
}
</style>
