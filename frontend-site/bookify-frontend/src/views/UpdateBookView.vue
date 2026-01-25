<script>
export default {
  name: "UpdateBookView",
  props: {
    BookID: String
  },
  data() {
    return {
      loading: false,
      error: "",
      success: "",
      book: {
        Name: "",
        Description: "",
        ReadingTimeMin: 1,
        PageCount: 1,
        Language: "",
        ReleaseYear: 2000,
        ISBN: "",
        CoverImageUrl: ""
      }
    };
  },
  async created() {
    try {
      const res = await fetch(`http://localhost:8080/books/${this.BookID}`);
      if (!res.ok) throw new Error("Failed to load book");
      this.book = await res.json();
    } catch (e) {
      this.error = e?.message ?? "Failed to load book";
    }
  },
  methods: {
    async updateBook() {
      this.error = "";
      this.success = "";
      this.loading = true;

      try {
        const res = await fetch(`http://localhost:8080/books/${this.BookID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            Name: this.book.Name,
            Description: this.book.Description,
            ReadingTimeMin: this.book.ReadingTimeMin,
            PageCount: this.book.PageCount,
            ReleaseYear: this.book.ReleaseYear,
            Language: this.book.Language,
            ISBN: this.book.ISBN,
            CoverImageUrl: this.book.CoverImageUrl
          })
        });

        if (res.status === 401) throw new Error("Not signed in (401).");
        if (res.status === 403) throw new Error("Not admin (403).");
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || `Update failed (${res.status})`);
        }

        this.success = "Book updated successfully!";
      } catch (e) {
        this.error = e?.message ?? "Updating the book failed.";
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

          <h1 class="h4 mb-4 text-center">Update Book</h1>

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
              <form @submit.prevent="updateBook">

                <div class="mb-3">
                  <label class="form-label small fw-bold">Name</label>
                  <input v-model.trim="book.Name" type="text" class="form-control" placeholder="Book name" required />
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
                  <input v-model.number="book.PageCount" type="number" min="1" class="form-control" placeholder="300" required />
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
                  <input v-model.trim="book.ISBN" type="text" inputmode="numeric" class="form-control" placeholder="9780261102217" required />
                </div>

                <div class="mb-4">
                  <label class="form-label small fw-bold">CoverImageUrl</label>
                  <input v-model.trim="book.CoverImageUrl" type="url" class="form-control" placeholder="https://picsum.photos/200/300" required />
                </div>

                <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                  {{ loading ? "Updating..." : "Update" }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>