<script>
export default {
  name: "BooksTable",
  props: {
    items: Array
  },
  data() {
    return {
      me: null
    };
  },
async mounted() {
  const saved = localStorage.getItem("bookify_user");
  this.me = saved ? JSON.parse(saved) : null;
},
  computed: {
    isAdmin() {
      return this.me?.IsAdmin === true;
    }
  },
  methods: {
    async deleteBook(BookID) {
      await (await fetch(`http://localhost:8080/books/${BookID}`, { method: 'DELETE' }))
      window.location.reload();
    }
  }
}
</script>

<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h5 mb-0">Browse Books</h2>
          <span v-if="isAdmin" class="badge bg-primary">Admin Mode</span>
        </div>

        <div class="card shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover table-sm mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-3 py-2 fw-bold text-secondary">ID</th>
                  <th class="py-2 fw-bold text-secondary">Title</th>
                  <th class="py-2 fw-bold text-secondary">Book Added</th>
                  <th class="py-2 fw-bold text-secondary">Book Updated</th>
                  <th class="pe-3 py-2 fw-bold text-secondary"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.BookID" class="align-middle">
                  <td class="ps-3">
                    <small class="text-muted">{{ item.BookID }}</small>
                  </td>
                  <td class="fw-medium">{{ item.Name }}</td>
                  <td>
                    <small class="text-muted">{{ new Date(item.createdAt).toLocaleDateString() }}</small>
                  </td>
                  <td>
                    <small class="text-muted">{{ new Date(item.updatedAt).toLocaleDateString() }}</small>
                  </td>
                  <td class="pe-3 text-end">
                    
                      <router-link 
                        :to="{ name: 'book', params: { seekID: item.BookID } }" 
                        class="btn btn-light border text-secondary"
                        title="View Details"
                      >
                        View
                      </router-link>

                      <template v-if="isAdmin">
                        
                        <router-link 
                          :to="{ name: 'book-edit', params: { BookID: item.BookID } }" 
                          class="btn btn-light border text-primary">
                          Edit
                        </router-link>

                        
                          <router-link
                            :to="{ name: 'delete-book', params: { seekID: item.BookID } }"
                            class="btn btn-light border text-danger">
                            Delete
                          </router-link>
                        

                      </template>

                  </td>
                </tr>
                
                <tr v-if="!items || items.length === 0">
                  <td colspan="4" class="text-center py-4 text-muted small">
                    No books available.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.table th, .table td {
  white-space: nowrap;
  vertical-align: middle;
}


.card {
  border: 1px solid rgba(0,0,0,.075);
}
</style>