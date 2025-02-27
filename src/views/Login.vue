<template>
  <div class="flex min-h-screen bg-gradient-to-r from-purple-10 to-blue-50">
    <!-- Left: Login Form -->
    <div class="flex-1 flex flex-col justify-center items-center p-8">
      <div class="login-ui rounded-lg px-24 py-32">
        <div class="w-full h-full grid">
          <h2 class="text-3xl font-medium text-center">
            Log in to your Account
          </h2>
          <form @submit.prevent="handleLogin" class="w-full">
            <div class="mb-4">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div class="mb-4 relative">
              <input
                :type="showPassword === 'password' ? 'text' : 'password'"
                v-model="password"
                placeholder="Password"
                class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-4 flex items-center text-gray-500 focus:outline-none"
                @click="showPasswordtoggle"
                v-if="showPassword == 'text'"
              >
                <i class="fas fa-eye-slash"></i>
              </button>
              <button
                type="button"
                class="absolute inset-y-0 right-4 flex items-center text-gray-500 focus:outline-none"
                @click="hidePasswordtoggle"
                v-if="showPassword == 'password'"
              >
                <i class="fas fa-eye"></i>
              </button>
            </div>
            <div class="flex items-center justify-between mb-4">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" class="text-blue-500 text-sm hover:underline"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
              :disabled="loading"
            >
              <span v-if="!loading">Log in</span>
              <span v-else>Logging in...</span>
            </button>
            <div v-if="error" class="text-red-500 text-sm mt-4">
              {{ error }}
            </div>
          </form>
          <p class="mt-6 text-sm text-center">
            Don't have an account?
            <a href="/register" class="text-blue-500 hover:underline"
              >Sign Up</a
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Right: Illustration and Metrics -->
    <div class="flex-1 hidden lg:flex flex-col justify-center items-center p-8">
      <h3 class="text-xl font-semibold mb-4">Digital Marketing Suite</h3>
      <div class="relative w-4/5">
        <img
          src="../assets/DMSuite_Login_Illustration.svg"
          alt="Illustration"
          class="rounded-md mb-4"
        />
        <!-- Add metrics (overlays) -->
        <div class="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md">
          <p class="text-sm text-gray-600">Inbox</p>
          <p class="text-2xl font-bold text-blue-500">1258</p>
          <p class="text-sm text-green-500">Unread</p>
        </div>
        <div class="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
          <p class="text-sm text-gray-600">Tasking</p>
          <p class="text-2xl font-bold text-red-500">18</p>
          <p class="text-sm text-orange-500">Overdue</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { login } from "../services/api.js";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      showPassword: "text",
      loading: false,
      error: null,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    showPasswordtoggle() {
      this.showPassword = "password";
    },
    hidePasswordtoggle() {
      this.showPassword = "text";
    },
    async handleLogin() {
      if (!this.email || !this.password) {
        alert("Email and Password are required.");
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await login({
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", response.data.token);

        this.router.push("/overview");
      } catch (error) {
        console.error(
          "Login error:",
          error.response?.data?.message || error.message
        );
        this.error = error.response?.data?.message || "An error occurred.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles */
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.bg-gradient-to-r {
  background: linear-gradient(to right, #faf8ff, #dfeaf7);
}
.login-ui {
  width: 75%;
  background: white;
  height: 753px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.rounded-lg {
  border-radius: 20px;
}
</style>
