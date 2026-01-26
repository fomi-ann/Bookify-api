<script>
export default {
    name: "LoginForm",
    data() {
        return {
            loginData: {
                Email: "",
                Password: ""
            },
            isLoading: false,
            errorMessage: ""
        }
    },
    methods: {
        async handleLogin() {
    this.isLoading = true;
    try {
        const response = await fetch(`http://localhost:8080/sessions`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                LoginEmail: this.loginData.Email,
                LoginPassword: this.loginData.Password 
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('bookify_user', JSON.stringify(data));
            this.$router.push('/');
        } else {
            this.errorMessage = data.error || "Login failed";
        }
    } catch (error) {
        this.errorMessage = "Service unavailable.";
    } finally {
        this.isLoading = false;
    }
}
    }
}
</script>

<template>
  <div class="d-flex align-items-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          
          <div class="text-center mb-4">
            <h1 class="h3 fw-bold text-primary">Bookify</h1>
            <p class="text-muted">Login to track your reading</p>
          </div>

          <div v-if="errorMessage" class="alert alert-danger small py-2 text-center" role="alert">
            {{ errorMessage }}
          </div>

          <div class="card shadow-sm">
            <div class="card-body p-4">
              <form @submit.prevent="handleLogin">
                
                <div class="mb-3">
                  <label class="form-label small fw-bold">Email Address</label>
                  <input 
                    v-model="loginData.Email" 
                    type="email" 
                    class="form-control" 
                    placeholder="name@example.com" 
                    required 
                  />
                </div>

                <div class="mb-4">
                  <label class="form-label small fw-bold">Password</label>
                  <input 
                    v-model="loginData.Password" 
                    type="password" 
                    class="form-control" 
                    placeholder="********" 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 fw-bold py-2" 
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Checking credentials...' : 'Login' }}
                </button>

              </form>
            </div>
          </div>

          <p class="text-center mt-4 small">
            Need an account? 
            <router-link to="/signup" class="fw-bold text-decoration-none">Register here</router-link>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>