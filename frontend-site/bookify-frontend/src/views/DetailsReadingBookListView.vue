<template>
  <div class="container py-5" style="max-width: 900px;">
    <div v-if="loading" class="text-center text-muted">
      <div class="spinner-border spinner-border-sm me-2" role="status"></div>
      Loading details...
    </div>

    <div v-else-if="!list" class="alert alert-danger text-center" role="alert">
      {{ error || "List not found." }}
      <div class="mt-3">
        <router-link to="/reading-book-list" class="btn btn-outline-secondary btn-sm">
          Back to my lists
        </router-link>
      </div>
    </div>

    <div v-else>
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 class="h4 fw-bold mb-1">{{ list.ListName }}</h1>
          <p class="text-muted mb-0" v-if="list.Comment">{{ list.Comment }}</p>
          <p class="text-muted mb-0" v-else>No comment.</p>
        </div>

        <router-link to="/reading-book-list" class="btn btn-outline-secondary">
          Back
        </router-link>
      </div>

      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h2 class="h5 mb-3">Books in this list</h2>

          <ul
            v-if="list.Books && list.Books.length > 0"
            class="list-group mb-4"
          >
            <li
              v-for="book in list.Books"
              :key="book.BookID"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="me-3">
                <div class="fw-semibold">{{ book.Name }}</div>
                <div class="text-muted small">{{ book.BookID }}</div>
              </div>

              <div class="d-flex gap-2">
                <router-link
                  :to="'/books/' + book.BookID"
                  class="btn btn-sm btn-outline-primary"
                >
                  View
                </router-link>

                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  @click="removeBook(book.BookID)"
                >
                  Remove
                </button>
              </div>
            </li>
          </ul>

          <div v-else class="text-muted">
            This list is currently empty.
            <router-link to="/books" class="text-decoration-none fw-bold">
              Browse books
            </router-link>
            to add some!
          </div>

          <hr class="my-4" />

          <div class="d-flex gap-2">
            <router-link
              :to="{ name: 'UpdateReadingBookList', params: { id: list.ReadingBookListID } }"
              class="btn btn-primary"
            >
              Modify list
            </router-link>

            <router-link to="/reading-book-list" class="btn btn-outline-secondary">
              Back to my lists
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsReadingBookListView",
  data() {
    return {
      list: null,
      loading: true,
      error: ""
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.fetchDetails(id);
  },
  methods: {
    async fetchDetails(id) {
      this.error = "";
      this.loading = true;

      try {
        const res = await fetch(`http://localhost:8080/reading-book-list/${id}`, {
          credentials: "include"
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load list details.");
        }

        this.list = data;
      } catch (err) {
        this.list = null;
        this.error = err.message;
        console.error("Error fetching details:", err);
      } finally {
        this.loading = false;
      }
    },

    async removeBook(bookId) {
      if (!confirm("Remove this book from the list?")) return;

      try {
        const listId = this.list.ReadingBookListID;

        const res = await fetch(
          `http://localhost:8080/reading-book-list/${listId}/book/${bookId}`,
          {
            method: "DELETE",
            credentials: "include"
          }
        );

        if (res.status === 204) {
          this.list.Books = this.list.Books.filter((b) => b.BookID !== bookId);
        } else {
          const data = await res.json().catch(() => null);
          alert(data?.error || "Failed to remove book.");
        }
      } catch (err) {
        console.error("Error removing book:", err);
        alert("Error removing book.");
      }
    }
  }
};
</script>