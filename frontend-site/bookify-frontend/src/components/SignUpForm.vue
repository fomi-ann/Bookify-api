<script>
    export default {
        methods: {
            async signUp() {
                await(
                    await fetch(`http://localhost:8080/users/`, 
                    {
                        method: 'POST', 
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify(this.NewUser)
                    })
                )
            }
        },
        name: "SignUpForm",
        data() {
            return {NewUser: {
                Email: "",
                UserName: "",
                FullName: "",
                DisplayName: "",
                PhoneNumber: "",
                PlainPassword: "",
                ProfileImageUrl: "",
                PagesReadTotal: 0,
                BooksReadCount: 0  
            }}
        }
    }
</script>

<template>
  <div class="d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">

            <h1 class="h4 mb-4 text-center">Register Bookify User</h1>
          <div class="card shadow-sm">
            <div class="card-body">

              <form @submit.prevent="signUp">

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    v-model="NewUser.Email"
                    type="email"
                    class="form-control"
                    placeholder="example@email.com"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input
                    v-model="NewUser.PlainPassword"
                    type="password"
                    class="form-control"
                    placeholder="*********"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Username</label>
                  <input
                    v-model="NewUser.UserName"
                    type="text"
                    class="form-control"
                    placeholder="user123"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Full name</label>
                  <input
                    v-model="NewUser.FullName"
                    type="text"
                    class="form-control"
                    placeholder="John Doe"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Display name</label>
                  <input
                    v-model="NewUser.DisplayName"
                    type="text"
                    class="form-control"
                    placeholder="BookWorm123"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Phone number</label>
                  <input
                    v-model="NewUser.PhoneNumber"
                    type="text"
                    class="form-control"
                    placeholder="375 54738204"
                  />
                </div>

                <div class="mb-4">
                  <label class="form-label">Profile image URL</label>
                  <input
                    v-model="NewUser.ProfileImageUrl"
                    type="text"
                    class="form-control"
                    placeholder="https://url.com/image123"
                  />
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

