<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="h3 fw-bold text-primary">Reading Lists</h1>
      <p class="text-muted">Organize your book collections</p>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-12">
        <div class="card shadow-sm bg-light">
          <div class="card-body p-4">
            <form @submit.prevent="submitForm" class="row g-3 align-items-end">
              <div class="col-md-5">
                <label class="form-label small fw-bold text-muted text-uppercase">List Name</label>
                <input v-model="listName" class="form-control" placeholder="e.g. Summer Reads" required />
              </div>
              
              <div class="col-md-5">
                <label class="form-label small fw-bold text-muted text-uppercase">Comment</label>
                <input v-model="comment" class="form-control" placeholder="Optional description..." />
              </div>

              <div class="col-md-2">
                <button type="submit" class="btn btn-primary w-100 fw-bold">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-5 opacity-10">

    <div v-if="lists.length > 0" class="row g-4">
      <div v-for="list in lists" :key="list.ReadingBookListID" class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body p-4 d-flex flex-column">
            <div class="mb-3">
              <h3 class="h5 fw-bold mb-1 text-center">{{ list.ListName }}</h3>
            </div>
            
            <div class="mt-auto pt-3 d-flex gap-4">
              <router-link 
                :to="'/reading-book-list/' + list.ReadingBookListID" 
                class="btn btn-outline-primary btn-sm flex-grow-1 fw-bold"
              >
                View Reading List
              </router-link>
              <button 
                type="button" 
                @click="deleteList(list.ReadingBookListID)" 
                class="btn btn-outline-danger btn-sm px-3"
              >
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="text-center py-5">
      <p class="text-muted italic">No reading lists found. Start by creating one above!</p>
    </div>
    
    <div v-else class="text-center py-5">
      <span class="spinner-border text-primary" role="status"></span>
      <p class="mt-2 text-muted">Loading your lists...</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      lists: [],
      listName: '',
      comment: '',
    };
  },
  mounted() {
    this.fetchLists();
  },
  methods: {
    // get by ID
    async fetchDetails(id) {
    this.error = "";
    try {
      const res = await fetch(`http://localhost:8080/readingBookLists/${id}`);
      if (!res.ok) {
        throw new Error("Could not find that list.");
      }

      const data = await res.json();
      this.selectedList = data;
    } catch (err) {
      this.error = err.message;
      console.error(err);
    }
  },
  // get all
    async fetchLists() {
      try {
        const res = await axios.get('http://localhost:8080/reading-book-list', { withCredentials: true });
        this.lists = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    
    // delete
    async deleteList(id) {
      if (!confirm("Are you sure you want to delete this list?")) return;

      try {
        const res = await fetch(`http://localhost:8080/reading-book-list/${id}`, {
          method: "DELETE",
        });

        if (res.status === 204) {
          this.lists = this.lists.filter(l => l.ReadingBookListID !== id);
        } else if (res.status === 404) {
          const data = await res.json();
          throw new Error(data.error);
        } else {
          throw new Error("Failed to delete the list.");
        }
      } catch (err) {
        this.error = err.message;
        console.error("Delete Error:", err);
      }
    },
    async submitForm() {
      if (!this.listName.trim()) {
        alert('List name cannot be empty');
        return;
      }

      try {
        await axios.post(
          'http://localhost:8080/reading-book-list',
          { ListName: this.listName, Comment: this.comment },
          { withCredentials: true }
        );

        this.listName = '';
        this.comment = '';
        this.fetchLists(); // refresh after creation
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Failed to create reading list');
      }
    },
  },
};
</script>