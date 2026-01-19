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
  computed: {
    previewJson() {
      return JSON.stringify(this.book, null, 2);
    }
  },
  methods: {
    async createBook() {
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
        if (res.status === 403) {
          throw new Error("Not admin (403).");
        }

        this.success = "Book created successfully!";

      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="create-book">
    <h1>Create Book</h1>

    <form @submit.prevent="createBook" class="form">
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
        <input v-model.trim="book.CoverImageUrl" type="url" placeholder="https://..." required />
      </div>

      <div class="actions">
        <button type="submit" :disabled="loading">
          {{ loading ? "Creating..." : "Create" }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>

    <hr />

    <h3>Preview JSON</h3>
    <pre>{{ previewJson }}</pre>
  </div>
</template>
