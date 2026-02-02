<template>
  <div class="d-flex align-items-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          
          <div class="text-center mb-4">
            <h1 class="h3 fw-bold text-primary">Modify List</h1>
          </div>

          <div v-if="error" class="alert alert-danger small py-2 text-center" role="alert">
            {{ error }}
          </div>

          <div class="card shadow-sm">
            <div class="card-body p-4">
              <form @submit.prevent="updateList">
                
                <div class="mb-3">
                  <label class="form-label small fw-bold">List Name</label>
                  <input 
                    v-model="form.ListName" 
                    type="text" 
                    class="form-control" 
                    placeholder="e.g. My Favorites" 
                    required 
                  />
                </div>

                <div class="mb-4">
                  <label class="form-label small fw-bold">Comment</label>
                  <textarea 
                    v-model="form.Comment" 
                    class="form-control" 
                    rows="3"
                    placeholder="Tell us about this list..."
                  ></textarea>
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary" 
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                  </button>
                  
                  <button 
                    type="button" 
                    @click="$router.go(-1)" 
                    class="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
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
      form: { ListName: "", Comment: "" },
      loading: false,
      error: ""
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await fetch(`http://localhost:8080/reading-book-list/${id}`);
      if (!res.ok) throw new Error("Could not fetch list data.");
      const data = await res.json();
      this.form.ListName = data.ListName;
      this.form.Comment = data.Comment;
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async updateList() {
      this.loading = true;
      try {
        const id = this.$route.params.id;
        const res = await fetch(`http://localhost:8080/reading-book-list/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Update failed");
        }

        this.$router.push({ name: 'DetailReadingBookList', params: { id } });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>