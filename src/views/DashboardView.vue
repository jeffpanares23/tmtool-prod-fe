<template>
  <div class="dashboard flex min-h-screen">
    <!-- Main Content -->
    <div class="main-content flex-1">
      <!-- Dashboard Content -->
      <div class="content grid grid-cols-12 gap-6 p-6">
        <!-- Left Column -->
        <div class="col-span-9 space-y-6">
          <!-- Quick Actions -->
          <div class="bg-white p-8 rounded-xl">
            <h1 class="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h1>
            <div class="quick-actions grid grid-cols-4 gap-8">
              <div
                v-for="action in quickActions"
                :key="action.label"
                class="p-6 rounded-lg transition transform hover:scale-105 cursor-pointer"
                :style="{ backgroundColor: action.color, padding: '2.6rem' }"
              >
                <!-- Flex Column for Centered Alignment -->
                <div
                  class="flex flex-col items-center justify-center space-y-2"
                >
                  <!-- Icon -->
                  <i
                    :class="action.iconClass"
                    :style="{ color: action.iconColor }"
                    class="text-3xl"
                  />
                  <!-- Label -->
                  <span class="font-medium text-gray-800 text-sm">{{
                    action.label
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Job Scheduling -->
          <div class="bg-white p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <!-- Title and Tabs -->
              <div>
                <h1 class="text-xl font-semibold text-gray-900 mb-4">
                  Job Scheduling
                </h1>
                <div class="flex items-center mt-2 space-x-4">
                  <button
                    class="text-sm px-4 py-1 rounded-md font-medium"
                    :class="{
                      'bg-blue-500 text-white': selectedTab === 'Today',
                      'bg-gray-100 text-gray-700': selectedTab !== 'Today',
                    }"
                    @click="selectedTab = 'Today'"
                  >
                    Today
                  </button>
                  <button
                    class="text-sm px-4 py-1 rounded-md font-medium"
                    :class="{
                      'bg-blue-500 text-white': selectedTab === 'This Week',
                      'bg-gray-100 text-gray-700': selectedTab !== 'This Week',
                    }"
                    @click="selectedTab = 'This Week'"
                  >
                    This Week
                  </button>
                </div>
              </div>

              <!-- Team Dropdown -->
              <select
                class="text-sm border rounded-lg px-4 py-1 focus:ring-2 focus:ring-blue-500"
              >
                <option>Team A</option>
                <option>Team B</option>
                <option>Team C</option>
              </select>
            </div>

            <!-- Job Scheduling Progress -->
            <div class="mt-6 space-y-4">
              <div
                v-for="(user, index) in staticJobs"
                :key="index"
                class="flex items-center justify-between"
              >
                <!-- User Info -->
                <div class="flex items-center space-x-4">
                  <img
                    :src="user.avatar"
                    alt="User Avatar"
                    class="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 class="font-medium text-gray-800">{{ user.name }}</h3>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="relative w-2/3 bg-gray-200 h-4 rounded-lg">
                  <div
                    class="absolute h-4 rounded-lg"
                    :style="{
                      width: user.progress + '%',
                      backgroundColor: user.color,
                    }"
                  ></div>
                  <span
                    class="absolute right-2 text-xs font-medium text-gray-800 top-1/2 -translate-y-1/2"
                  >
                    {{ user.progress }}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div class="bg-white p-6 rounded-lg grid grid-cols-2 gap-4">
            <div>
              <h3 class="text-lg font-bold">Productivity</h3>
              <p class="text-3xl font-bold">128.7K</p>
              <div class="text-sm text-gray-500">
                +3.4% increase since last period
              </div>
            </div>
            <div>
              <h3 class="text-lg font-bold">Tasking</h3>
              <p class="text-3xl font-bold">1,565</p>
              <div class="mt-2 space-y-1">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-green-500">Completed</span>
                  <span>25%</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-yellow-500">In Progress</span>
                  <span>55%</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-red-500">Pending</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-span-3 space-y-6">
          <!-- Unread Messages -->
          <div class="bg-white p-6 rounded-lg">
            <h2 class="text-lg font-bold">Unread Messages</h2>
            <ul class="mt-4 space-y-2">
              <li v-for="(message, index) in unreadMessages" :key="index">
                <span class="block text-gray-800 font-medium">{{
                  message.sender
                }}</span>
                <span class="text-sm text-gray-500">{{ message.snippet }}</span>
              </li>
            </ul>
          </div>

          <!-- Marketing Info -->
          <div class="bg-white p-6 rounded-lg">
            <h2 class="text-lg font-bold">All About Marketing Suite</h2>
            <p>Video or additional marketing information here.</p>
          </div>

          <!-- Calendar -->
          <div class="bg-white p-6 rounded-lg">
            <h2 class="text-lg font-bold">Calendar</h2>
            <ul class="mt-4 space-y-2">
              <li
                v-for="event in events"
                :key="event.date"
                class="flex justify-between items-center"
              >
                <span class="font-medium text-gray-700">{{ event.date }}</span>
                <span class="text-gray-600">{{ event.description }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DashboardView",
  data() {
    return {
      selectedTab: "Today", // Default selected tab
      quickActions: [
        {
          label: "Add Users",
          iconClass: "fas fa-user-plus",
          color: "#EFF9F1",
          iconColor: "#46CE5F",
        },
        {
          label: "Add Admins",
          iconClass: "fas fa-crown",
          color: "#FEF3FF",
          iconColor: "#8D7EF9",
        },
        {
          label: "Add a Task",
          iconClass: "fas fa-tasks",
          color: "#FFEFF6",
          iconColor: "#CD457D",
        },
        {
          label: "Send an Update",
          iconClass: "fas fa-paper-plane",
          color: "#F0F7FF",
          iconColor: "#4EA3FF",
        },
      ],
      jobUsers: [
        {
          name: "Angela Dee",
          progress: 50,
        },
        {
          name: "Angelo Gonzales",
          progress: 35,
        },
        {
          name: "Tyron Makabali",
          progress: 48,
        },
      ],
      events: [
        {
          date: "Jan 20",
          description: "Meeting with team",
        },
        {
          date: "Jan 22",
          description: "Project deadline",
        },
        {
          date: "Jan 25",
          description: "Workshop",
        },
      ],
      staticJobs: [
        {
          name: "Angela Dee",
          progress: 50,
          color: "#FBBF24", // Yellow
          avatar: require("@/assets/avatars/overview/Dummy-user1.png"),
        },
        {
          name: "Angelo Gonzales",
          progress: 35,
          color: "#EF4444", // Red
          avatar: require("@/assets/avatars/overview/Dummy-user2.png"),
        },
        {
          name: "Tyron Makabali",
          progress: 48,
          color: "#34D399", // Green
          avatar: require("@/assets/avatars/overview/Dummy-user3.png"),
        },
      ],
    };
  },
  methods: {
    getProgressColor(progress) {
      if (progress >= 75) return "#34D399"; // Green
      if (progress >= 50) return "#FBBF24"; // Yellow
      return "#EF4444"; // Red
    },
  },
  async created() {
    try {
      const [quickActionsResponse, jobUsersResponse, eventsResponse] =
        await Promise.all([
          axios.get("http://localhost:3000/quickActions"),
          axios.get("http://localhost:3000/jobUsers"),
          axios.get("http://localhost:3000/events"),
        ]);
      this.quickActions = quickActionsResponse.data;
      this.jobUsers = jobUsersResponse.data;
      this.events = eventsResponse.data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
}

.main-content {
  min-height: 100vh;
}

.quick-actions div {
  text-align: center;
}

.progress-bar {
  transition: width 0.5s ease;
}
.progress-bar:hover {
  filter: brightness(1.1);
}
</style>
