<template>
  <div class="bg-white p-6 rounded-xl space-y-6">
    <h2 class="text-xl font-bold">Overall Teams Progress</h2>
    <div v-for="(member, index) in teamMembers" :key="index" class="space-y-2">
      <div
        class="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition duration-300"
      >
        <!-- Member Info -->
        <div class="flex items-center space-x-4">
          <img
            :src="member.avatar"
            alt="Avatar"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <p class="font-semibold text-gray-900">{{ member.name }}</p>
            <p class="text-sm text-gray-600">{{ member.role }}</p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="flex items-center space-x-4">
          <p class="text-sm text-gray-600">
            {{ member.completed }} Completed out of {{ member.total }} tasks
          </p>
          <div class="relative w-24 h-2 bg-gray-200 rounded">
            <div
              class="absolute top-0 left-0 h-full bg-green-500 rounded"
              :style="{ width: member.progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        {
          name: "Angelo Gonzales",
          role: "Illustrator",
          completed: 8,
          total: 10,
          progress: 80,
          avatar: "https://via.placeholder.com/40",
        },
        // Add more members...
      ],
    };
  },
};
</script>
