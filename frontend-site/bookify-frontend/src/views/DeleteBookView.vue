<script>
import defaultCover from "@/assets/default-book.png";

export default {
  name: "DeleteBookView",
  props: {
    seekID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      defaultCover,
      loading: false,
      error: "",
      thisBook: {
        BookID: "",
        Name: "",
        Description: "",
        ReadingTimeMin: 0,
        PageCount: 0,
        Language: "",
        ReleaseYear: null,
        ISBN: "",
        CoverImageUrl: "",
        Rating: ""
      }
    };
  },
  beforeMount() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      this.error = "";
      try {
        const res = await fetch(`http://localhost:8080/books/${this.seekID}`);
        if (!res.ok) throw new Error("Failed to load book");
        this.thisBook = await res.json();
      } catch (e) {
        this.error = e?.message ?? "Failed to load book";
      }
    },
    onImageError(event) {
      event.target.src = this.defaultCover;
    },
    async deleteBook() {
      this.error = "";
      this.loading = true;

      try {
        const res = await fetch(`http://localhost:8080/books/${this.seekID}`, {
          method: "DELETE",
          credentials: "include"
        });

        if (res.status === 403) throw new Error("You are not admin! (403).");
        if (!res.ok) throw new Error("Delete failed.");

      } catch (e) {
        this.error = e?.message ?? "Delete failed.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div class="row g-5">

      <div class="col-md-6 text-center">
        <img
          :src="thisBook.CoverImageUrl || defaultCover"
          @error="onImageError"
          alt="Book cover"
          class="img-fluid rounded"
          style="max-height: 400px;"
        />
      </div>

      <div class="col-md-6">
        <h1 class="fw-bold mb-2">{{ thisBook.Name }}</h1>

        <p class="mb-4">{{ thisBook.Description }}</p>

        <div class="card card-body border-0 px-0">
          <table class="table table-sm mb-0">
            <tbody>
              <tr>
                <th scope="row" class="text-muted">Pages</th>
                <td>{{ thisBook.PageCount }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-muted">Reading time</th>
                <td>{{ thisBook.ReadingTimeMin }} min</td>
              </tr>
              <tr>
                <th scope="row" class="text-muted">Language</th>
                <td>{{ thisBook.Language }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-muted">Release year</th>
                <td>{{ thisBook.ReleaseYear }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-muted">ISBN</th>
                <td>{{ thisBook.ISBN }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex gap-2 mt-4">
          <button class="btn btn-danger" @click="deleteBook" :disabled="loading">
            {{ loading ? "Deleting..." : "Delete" }}
          </button>

          <button class="btn btn-outline-secondary" @click="$router.back()" :disabled="loading">
            Cancel
          </button>
        </div>

        <p class="text-muted mt-3 mb-0">
          Warning! This action will permanently delete the book.
        </p>
      </div>
    </div>
  </div>
</template>
