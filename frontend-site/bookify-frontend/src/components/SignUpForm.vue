<script>
export default {
    name: "SignUpForm",
    data() {
        return {
            registrationSuccess: false,
            NewUser: {
                Email: "",
                UserName: "",
                FullName: "",
                DisplayName: "",
                PhoneNumber: "",
                PlainPassword: "",
                ProfileImageUrl: "",
                PagesReadTotal: 0,
                BooksReadCount: 0  
            }
        }
    },
    methods: {
        async signUp() {
            try {
                const response = await fetch(`http://localhost:8080/users/`, {
                    method: 'POST', 
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(this.NewUser)
                });

                if (response.ok) {
                    this.registrationSuccess = true;
                    this.resetForm();

                    setTimeout(() => {
                        this.$router.push('/'); 
                    }, 2000);
                    
                } else {
                    alert("Registration failed. Please check your details.");
                }
            } catch (error) {
                console.error("Connection error:", error);
                alert("Could not connect to the Bookify server.");
            }
        },
        resetForm() {
            this.NewUser = {
                Email: "",
                UserName: "",
                FullName: "",
                DisplayName: "",
                PhoneNumber: "",
                PlainPassword: "",
                ProfileImageUrl: "",
                PagesReadTotal: 0,
                BooksReadCount: 0  
            };
        }
    }
}
</script>

<template>
  <div class="d-flex align-items-center py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          
          <h1 class="h4 mb-4 text-center">Register Bookify User</h1>

          <div v-if="registrationSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Your Bookify account is ready.
            <button type="button" class="btn-close" @click="registrationSuccess = false"></button>
          </div>

          <div class="card shadow-sm">
            <div class="card-body">
              <form @submit.prevent="signUp">
                
                <div class="mb-3">
                  <label class="form-label small fw-bold">Email</label>
                  <input v-model="NewUser.Email" type="email" class="form-control" placeholder="example@email.com" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Password</label>
                  <input v-model="NewUser.PlainPassword" type="password" class="form-control" placeholder="*********" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Username</label>
                  <input v-model="NewUser.UserName" type="text" class="form-control" placeholder="user123" />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Full name</label>
                  <input v-model="NewUser.FullName" type="text" class="form-control" placeholder="John Doe" />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Display name</label>
                  <input v-model="NewUser.DisplayName" type="text" class="form-control" placeholder="BookWorm123" />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Phone number</label>
                  <input v-model="NewUser.PhoneNumber" type="text" class="form-control" placeholder="375 54738204" />
                </div>

                <div class="mb-4">
                  <label class="form-label small fw-bold">Profile image URL</label>
                  <input v-model="NewUser.ProfileImageUrl" type="text" class="form-control" placeholder="https://url.com/image123" />
                </div>

                <button type="submit" class="btn btn-primary w-100">
                  Register
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>