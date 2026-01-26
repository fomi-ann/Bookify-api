<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      // local storage
      user: JSON.parse(localStorage.getItem('bookify_user'))
    }
  },
  watch: {
    '$route'() {
      this.user = JSON.parse(localStorage.getItem('bookify_user'));
    }
  },
  methods: {
    async handleLogout() {
      try {
        const response = await fetch(`http://localhost:8080/auth/logout`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          localStorage.removeItem('bookify_user');
          this.user = null;
          

          this.$router.push('/login');
        }
      } catch (error) {
        console.error("Logout error:", error);

        localStorage.removeItem('bookify_user');
        this.user = null;
        this.$router.push('/login');
      }
    }
  }
}
</script>
<template>
  <nav class="navbar bg-body-tertiary px-lg-5 px-3">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark-fill text-primary" viewBox="0 0 16 16">
          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
        </svg>
        <span class="ms-2 fw-bold">Bookify</span>
      </router-link>

      <div class="nav-links p-2">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/books">Books</router-link>

        <span v-if="!user">
          | <router-link to="/signup">Register</router-link> |
          <router-link to="/login">Log In</router-link>
        </span>

        <span v-else>
          | <a href="#" @click.prevent="handleLogout" class="text-danger fw-bold text-decoration-none">Logout</a>
          | <span class="text-muted small ms-1">Hi, <b>{{ user.DisplayName }}</b></span>
        </span>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
