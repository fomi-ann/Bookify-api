<script>
export default {
  name: "CreateBookView",
  data() {
    return {
      loading: false,
      error: "",
      success: "",
      book: {
        Name: "NewBookName",
        Description: "NewBookDescription",
        ReadingTimeMin: 1,
        PageCount: 1,
        Language: "NewBookLanguage",
        ReleaseYear: 2000,
        ISBN: "1111111111111",
        CoverImageUrl: "https://example.com/cover.jpg"
      }
    };
  },
  methods: {
    async create() {
      this.error = "";
      this.success = "";
      this.loading = true;

      try {
        const res = await fetch("http://localhost:8080/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(this.book)
        });

        if (res.status === 401) {
          throw new Error("Not signed in (401).");
        }

        this.success = "Book created successfully!";
      } catch (e) {
        this.error = e?.message || "Oops! Something went wrong.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="d-flex align-items-center py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-7">

          <h1 class="h4 mb-4 text-center">Create a new book</h1>

          <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> {{ success }}
            <button type="button" class="btn-close" @click="success = ''"></button>
          </div>

          <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {{ error }}
            <button type="button" class="btn-close" @click="error = ''"></button>
          </div>

          <div class="card shadow-sm">
            <div class="card-body">
              <form @submit.prevent="create">

                <div class="mb-3">
                  <label class="form-label small fw-bold">Name</label>
                  <input v-model.trim="book.Name" type="text" class="form-control" placeholder="The Hobbit" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Description</label>
                  <textarea v-model.trim="book.Description" rows="4" class="form-control" placeholder="Short description..." required></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">ReadingTimeMin</label>
                  <input v-model.number="book.ReadingTimeMin" type="number" min="1" class="form-control" placeholder="120" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">PageCount</label>
                  <input v-model.number="book.PageCount" type="number" min="1" class="form-control" placeholder="310" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">Language</label>
                  <input v-model.trim="book.Language" type="text" class="form-control" placeholder="English" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">ReleaseYear</label>
                  <input v-model.number="book.ReleaseYear" type="number" min="0" class="form-control" placeholder="2000" required />
                </div>

                <div class="mb-3">
                  <label class="form-label small fw-bold">ISBN</label>
                  <input v-model.trim="book.ISBN" type="text" class="form-control" placeholder="9780261102217" required />
                </div>

                <div class="mb-4">
                  <label class="form-label small fw-bold">CoverImageUrl</label>
                  <input v-model.trim="book.CoverImageUrl" type="url" class="form-control" placeholder="https://example.com/cover.jpg" required />
                </div>

                <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                  {{ loading ? "Creating..." : "Create" }}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>