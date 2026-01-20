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
        this.error = e?.message ?? "Update failed";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="create-book">
    <h1>Update Book</h1>

    <form @submit.prevent="updateBook" class="form">
      <div class="row">
        <label>Name</label>
        <input v-model.trim="book.Name" type="text" required />
      </div>

      <div class="row">
        <label>Description</label>
        <textarea v-model.trim="book.Description" rows="4" required></textarea>
      </div>

      <div class="row">
        <label>ReadingTimeMin</label>
        <input v-model.number="book.ReadingTimeMin" type="number" min="1" required />
      </div>

      <div class="row">
        <label>PageCount</label>
        <input v-model.number="book.PageCount" type="number" min="1" required />
      </div>

      <div class="row">
        <label>Language</label>
        <input v-model.trim="book.Language" type="text" required />
      </div>

      <div class="row">
        <label>ReleaseYear</label>
        <input v-model.number="book.ReleaseYear" type="number" min="0" required />
      </div>

      <div class="row">
        <label>ISBN</label>
        <input v-model.trim="book.ISBN" type="text" inputmode="numeric" required />
      </div>

      <div class="row">
        <label>CoverImageUrl</label>
        <input v-model.trim="book.CoverImageUrl" type="url" required />
      </div>

      <div class="actions">
        <button type="submit" :disabled="loading">
          {{ loading ? "Updating..." : "Update" }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>
