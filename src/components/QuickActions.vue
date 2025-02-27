<template>
  <div class="quick-actions grid grid-cols-4 gap-8">
    <div
      v-for="action in filteredActions"
      :key="action.label"
      class="p-6 rounded-lg transition transform hover:scale-105 cursor-pointer"
      :style="{ backgroundColor: action.color, padding: '2.6rem' }"
      @click="handleAction(action)"
    >
      <div class="flex flex-col items-center justify-center space-y-2">
        <i :class="action.iconClass" class="text-3xl"></i>
        <span class="font-medium text-gray-800 text-sm">{{
          action.label
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuickActions",
  props: {
    actions: {
      type: Array,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
  },
  computed: {
    filteredActions() {
      return this.actions.filter((action) =>
        action.roles.includes(this.userRole)
      );
    },
  },
  methods: {
    handleAction(action) {
      if (action.actionType === "redirect") {
        this.$router.push(action.path);
      } else if (action.actionType === "modal") {
        this.$emit("open-modal", action.label); // Emit an event to open a modal
      }
    },
  },
};
</script>

<style scoped>
.quick-actions div {
  text-align: center;
}
</style>
