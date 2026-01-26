<template>
  <div class="home-hero">
    <div class="overlay">
      <div class="content text-center">
        <h1 class="title">
          <span class="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="44" height="44">
              <path
                d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z"
                fill="#2f6df6"
              />
            </svg>
          </span>
          Bookify
        </h1>

        <p class="subtitle">
          Track your reading and build your personal reading journey.
        </p>

        <div class="actions">
          <router-link class="btn btn-primary px-4" to="/signup">Register</router-link>
          <router-link class="btn btn-outline-light px-4" to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "HomeView" };
</script>

<style scoped>
.home-hero {
  height: 100vh;
  background-image: url("../assets/books-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: 760px;
  padding: 20px;
}

.title {
  color: white;
  font-size: 72px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
}

.logo {
  display: inline-flex;
  align-items: center;
}

.subtitle {
  color: white;
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 26px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>